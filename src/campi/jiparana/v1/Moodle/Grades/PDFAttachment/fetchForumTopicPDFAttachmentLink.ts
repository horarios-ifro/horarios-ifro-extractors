import { extractPDFAttachmentFromTopicDocument } from "./extractPDFAttachmentFromTopicDocument";
import { parseDocument } from "../../../../../../utils/DOM/parseDocument/parseDocument";

export const fetchForumTopicPDFAttachmentLink = (forumTopicURL: string) =>
  fetch(forumTopicURL)
    .then((res) => res.text())
    .then(parseDocument)
    .then(extractPDFAttachmentFromTopicDocument);
