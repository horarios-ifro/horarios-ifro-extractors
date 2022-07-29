import { IExtractedPDFInfos } from "../interfaces";
import { ISubject } from "./interfaces/ISubject";
import short from "short-uuid";
import { getSubjectSlugFromExtractedItem } from "../utils/getSubjectSlugFromExtractedItem";

export const getSubjectsFromExtractedPDFInfos = async (
  extractedPDFInfos: IExtractedPDFInfos
): Promise<ISubject[]> => {
  const subjectsSlugs = Array.from(
    new Set(
      extractedPDFInfos.classes
        .map((i) =>
          i.days.map((day) => day.subjects.map((subject) => subject?.label))
        )
        .flat(2)
        .filter((i) => Boolean(i))
        .map((i) => getSubjectSlugFromExtractedItem(i as string))
    )
  );

  return subjectsSlugs.map<ISubject>((slug) => ({
    id: `subj_${short.generate().slice(0, 3)}`,
    name: null,
    slugs: [slug],
  }));
};
