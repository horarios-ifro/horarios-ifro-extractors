import { IExtractedPDFInfos } from "../interfaces";
import { getClassFromSlug } from "../utils/getClassFromSlug";
import { IClass } from "./interfaces/IClass";

export const getClassesFromExtractedPDFInfos = (
  extractedPDFInfos: IExtractedPDFInfos
): IClass[] => {
  return extractedPDFInfos.classes
    .map(({ label }) => label)
    .map<IClass>(getClassFromSlug);
};
