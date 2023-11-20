import { Box, BoxProps, Flex, useColorModeValue } from "@chakra-ui/react"
import Translation from "@/components/Translation"
import type { ChildOnlyProp } from "@/lib/types"

const Column = ({ children }: ChildOnlyProp) => (
  <Flex
    flexDirection="column-reverse"
    ml={{ base: 2, md: 4 }}
    _first={{ ml: 0 }}
  >
    {children}
  </Flex>
)

const Cell = ({ children, color, ...props }: BoxProps) => (
  <Box
    border="1px solid"
    borderColor={color || "text"}
    color={color || "text"}
    py="0.8rem"
    px={{ base: 2, md: "1.2rem" }}
    fontSize="0.9rem"
    fontWeight="bold"
    lineHeight="none"
    textAlign="center"
    _last={{
      borderTopLeftRadius: "2xl",
      borderTopRightRadius: "2xl",
    }}
    sx={{
      "&:nth-child(-n + 2)": {
        borderBottomLeftRadius: "2xl",
        borderBottomRightRadius: "2xl",
      },
    }}
    {...props}
  >
    {children}
  </Box>
)

const ColumnName = ({ children }: ChildOnlyProp) => (
  <Cell border="none" pt={6}>
    {children}
  </Cell>
)

const AdoptionChart = () => (
  <Flex>
    <Column>
      <ColumnName>2010</ColumnName>
      <Cell color={useColorModeValue("#95935B", "#FBF9A5")}>
        <Translation id="adoption-chart-investors-label" />
      </Cell>
    </Column>

    <Column>
      <ColumnName>2014</ColumnName>
      <Cell color={useColorModeValue("#95935B", "#FBF9A5")}>
        <Translation id="adoption-chart-investors-label" />
      </Cell>
      <Cell color={useColorModeValue("#67954C", "#9EC885")}>
        <Translation id="adoption-chart-developers-label" />
      </Cell>
      <Cell color={useColorModeValue("#CB7C5E", "#E78F6E")}>
        <Translation id="adoption-chart-companies-label" />
      </Cell>
    </Column>

    <Column>
      <ColumnName>
        <Translation id="adoption-chart-column-now-label" />
      </ColumnName>
      <Cell color={useColorModeValue("#95935B", "#FBF9A5")}>
        <Translation id="adoption-chart-investors-label" />
      </Cell>
      <Cell color={useColorModeValue("#67954C", "#9EC885")}>
        <Translation id="adoption-chart-developers-label" />
      </Cell>
      <Cell color={useColorModeValue("#CB7C5E", "#E78F6E")}>
        <Translation id="adoption-chart-companies-label" />
      </Cell>
      <Cell color={useColorModeValue("#5E7492", "#8EA8CA")}>
        <Translation id="adoption-chart-artists-label" />
      </Cell>
      <Cell color={useColorModeValue("#88669B", "#AC85C2")}>
        <Translation id="adoption-chart-musicians-label" />
      </Cell>
      <Cell color={useColorModeValue("#985955", "#CA928E")}>
        <Translation id="adoption-chart-writers-label" />
      </Cell>
      <Cell color={useColorModeValue("#9E9E9E", "#B9B9B9")}>
        <Translation id="adoption-chart-gamers-label" />
      </Cell>
      <Cell color={useColorModeValue("#E78A54", "#E2B79E")}>
        <Translation id="adoption-chart-refugees-label" />
      </Cell>
    </Column>
  </Flex>
)

export default AdoptionChart
