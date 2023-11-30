export type SectionKey =
  | "useEthereum"
  | "learn"
  | "developers"
  | "enterprise"
  | "community"

export type NavItem = {
  text: string
  isPartiallyActive?: boolean
  to?: string
  items?: NavItem[]
}

export type NavSection = {
  text: string
  ariaLabel: string
  items: NavItem[]
}

export type NavSections = {
  [key in SectionKey]: NavSection
}
