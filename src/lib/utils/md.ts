import fs from "fs"
import { extname } from "path"
import { join } from "path"
import matter from "gray-matter"

import { CONTENT_DIR } from "../constants"

const contentDir = join(process.cwd(), CONTENT_DIR)

const getPostSlugs = (dir: string, files: string[] = []) => {
  // Temporal blacklist of content pages with conflicts
  // When a content page from this list is migrated (and he components being used), should be removed from this list
  const blacklist = [
    "/community/events",
    "/community/online",
    "/contributing",
    "/contributing/translation-program",
    "/contributing/translation-program/translators-guide",
    "/cookie-policy",
    "/deprecated-software",
    "/foundation",
    "/nft",
    "/privacy-policy",
    "/roadmap",
    "/roadmap/beacon-chain",
    "/roadmap/merge",
    "/roadmap/merge/issuance",
    "/roadmap/scaling",
    "/security",
    "/staking/pools",
    "/staking/saas",
    "/staking/solo",
    "/staking/withdrawals",
    "/web3",
  ]

  // Skip /translations dir for now until we set up i18n
  // Skip /developers dir for now until we set up required layout
  if (dir.includes("/translations") || dir.includes("/developers")) return []

  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir)

  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`

    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getPostSlugs(name, files)
    } else {
      const fileExtension = extname(name)

      if (fileExtension === ".md") {
        // Ignore blacklisted md files from compilation
        let ignore = false
        for (const page of blacklist) {
          if (name.includes(page)) {
            ignore = true
          }
        }

        if (!ignore) {
          files.push(
            name.replace("public/content", "").replace("/index.md", "")
          )
        }
      }
    }
  }

  return files
}

// Removes {#...} from .md file so content can be parsed properly
const removeAnchorLinks = (mdContent: string) =>
  mdContent.replace(/{#.*?}/g, "").trim()

export const getContentBySlug = (slug: string, fields: string[] = []) => {
  const realSlug = `${slug}/index.md`
  const fullPath = join(contentDir, realSlug)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data: frontmatter, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug
    }

    if (field === "content") {
      items[field] = removeAnchorLinks(content)
    }

    if (typeof frontmatter[field] !== "undefined") {
      items[field] = frontmatter[field]
    }
  })

  // return { items, staticPath }
  return items
}

export const getContent = (fields: string[] = []) => {
  const slugs = getPostSlugs(CONTENT_DIR)
  const content = slugs.map((slug) => getContentBySlug(slug as string, fields))

  return content
}
