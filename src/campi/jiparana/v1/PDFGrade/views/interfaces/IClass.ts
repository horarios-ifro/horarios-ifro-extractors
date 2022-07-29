import { ICourse } from "./ICourse";
import { ICourseYearClassLabel } from "./ICourseYearClassLabel";
import { ICourseYear } from "./ICourseYear";

export type IClass = {
  id: string;

  year: ICourseYear;

  label: ICourseYearClassLabel;

  slugs: string[];

  course: ICourse;
};
