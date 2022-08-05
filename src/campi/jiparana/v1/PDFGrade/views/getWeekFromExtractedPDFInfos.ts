import { IExtractedPDFInfos } from "../interfaces";
import { getTeacherSlugFromExtractedItem } from "../utils/getTeacherSlugFromExtractedItem";
import { getSubjectSlugFromExtractedItem } from "../utils/getSubjectSlugFromExtractedItem";
import { getClassFromSlug } from "../utils/getClassFromSlug";
import { IWeek, IWeekItem } from "./interfaces";

export const getWeekFromExtractedPDFInfos = (
  extractedPDFInfos: IExtractedPDFInfos
): IWeek => {
  return {
    pdfURL: extractedPDFInfos.url,
    startDate: extractedPDFInfos.startDate,
    endDate: extractedPDFInfos.endDate,
    items: extractedPDFInfos.classes.reduce(
      (acc, klassInfo) => [
        ...acc,
        ...klassInfo.days
          .map((dayTimes, weekDay) =>
            dayTimes.subjects.map<IWeekItem>((subjectInfo, order) => ({
              order,
              weekDay,
              klass: getClassFromSlug(klassInfo.label).id,
              subjectSlug:
                subjectInfo &&
                getSubjectSlugFromExtractedItem(subjectInfo.label),
              teacherSlug:
                subjectInfo &&
                getTeacherSlugFromExtractedItem(subjectInfo.label),
            }))
          )
          .flat(),
      ],
      [] as IWeekItem[]
    ),
  };
};
