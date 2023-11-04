import { ChakraBaseProvider } from "@chakra-ui/react"

// Chakra custom theme
import theme from "@/@chakra-ui/theme"
// Fonts
import { inter, mono } from "@/lib/fonts"
// Types
import { AppPropsWithLayout } from "@/lib/types"

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Per-Page Layouts: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-mono: ${mono.style.fontFamily};
          }
        `}
      </style>
      <ChakraBaseProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraBaseProvider>
    </>
  )
}

export default App
