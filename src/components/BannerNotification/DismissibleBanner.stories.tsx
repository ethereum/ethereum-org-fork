import { Meta, StoryObj } from "@storybook/react"

import DismissibleBanner from "@/components/Banners/DismissibleBanner"

export default {
  component: DismissibleBanner,
} as Meta<typeof DismissibleBanner>

/**
 * Story taken from DismissibleBanner component
 */
const dismissibleBannerStoryPageKey = "dismissibleBannerStoryPageKey"
const bannerText = "This is a dismissible banner"

export const DismissibleBannerStory: StoryObj<typeof DismissibleBanner> = {
  play: () => {
    localStorage.setItem(dismissibleBannerStoryPageKey, "false")
  },
  render: () => {
    const children = <div>{bannerText}</div>
    return (
      <DismissibleBanner
        children={children}
        storageKey={dismissibleBannerStoryPageKey}
      />
    )
  },
}
