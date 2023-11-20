import { RxExternalLink } from "react-icons/rx"
import {
  Avatar as ChakraAvatar,
  Center,
  forwardRef,
  LinkBox,
  LinkOverlay,
  type AvatarProps,
  type LinkProps,
  type ThemingProps,
} from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"

type AssignAvatarProps = Required<Pick<AvatarProps, "name" | "src">> &
  AvatarProps

type AvatarLinkProps = AssignAvatarProps &
  Pick<LinkProps, "href"> &
  ThemingProps<"Avatar"> & {
    label?: string
    direction?: "column" | "row"
  }

const Avatar = forwardRef<AvatarLinkProps, "div" | "a">(
  ({ href, src, name, size = "md", label, direction = "row" }, ref) => {
    const avatarProps = {
      src,
      name,
      size,
    }

    const linkProps = {
      href,
      isExternal: true,
      color: "primary.base",
    }

    if (!label)
      return (
        <ChakraAvatar
          as={BaseLink}
          ref={ref}
          showBorder
          {...avatarProps}
          {...linkProps}
        />
      )

    return (
      <LinkBox as={Center} ref={ref} flexDirection={direction} columnGap="1">
        <ChakraAvatar {...avatarProps} />
        <LinkOverlay
          as={BaseLink}
          data-peer
          display="inline-flex"
          textDecoration="none"
          alignItems="center"
          gap="1"
          p="1"
          fontSize={size !== "md" ? "xs" : "sm"}
          zIndex="overlay"
          {...linkProps}
        >
          {label}
          <RxExternalLink />
        </LinkOverlay>
      </LinkBox>
    )
  }
)

export default Avatar
