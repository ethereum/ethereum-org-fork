import fs from "fs"
import path from "path"

import type { Root } from "hast"
import sizeOf from "image-size"
import { getPlaiceholder } from 'plaiceholder'
import type { Plugin } from "unified"
import type { Node } from "unist"
import { visit } from "unist-util-visit"

import {
  checkIfImageIsTranslated,
  getTranslatedImgPath,
} from "@/lib/utils/i18n"

import { DEFAULT_LOCALE } from "@/lib/constants"

interface Options {
  dir: string
  srcPath: string
  locale: string
}

type ImageNode = {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
    height?: number
    width?: number
    aspectRatio?: number
    blurDataURL?: string
    placeholder?: 'blur' | 'empty'
  }
}

/**
 * Check if node is an image node
 * @param node Any node element
 * @returns boolean, true if node is an image node
 */
function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  )
}

/**
 * Handles:
 * "//"
 * "http://"
 * "https://"
 * "ftp://"
 */
const absolutePathRegex = /^(?:[a-z]+:)?\/\//

const getImageSize = (src: string, dir: string) => {
  if (absolutePathRegex.exec(src)) {
    return
  }
  // Treat `/` as a relative path, according to the server
  const shouldJoin = !path.isAbsolute(src) || src.startsWith("/")

  if (dir && shouldJoin) {
    src = path.join(dir, src)
  }
  return sizeOf(src)
}

/**
 * Use plaiceholder package to generate base64 encoded placeholder image
 * Assign to blurDataUrl property for image node
 * @param node Image node
 */
const addBase64Placeholder = async (node: ImageNode): Promise<void> => {
  try {
    let buffer: Buffer
    const isExternal = node.properties.src.startsWith("http")
    if (!isExternal) {
      // If internally hosted, read file buffer and generate base64 with plaiceholder
      buffer = fs.readFileSync(path.join("public", node.properties.src))
    } else {
      // If externally hosted, fetch file, and convert into buffer
      const imageRes = await fetch(node.properties.src)
      const arrayBuffer = await imageRes.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    }
    node.properties.blurDataURL = (await getPlaiceholder(buffer)).base64
    node.properties.placeholder = 'blur'
  } catch (error: unknown) {
    error instanceof Error && console.error(error.message)
    node.properties.blurDataURL = undefined
    node.properties.placeholder = 'empty'
  }
}

/**
 * NOTE: source code copied from the `rehype-img-size` plugin and adapted to our
 * needs. https://github.com/ksoichiro/rehype-img-size
 *
 * Set local image size, aspect ratio, and full src path properties to img tags.
 * Also, generate base64 placeholder image using plaiceholder, assign to blurDataUrl property
 *
 * @param options.dir Directory to resolve image file path
 * @param options.srcDir Directory where the image src attr is going to point
 */

const setImageSize: Plugin<[Options], Root> = (options) => {
  const { dir, srcPath, locale } = options || {}

  return async (tree: Node): Promise<void> => {
    // Instantiate empty array for image nodes
    const imageNodes: ImageNode[] = []

    visit(tree, "element", (node: Node) => {
      if (!isImageNode(node)) return

      const { src } = node.properties
      const dimensions = getImageSize(src, dir)

      if (!dimensions) return

      // Replace slashes from windows paths with forward slashes
      const originalPath = path.join(srcPath, src).replace(/\\/g, "/")
      const translatedImgPath = getTranslatedImgPath(originalPath, locale)
      const imageIsTranslated = checkIfImageIsTranslated(translatedImgPath)

      // If translated image exists and current locale is not 'en', use it instead of original
      node.properties.src =
        imageIsTranslated && locale !== DEFAULT_LOCALE
          ? translatedImgPath
          : originalPath
      node.properties.width = dimensions.width
      node.properties.height = dimensions.height
      node.properties.aspectRatio =
        (dimensions.width || 1) / (dimensions.height || 1)

      // Add image node to array
      imageNodes.push(node)
    })

    // Await generating plaiceholder images, adding base64 to image nodes
    for (const image of imageNodes) {
      await addBase64Placeholder(image)
    }
  }
}

export default setImageSize
