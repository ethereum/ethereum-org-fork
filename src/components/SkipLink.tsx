import { useTranslation } from "next-i18next"
import type { ComponentProps } from "react"
import { Box } from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"

type SkipLinkProps = Required<Pick<ComponentProps<typeof BaseLink>, "href">>

export const SkipLink = ({ href }: SkipLinkProps) => {
  const { t } = useTranslation("common")
  return (
    <Box bg="primary.base">
      <BaseLink
        href={href}
        lineHeight="taller"
        position="absolute"
        top="-12"
        ms="2"
        color="background.base"
        textDecorationLine="none"
        _hover={{ textDecoration: "none" }}
        _focus={{ position: "static" }}
      >
        {t("skip-to-main-content")}
      </BaseLink>
    </Box>
  )
}
