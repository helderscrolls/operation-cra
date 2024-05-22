/**
 * Returns an array of Date objects for each day in the given month and year.
 * @param month The month for which to get all days (0-based index, January is 0, December is 11).
 * @param year The year for which to get all days.
 * @returns An array of Date objects for each day in the given month and year.
 */
export function getDaysInMonth(month: number, year: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}
