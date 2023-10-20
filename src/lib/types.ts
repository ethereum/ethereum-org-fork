import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import { AppProps } from "next/app"
import type {
  Author,
  DocsFrontmatter,
  RoadmapFrontmatter,
  StakingFrontmatter,
  StaticFrontmatter,
  TutorialFrontmatter,
  UpgradeFrontmatter,
  UseCasesFrontmatter,
} from "@/lib/interfaces"

export type ChildOnlyProp = { children?: ReactNode }

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type Frontmatter =
  | RoadmapFrontmatter
  | UpgradeFrontmatter
  | StaticFrontmatter
  | UseCasesFrontmatter
  | StakingFrontmatter
  | DocsFrontmatter
  | TutorialFrontmatter

export type Lang =
  | "en"
  | "ar"
  | "az"
  | "bg"
  | "bn"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "es"
  | "fa"
  | "fi"
  | "fr"
  | "gl"
  | "gu"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "ig"
  | "it"
  | "ja"
  | "ka"
  | "kk"
  | "km"
  | "ko"
  | "lt"
  | "ml"
  | "mr"
  | "ms"
  | "nl"
  | "nb"
  | "pcm"
  | "ph"
  | "pl"
  | "pt"
  | "pt-br"
  | "ro"
  | "ru"
  | "se"
  | "sk"
  | "sl"
  | "sr"
  | "sw"
  | "ta"
  | "th"
  | "tr"
  | "uk"
  | "ur"
  | "uz"
  | "vi"
  | "zh"
  | "zh-tw"

export type StaticPaths = { params: { slug: string[] }; locale: string }[]

export type TranslationKey = string

/**
 * Quiz data types
 */
type QuizLevel = "beginner" | "intermediate" | "advanced"

export type QuizzesSection = {
  id: string
  level: QuizLevel
  next?: string
}

export type QuizzesListItem = QuizzesSection & {
  quizHandler: (id: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

export type QuizStatus = "neutral" | "success" | "error"

export type CompletedQuizzes = { [key: string]: [boolean, number] }

export type UserStats = {
  score: number
  average: number[]
  completed: string
}

export type QuizShareStats = { score: number; total: number }

/**
 * Staking
 */
export type StakingPage = "solo" | "saas" | "pools"

/**
 * File contributors
 */
export type FileContributorsState = {
  loading: boolean
  authors?: Array<Author>
  error?: unknown
}
