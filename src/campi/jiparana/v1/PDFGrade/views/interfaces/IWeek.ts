import { IWeekItem } from "./IWeekItem";

export type IWeek = {
  pdfURL: string;
  items: IWeekItem[];

  startDate: number;
  endDate: number;
};
