import { IExtractedForumTopic } from "./interfaces/IExtractedForumTopic";
import { querySelectorAll } from "../../DOM/querySelector/querySelectorAll";
import { getInfoFromDiscussionListItem } from "./getInfoFromDiscussionListItem";

export const extractForumTopicsFromDocument = async (
  doc: Document
): Promise<IExtractedForumTopic[]> => {
  const discussions = Array.from(
    await querySelectorAll<HTMLTableRowElement>(
      '[data-region="discussion-list-item"]',
      doc
    )
  );

  const discussionsInfos = await Promise.all(
    discussions.map(getInfoFromDiscussionListItem)
  );

  return discussionsInfos.sort((a, b) => a.publishedAt - b.publishedAt);
};
