import { Box, List, ListItem } from "@chakra-ui/react"

import type { ToCItem } from "@/lib/types"

import { BaseLink } from "@/components/Link"
import { IPropsItemsList } from "@/components/TableOfContents/ItemsList"

import { trimmedTitle } from "@/lib/utils/toc"

export interface IPropsTableOfContentsLink {
  item: ToCItem
}
const TableOfContentsLink: React.FC<IPropsTableOfContentsLink> = ({
  item: { title, url },
}) => {
  let isActive = false
  if (typeof window !== `undefined`) {
    isActive = window.location.hash === url
  }

  const classes = isActive ? "active" : ""

  return (
    <BaseLink
      href={url}
      className={classes}
      position="relative"
      display="inline-block"
      // `li :last-child` global selector wants to override this without `!important`
      mb="1rem !important"
      textDecoration="none"
      color="body.medium"
      fontWeight="normal"
      fontSize="xl"
      _hover={{
        color: "primary.hover",
        textDecoration: "none",
      }}
      _visited={{}}
    >
      {trimmedTitle(title)}
    </BaseLink>
  )
}

const ItemsList: React.FC<IPropsItemsList> = ({ items, depth, maxDepth }) => {
  // Return early if maxDepth hit, or if no items
  if (depth > maxDepth || !items) return null
  return (
    <>
      {items.map((item, index) => (
        <ListItem m={0} key={index}>
          <TableOfContentsLink item={item} />
        </ListItem>
      ))}
    </>
  )
}

interface IPropsToC {
  items: Array<ToCItem>
  maxDepth?: number
}
const UpgradeTableOfContents: React.FC<IPropsToC> = ({
  items,
  maxDepth = 1,
}) => (
  <Box
    as="nav"
    p={0}
    mb={8}
    overflowY="auto"
    display={{ base: "none", l: "block" }}
  >
    <List m={0} py={0} lineHeight="1.4">
      <ItemsList items={items} depth={0} maxDepth={maxDepth} />
    </List>
  </Box>
)

export default UpgradeTableOfContents
