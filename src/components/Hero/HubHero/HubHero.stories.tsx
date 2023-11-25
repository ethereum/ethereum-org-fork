import { useTranslation } from "react-i18next"
import { Box } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import HubHeroComponent from "./"

import type { CommonHeroProps as HubHeroProps } from "@/lib/types"

type HubHeroType = typeof HubHeroComponent

const meta = {
  title: "Organisms / Layouts / Hero",
  component: HubHeroComponent,
  parameters: {
    layout: "none",
  },
  decorators: [
    (Story) => (
      <Box maxW="container.2xl" mx="auto">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<HubHeroType>

export default meta

// TODO: Double-check correct way to mock Next.js image data
const mockImgData = "/heroes/learn-hub-hero.png"

export const HubHero: StoryObj<typeof meta> = {
  args: {
    title: "learn-hub",
    header: "hero-header",
    description: "hero-subtitle",
    heroImgSrc: mockImgData,
  },
  render: ({ title, header, description, ...props }) => {
    const { t } = useTranslation()

    const buttons: HubHeroProps["buttons"] = [
      {
        content: t("hero-button-lets-get-started"),
        toId: "what-is-crypto-ethereum",
        matomo: {
          eventCategory: "learn hub hero buttons",
          eventAction: "click",
          eventName: "lets get started",
        },
      },
      {
        content: "Button",
        matomo: {
          eventCategory: "learn hub hero buttons",
          eventAction: "click",
          eventName: "lets get started",
        },
      },
    ]

    return (
      <HubHeroComponent
        title={t(title)}
        header={t(header)}
        description={t(description)}
        buttons={buttons}
        {...props}
      />
    )
  },
}
