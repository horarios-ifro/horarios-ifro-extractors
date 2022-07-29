import { extractGradesFromDocument } from "./extractGradesFromDocument";
import { parseDocument } from "../../../../../utils/DOM/parseDocument/parseDocument";

export const fetchGrades = (gradesUrl: string) =>
  fetch(gradesUrl)
    .then((res) => res.text())
    .then(parseDocument)
    .then(extractGradesFromDocument);
