import { Box, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react"

import Breadcrumbs, { type BreadcrumbsProps } from "@/components/Breadcrumbs"
import { CallToAction } from "@/components/Hero/CallToAction"
import { Image } from "@/components/Image"

import type { CommonHeroProps } from "@/lib/types"

export interface ContentHeroProps extends Omit<CommonHeroProps, "header"> {
  breadcrumbs: BreadcrumbsProps
}

const ContentHero = ({
  breadcrumbs,
  heroImgSrc,
  buttons,
  title,
  description,
}: ContentHeroProps) => (
  <Box bgImg="bgMainGradient">
    <SimpleGrid columns={{ base: 1, lg: 2 }} maxW="1536px" mx="auto" gap="4">
      <Box
        height={{ base: "300px", md: "400px", lg: "full" }}
        order={{ lg: 1 }}
      >
        <Image
          alt=""
          src={heroImgSrc}
          loading="eager"
          style={{ objectFit: "contain" }}
          boxSize="full"
        />
      </Box>
      <Stack p={{ base: "8", lg: "16" }} spacing="9" justify="center">
        <Breadcrumbs {...breadcrumbs} />
        <Stack spacing="6">
          <Heading as="h1" size="2xl">
            {title}
          </Heading>
          <Text fontSize="lg">{description}</Text>
          {buttons && (
            <HStack spacing="4">
              {buttons.map((button, idx) => {
                if (!button) return
                return <CallToAction key={idx} {...button} />
              })}
            </HStack>
          )}
        </Stack>
        {/* TODO:
         * Add conditional Big Stat box here
         */}
      </Stack>
    </SimpleGrid>
  </Box>
)

export default ContentHero
