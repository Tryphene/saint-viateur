export function addMonthsToDate(date, monthsToAdd) {
  // Clone the original date to avoid modifying it directly
  const resultDate = new Date(date);

  // Get the current month and year of the original date
  const currentMonth = resultDate.getMonth();
  const currentYear = resultDate.getFullYear();

  // Calculate the new month and year after adding the months
  const newMonth = (currentMonth + monthsToAdd) % 12;
  const newYear = currentYear + Math.floor((currentMonth + monthsToAdd) / 12);

  // Set the new month and year on the result date
  resultDate.setMonth(newMonth);
  resultDate.setFullYear(newYear);

  return resultDate;
}

export function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateToDDMMYYYY(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}
