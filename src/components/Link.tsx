import { FC, RefAttributes } from "react"
import {
  Icon,
  VisuallyHidden,
  forwardRef,
  StyleProps,
  Link as ChakraLink,
} from "@chakra-ui/react"
import { RxExternalLink } from "react-icons/rx"
import { useRouter } from "next/router"
import {
  Link as NextLink,
  type LinkProps as NextLinkProps,
} from "@chakra-ui/next-js"

// import { Lang } from "../utils/languages"
// import { trackCustomEvent, MatomoEventOptions } from "../utils/matomo"
import * as url from "@/lib/utils/url"
import { getRelativePath } from "@/lib/utils/relativePath"

import { DISCORD_PATH, SITE_URL } from "@/lib/constants"
// import { Direction } from "../types"

type BaseProps = {
  /** @deprecated Use `href` prop instead */
  to?: string
  href?: string
  hideArrow?: boolean
  isPartiallyActive?: boolean
  activeStyle?: StyleProps
  // customEventOptions?: MatomoEventOptions
  // dir?: Direction // TODO: remove this prop once we use the native Chakra RTL support
}

export type LinkProps = BaseProps & Omit<NextLinkProps, "href">

type LinkComponent = FC<RefAttributes<HTMLAnchorElement> & LinkProps>

/**
 * Link wrapper which handles:
 *
 * - Hashed links
 * e.g. <Link href="/page-2/#specific-section">
 *
 * - External links
 * e.g. <Link href="https://example.com/">
 *
 * - PDFs & static files (which open in a new tab)
 * e.g. <Link href="/eth-whitepaper.pdf">
 */
export const BaseLink: LinkComponent = forwardRef(function Link(props, ref) {
  const {
    href: hrefProp,
    to,
    children,
    hideArrow,
    isPartiallyActive = true,
    activeStyle = { color: "primary.base" },
    ...rest
  } = props

  let href = (to ?? hrefProp)!

  const { asPath } = useRouter()
  const isActive = url.isHrefActive(href, asPath, isPartiallyActive)

  const isDiscordInvite = url.isDiscordInvite(href)
  const isPdf = url.isPdf(href)
  const isExternal = url.isExternal(href) || isPdf

  // Get proper download link for internally hosted PDF's & static files (ex: whitepaper)
  // Opens in separate window.
  if (isPdf) {
    href = getRelativePath(asPath, href)
  }

  if (isDiscordInvite) {
    href = new URL(DISCORD_PATH, SITE_URL).href
  }

  const commonProps = {
    ref,
    href,
    ...rest,
    ...(isActive && activeStyle),
  }

  if (isExternal) {
    return (
      <ChakraLink {...commonProps} isExternal>
        {children}
        <VisuallyHidden>(opens in a new tab)</VisuallyHidden>
        {!hideArrow && (
          <Icon
            as={RxExternalLink}
            boxSize="6"
            p="1"
            verticalAlign="middle"
            me="-1"
          />
        )}
      </ChakraLink>
    )
  }

  return <NextLink {...commonProps}>{children}</NextLink>
})

const InlineLink: FC<LinkProps> = forwardRef((props, ref) => (
  <BaseLink data-inline-link ref={ref} {...props} />
))

export default InlineLink
