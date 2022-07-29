import { IExtractedPDFInfosClass } from "./IExtractedPDFInfosClass";

export type IExtractedPDFInfos = {
  url: string;

  startDate: number;

  endDate: number;

  classes: IExtractedPDFInfosClass[];
};
