import { Text } from "@chakra-ui/react"

import BannerNotification from "@/components/BannerNotification"
import Translation from "@/components/Translation"

import type { TranslationKey } from "@/lib/types"

type PostMergeBannerProps = {
  translationString: TranslationKey
}

const PostMergeBanner = ({ translationString }: PostMergeBannerProps) => (
  <BannerNotification
    shouldShow
    zIndex={1} // TODO: Update to use Chakra token
    textAlign="center"
    sx={{ a: { textDecoration: "underline" } }}
  >
    <Text maxW="100ch" p="0">
      <Translation id={translationString} />
    </Text>
  </BannerNotification>
)

export default PostMergeBanner
