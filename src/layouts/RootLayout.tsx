import { join } from "path"

import { useRouter } from "next/router"
import type { ReactNode } from "react"
import { Container } from "@chakra-ui/react"

import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import TranslationBanner from "@/components/TranslationBanner"
import TranslationBannerLegal from "@/components/TranslationBannerLegal"

import { toPosixPath } from "@/lib/utils/relativePath"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { lightTheme as oldTheme } from "@/theme"

type RootProps = {
  children: ReactNode
  contentIsOutdated: boolean
  contentNotTranslated: boolean
  lastDeployDate: string
}

export const RootLayout = ({
  children,
  contentIsOutdated,
  contentNotTranslated,
  lastDeployDate,
}: RootProps) => {
  const { locale, asPath } = useRouter()

  const isLegal =
    asPath.includes(`/cookie-policy/`) ||
    asPath.includes(`/privacy-policy/`) ||
    asPath.includes(`/terms-of-use/`) ||
    asPath.includes(`/contributing/`) ||
    asPath.includes(`/style-guide/`)

  const isPageTranslationOutdated = contentIsOutdated
  const isPageLanguageEnglish = locale === DEFAULT_LOCALE
  const shouldShowTranslationBanner =
    (isPageTranslationOutdated ||
      (contentNotTranslated && !isPageLanguageEnglish)) &&
    !isLegal
  const originalPagePath = toPosixPath(join(DEFAULT_LOCALE, asPath))

  return (
    <Container mx="auto" maxW={oldTheme.variables.maxPageWidth}>
      <Nav path={asPath} />

      <TranslationBanner
        shouldShow={shouldShowTranslationBanner}
        isPageContentEnglish={contentNotTranslated}
        originalPagePath={originalPagePath}
      />

      <TranslationBannerLegal
        shouldShow={isLegal}
        originalPagePath={originalPagePath}
      />

      {children}

      <Footer lastDeployDate={lastDeployDate} />
    </Container>
  )
}
