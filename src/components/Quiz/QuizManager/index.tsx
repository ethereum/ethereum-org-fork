import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaGithub } from "react-icons/fa"
import { Box, Flex, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react"

import { QuizStatus } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "@/data/quizzes"

import { INITIAL_QUIZ } from "@/lib/constants"

import QuizWidget from "../QuizWidget"
import QuizzesList from "../QuizzesList"
import QuizzesModal from "../QuizzesModal"
import QuizzesStats from "../QuizzesStats"
import { useLocalQuizData } from "../useLocalQuizData"

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

const QuizManager = () => {
  const { t } = useTranslation()

  const [userStats, updateUserStats] = useLocalQuizData()
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("neutral")
  const [currentQuiz, setCurrentQuiz] = useState(INITIAL_QUIZ)
  const { onOpen, isOpen, onClose } = useDisclosure()

  const commonQuizListProps = useMemo(
    () => ({
      userStats,
      quizHandler: setCurrentQuiz,
      modalHandler: onOpen,
    }),
    [onOpen, userStats]
  )
  return (
    <>
      <QuizzesModal isOpen={isOpen} onClose={onClose} quizStatus={quizStatus}>
        <QuizWidget
          quizKey={currentQuiz}
          currentHandler={setCurrentQuiz}
          statusHandler={setQuizStatus}
          updateUserStats={updateUserStats}
        />
      </QuizzesModal>
      <Box px={{ base: 0, lg: "8" }} py={{ base: 0, lg: "4" }} mb="12">
        <Flex direction={{ base: "column-reverse", lg: "row" }} columnGap="20">
          <Stack spacing="10" flex="1">
            <Box>
              <QuizzesList
                content={ethereumBasicsQuizzes}
                headingId={t("learn-quizzes:basics")}
                descriptionId={t("learn-quizzes:basics-description")}
                {...commonQuizListProps}
              />
              <QuizzesList
                content={usingEthereumQuizzes}
                headingId={t("learn-quizzes:using-ethereum")}
                descriptionId={t("learn-quizzes:using-ethereum-description")}
                {...commonQuizListProps}
              />
            </Box>
            <Flex
              direction={{ base: "column", xl: "row" }}
              justify="space-between"
              align="center"
              bg="background.highlight"
              borderRadius={{ lg: "lg" }}
              p="8"
              gap={{ base: "4", xl: 0 }}
            >
              <Box>
                <Text align={{ base: "center", xl: "left" }} fontWeight="bold">
                  <Translation id="learn-quizzes:want-more-quizzes" />
                </Text>

                <Text align={{ base: "center", xl: "left" }}>
                  <Translation id="learn-quizzes:contribute" />
                </Text>
              </Box>
              <ButtonLink
                href="/contributing/quizzes/"
                variant="outline"
                hideArrow
                onClick={handleGHAdd}
              >
                <Flex alignItems="center">
                  <Icon as={FaGithub} color="text" boxSize={6} me={2} />
                  <Translation id="learn-quizzes:add-quiz" />
                </Flex>
              </ButtonLink>
            </Flex>
          </Stack>
          <Box flex="1">
            <QuizzesStats
              averageScoresArray={userStats.average}
              completedQuizzes={userStats.completed}
              totalCorrectAnswers={userStats.score}
            />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default QuizManager
