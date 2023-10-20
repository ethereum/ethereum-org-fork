import fetchAndSaveFileIds from "@/scripts/crowdin/source-files/fetchAndSaveFileIds"
import getAndSaveDirectories from "@/scripts/crowdin/source-files/fetchAndSaveDirectories"
import getDirectoryIds from "@/scripts/crowdin/utils"
import getTranslationCostsReports from "@/scripts/crowdin/reports/getTranslationCostsReports"
import { getTranslatedMarkdownPaths } from "@/scripts/markdownChecker"

async function main() {
  await getAndSaveDirectories()
  const directoryIds = getDirectoryIds()
  await fetchAndSaveFileIds(directoryIds)
  const translatedMarkdownPaths = await getTranslatedMarkdownPaths()
  await getTranslationCostsReports(translatedMarkdownPaths)
}

main()

export default main
