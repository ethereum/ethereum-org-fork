import {
  Box,
  Flex,
  Show,
  SimpleGrid,
  Wrap,
  WrapItem,
  useToken,
} from "@chakra-ui/react"

import type { ChildOnlyProp, Lang, TranslationKey } from "@/lib/types"
import type { MdPageContent, RoadmapFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { Button, ButtonLink } from "@/components/Buttons"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page,
  Title,
} from "@/components/MdComponents"
import OldText from "@/components/OldText"
import Pill from "@/components/Pill"
import RoadmapActionCard from "@/components/Roadmap/RoadmapActionCard"
import RoadmapImageContent from "@/components/Roadmap/RoadmapImageContent"
import TableOfContents from "@/components/TableOfContents"
import LeftNavBar from "@/components/LeftNavBar"

import { isLangRightToLeft } from "@/lib/utils/translations"

const CardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    align="center"
    bg="layer2Gradient"
    py={12}
    px={{ base: 0, lg: 8 }}
    mb={{ base: 8, lg: 0 }}
    maxH={{ base: "100%", lg: "none" }}
    {...props}
  />
)

const TitleCard = (props: ChildOnlyProp) => (
  <Flex w="full" p={8} direction="column" justify="flex-start" {...props} />
)

// Roadmap layout components
export const roadmapComponents = {
  CardGrid,
  Pill,
  RoadmapActionCard,
  RoadmapImageContent,
}

interface IProps
  extends ChildOnlyProp,
    Pick<MdPageContent, "slug" | "tocItems"> {
  frontmatter: RoadmapFrontmatter
}
export const RoadmapLayout: React.FC<IProps> = ({
  children,
  frontmatter,
  slug,
  tocItems,
}) => {
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)

  const dropdownLinks: ButtonDropdownList = {
    text: "Roadmap Options" as TranslationKey,
    ariaLabel: "Roadmap options dropdown menu",
    items: [
      {
        text: "Roadmap home" as TranslationKey,
        to: "/roadmap/",
        matomo: {
          eventCategory: `Roadmap dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap home",
        },
      },
      {
        text: "Better security" as TranslationKey,
        to: "/roadmap/security",
        matomo: {
          eventCategory: `Roadmap security dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap security",
        },
      },
      {
        text: "Scaling" as TranslationKey,
        to: "/roadmap/scaling",
        matomo: {
          eventCategory: `Roadmap scaling dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap scaling home",
        },
      },
      {
        text: "Better user experience" as TranslationKey,
        to: "/roadmap/user-experience/",
        matomo: {
          eventCategory: `Roadmap user experience dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap user experience home",
        },
      },
      {
        text: "Future-proofing" as TranslationKey,
        to: "/roadmap/future-proofing",
        matomo: {
          eventCategory: `Roadmap future-proofing dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap future-proofing home",
        },
      },
    ],
  }

  return (
    <Box position="relative">
      <HeroContainer>
        <Flex w="100%" flexDirection={{ base: "column", md: "row" }}>
          <TitleCard>
            {/* TODO: Double check this slug works */}
            <Breadcrumbs slug={slug} /> <Title>{frontmatter.title}</Title>
            <OldText>{frontmatter.description}</OldText>
            {frontmatter?.buttons && (
              // FIXME: remove the `ul` override once removed the corresponding
              // global styles in `src/@chakra-ui/gatsby-plugin/styles.ts`
              <Wrap spacing={2} marginBottom={4} sx={{ ul: { m: 0 } }}>
                {frontmatter.buttons.map((button, idx) => {
                  if (button?.to) {
                    return (
                      <WrapItem key={idx}>
                        <ButtonLink variant={button?.variant} to={button?.to}>
                          {button.label}
                        </ButtonLink>
                      </WrapItem>
                    )
                  }
                  return (
                    <WrapItem key={idx}>
                      <Button variant={button?.variant} toId={button?.toId}>
                        {button?.label}
                      </Button>
                    </WrapItem>
                  )
                })}
              </Wrap>
            )}
            <TableOfContents
              position="relative"
              zIndex="2"
              items={tocItems}
              isMobile
            />
          </TitleCard>
          <Image
            src={frontmatter.image}
            alt={frontmatter.alt ?? ""}
            style={{ objectFit: "contain" }}
            alignSelf={{
              base: "center",
              lg: "normal",
            }}
            bgRepeat="no-repeat"
            flex="1 1 100%"
            right={0}
            bottom={0}
            width={600}
            height={336}
            overflow="initial"
            maxW={{
              base: "538px",
              lg: "full",
            }}
          />
        </Flex>
      </HeroContainer>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        {/* TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <LeftNavBar
          hideBelow={lgBp}
          dropdownLinks={dropdownLinks}
          maxDepth={frontmatter.sidebarDepth!}
          tocItems={tocItems}
        />
        <ContentContainer id="content">
          {children}
          <FeedbackCard />
        </ContentContainer>
        <Show below="lg">
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        </Show>
      </Page>
    </Box>
  )
}
