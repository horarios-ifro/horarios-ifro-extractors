import { getDOMParser } from "../DOMParser/getDOMParser";

export const parseDocument = async (html: string) => {
  const parser = await getDOMParser();

  return parser.parseFromString(html, "text/html");
};
