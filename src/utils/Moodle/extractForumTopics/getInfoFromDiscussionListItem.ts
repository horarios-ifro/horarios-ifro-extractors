import { IExtractedForumTopic } from "./interfaces/IExtractedForumTopic";
import { querySelector } from "../../DOM/querySelector/querySelector";

export const getInfoFromDiscussionListItem = async (
  itemElement: HTMLTableRowElement
): Promise<IExtractedForumTopic> => {
  const anchorElement = (await querySelector<HTMLAnchorElement>(
    "th:nth-child(2) > div:nth-child(1) > a:nth-child(1)",
    itemElement
  ))!;

  const timeCreatedElement = (await querySelector<HTMLTimeElement>(
    'time[id^="time-created"]',
    itemElement
  ))!;

  const link = anchorElement.getAttribute("href")!;

  const title = anchorElement.textContent!.trim();

  const publishedAt = parseInt(
    timeCreatedElement.getAttribute("data-timestamp")!
  );

  return {
    link,
    title,
    publishedAt,
  };
};
