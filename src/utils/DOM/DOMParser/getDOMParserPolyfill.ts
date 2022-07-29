export const getDOMParserPolyfill = () =>
  import("@xmldom/xmldom").then(({ DOMParser }) => DOMParser);
