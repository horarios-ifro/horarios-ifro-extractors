export const getTeacherSlugFromExtractedItem = (extractedItem: string) =>
  extractedItem.split("-").slice(-1).join(" ").trim();
