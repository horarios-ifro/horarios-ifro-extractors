import { IExtractedPDFInfos } from "../interfaces";
import { ITeacher } from "./interfaces/ITeacher";
import short from "short-uuid";
import { getTeacherSlugFromExtractedItem } from "../utils/getTeacherSlugFromExtractedItem";

export const getTeachersFromExtractedPDFInfos = async (
  extractedPDFInfos: IExtractedPDFInfos
): Promise<ITeacher[]> => {
  const teachersSlugs = Array.from(
    new Set(
      extractedPDFInfos.classes
        .map((i) =>
          i.days.map((day) => day.subjects.map((subject) => subject?.label))
        )
        .flat(2)
        .filter((i) => Boolean(i))
        .map((i) => getTeacherSlugFromExtractedItem(i as string))
    )
  );

  return teachersSlugs.map<ITeacher>((slug) => ({
    id: `tcher_${short.generate().slice(0, 3)}`,
    fullName: null,
    slugs: [slug],
  }));
};
