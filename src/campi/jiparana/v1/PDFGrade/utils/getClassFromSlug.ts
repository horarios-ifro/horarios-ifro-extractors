import { COURSES_SLUGS_MAPPING } from "./COURSES_SLUGS_MAPPING";
import { ICourseYear } from "../views/interfaces/ICourseYear";
import { ICourseYearClassLabel } from "../views/interfaces/ICourseYearClassLabel";

export const getClassFromSlug = (slug: string) => {
  const year = slug[0] as ICourseYear;
  const label = slug[2] as ICourseYearClassLabel;
  const course = COURSES_SLUGS_MAPPING[slug.slice(4).trim()];

  const id = `${course}-${year}-${label}`;

  return {
    id,
    year,
    course,
    slugs: [slug],
    label: label,
  };
};
