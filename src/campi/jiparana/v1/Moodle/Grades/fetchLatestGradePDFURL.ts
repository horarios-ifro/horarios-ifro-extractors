import { fetchGrades } from "./fetchGrades";
import { fetchForumTopicPDFAttachmentLink } from "./PDFAttachment";

export const fetchLatestGradePDFURL = async (forumURL: string) => {
  const allGrades = await fetchGrades(forumURL);

  const latestGrade = allGrades[allGrades.length - 1] ?? null;

  return (
    latestGrade && (await fetchForumTopicPDFAttachmentLink(latestGrade.link))
  );
};
