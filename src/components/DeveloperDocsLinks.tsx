import React from "react"
import { ListItem, UnorderedList } from "@chakra-ui/react"

import Translation from "@/components/Translation"
import InlineLink from "@/components/Link"
import docLinks from "@/data/developer-docs-links.yaml"

export interface IProps {
  headerId: string
}

const DeveloperDocsLinks: React.FC<IProps> = ({ headerId }) => (
  <React.Fragment>
    {docLinks
      .filter(({ id }) => id.includes(headerId))
      .map(({ items, id }) => (
        <UnorderedList ml={6} spacing={3} key={id}>
          {items &&
            items.map(({ id, to, path, description, items }) => (
              <ListItem key={id}>
                {to || path ? (
                  <InlineLink to={to || path}>
                    <Translation id={`page-developers-docs:${id}`} />
                  </InlineLink>
                ) : (
                  <Translation id={`page-developers-docs:${id}`} />
                )}
                <i>
                  {" – "}
                  <Translation id={`page-developers-docs:${description}`} />
                </i>
                <UnorderedList
                  ml={6}
                  mt={3}
                  spacing={3}
                  style={{ listStyleType: "circle" }}
                >
                  {items &&
                    items.map(({ id, to, path }) => (
                      <ListItem key={id}>
                        <InlineLink to={to || path}>
                          <Translation id={`page-developers-docs:${id}`} />
                        </InlineLink>
                      </ListItem>
                    ))}
                </UnorderedList>
              </ListItem>
            ))}
        </UnorderedList>
      ))}
  </React.Fragment>
)

export default DeveloperDocsLinks
