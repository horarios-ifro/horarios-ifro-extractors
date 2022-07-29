export const getSubjectSlugFromExtractedItem = (extractedItem: string) =>
  extractedItem.split("-").slice(0, -1).join("-").trim();
