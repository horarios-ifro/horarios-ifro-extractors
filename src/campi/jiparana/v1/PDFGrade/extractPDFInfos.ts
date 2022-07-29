import chunk from "lodash/chunk";
import zip from "lodash/zip";
import { getDocument } from "pdfjs-dist/legacy/build/pdf";
import { getDateRangeFromDateStr } from "./utils/getDateRangeFromDateStr";
import {
  IExtractedPDFInfos,
  IExtractedPDFInfosClass,
  IExtractedPDFInfosClassDay,
  IExtractedPDFInfosClassDaySubject,
} from "./interfaces";
import { PAGES } from "./utils/PAGES";

export const extractPDFInfos = async (
  pdfUrl: string
): Promise<IExtractedPDFInfos> => {
  const doc = await getDocument(pdfUrl).promise;

  const extractedPDFInfos: IExtractedPDFInfos = {
    url: pdfUrl,
    startDate: -1,
    endDate: -1,
    classes: [],
  };

  for (let { pageIndex, classesCount } of PAGES) {
    const page = await doc.getPage(pageIndex);

    const textContent = await page.getTextContent();

    const allTextNodes = textContent.items
      .map((i) => (i as any).str?.trim())
      .filter((i: string | undefined) => i && i.length > 0) as string[];

    if (pageIndex === 1) {
      const [, dateStr] = allTextNodes;

      const { startDate, endDate } = getDateRangeFromDateStr(dateStr);

      extractedPDFInfos.startDate = startDate.getTime();
      extractedPDFInfos.endDate = endDate.getTime();
    }

    const tableTextNodesPlain = allTextNodes
      .slice(4, -12)
      .filter((_, idx) => idx === 0 || (idx + 1) % (classesCount + 1) !== 0);

    const tableTextNodesRows: string[][] = chunk(
      tableTextNodesPlain,
      classesCount
    );

    const tableRowsCompact: string[][] = <string[][]>zip(...tableTextNodesRows);

    const classes = tableRowsCompact.reduce((acc, [label, ...rest]) => {
      const days = chunk(rest, 10).map<IExtractedPDFInfosClassDay>((i) => ({
        subjects: i.map<IExtractedPDFInfosClassDaySubject>((label) =>
          label === "-"
            ? null
            : {
                label,
              }
        ),
      }));

      return [...acc, { label, days }];
    }, [] as IExtractedPDFInfosClass[]);

    extractedPDFInfos.classes.push(...classes);
  }

  return extractedPDFInfos;
};
