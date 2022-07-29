export const getDateRangeFromDateStr = (dateStr: string) => {
  const [startStr, endStr] = dateStr.match(/((\d{1,2})\/?){1,3}/g)!;

  const startStrParts = startStr.split("/");

  let startDay = +startStrParts[0];
  let startMonth = +startStrParts[1];

  const endStrParts = endStr.split("/");
  let endDay = +endStrParts[0];
  let endMonth = +endStrParts[1];

  const startDate = new Date(2022, startMonth - 1, startDay, 0, 0);
  const endDate = new Date(2022, endMonth - 1, endDay, 23, 59);

  return { startDate, endDate };
};
