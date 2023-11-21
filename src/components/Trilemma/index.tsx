import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Hide,
  useToken,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import Card from "@/components/Card"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import {
  type TriangleSVGProps,
  TriangleSVG,
} from "@/components/Trilemma/Triangle"
import { useTrilemma } from "@/components/Trilemma/useTrilemma"

const Trilemma = () => {
  const { t } = useTranslation("page-roadmap-vision")
  const {
    trilemmaChecks,
    mobileModalOpen,
    handleClick,
    handleModalClose,
    cardDetail,
  } = useTrilemma()

  const triangleSVGProps: TriangleSVGProps = {
    handleClick,
    ...trilemmaChecks,
  }

  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  return (
    <Flex
      alignItems="flex-start"
      flexDirection={{ base: "column", lg: "row" }}
      justifyContent="space-between"
    >
      <Flex
        flexDirection="column"
        my={{ base: 8, md: 12 }}
        mx={{ md: 12 }}
        py={8}
        flex={{
          base: "1 1 100%",
          lg: "0 1 500px",
        }}
      >
        <OldHeading fontSize="2rem" mt={0}>
          {t("page-roadmap-vision-trilemma-h2")}
        </OldHeading>
        <Text>{t("page-roadmap-vision-trilemma-p")}</Text>
        <Text>{t("page-roadmap-vision-trilemma-p-1")}</Text>
        <Text>{t("page-roadmap-vision-trilemma-p-2")}</Text>
        <Text fontWeight={600} hideFrom={lgBp}>
          {t("page-roadmap-vision-trilemma-modal-tip")}:
        </Text>
        <Card {...cardDetail} mt={8} minH="300px" hideBelow={lgBp} />
      </Flex>
      <Hide above={lgBp}>
        <Drawer
          isOpen={mobileModalOpen}
          onClose={handleModalClose}
          placement="bottom"
        >
          <DrawerOverlay background="rgba(0,0,0,0.3)" />
          <DrawerContent
            border="none"
            borderTopRadius="1rem"
            background="background.base"
          >
            <Card
              {...cardDetail}
              background="none"
              border="none"
              justifyContent="flex-start"
              my={8}
            />
            <DrawerCloseButton top={6} right={6} />
          </DrawerContent>
        </Drawer>
      </Hide>
      <TriangleSVG {...triangleSVGProps} />
    </Flex>
  )
}

export default Trilemma
