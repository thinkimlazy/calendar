// newDate в каждой функции, чтобы они были чистыми
export function getFirstDayOfMonth(date) {
  const newDate = new Date(date);
  newDate.setDate(1);
  newDate.setHours(12, 0, 0, 0); // dodge timezone stuff
  return newDate;
}

export function getLastDayOfMonth(date) {
  let newDate = new Date(date);
  newDate.setHours(12, 0, 0, 0); // dodge timezone stuff
  newDate = addMonths(newDate, 1);
  newDate.setDate(0);
  return newDate;
}

export function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}


export function isSameMonth(date1, date2) {
  return date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}

/**
 * is date1 same or before than date2
 * @param date1
 * @param date2
 * @returns {boolean}
 */
export function isSameDayOrBefore(date1, date2) {
  const isSameDay = date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  return isSameDay || date1 < date2;
}

/**
 *
 * @param date
 * @returns {Date}
 */
export function getNextDay(d) {
  const date = new Date(d);
  return new Date(date.setDate(date.getDate() + 1))
}

/**
 *
 * @param d - date
 * @param n - nums of month (also it can be negative)
 * @returns {Date}
 */
export function addMonths(d, n) {
  const date = new Date(d);
  const currentMonth = date.getMonth();
  date.setMonth(date.getMonth() + n);

  if ((date.getMonth() !== ((currentMonth + n) % 12) && n > 0)){
    date.setDate(0);
  }
  return date;
}

export function getMonday(date) {
  const newDate = new Date(date);
  var day = newDate.getDay(),
    diff = newDate.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
  return new Date(newDate.setDate(diff));
}

export function getSunday(d) {
  const date = new Date(d);
  const day = date.getDay();
  if (day === 0) return date;
  return new Date(date.setDate(date.getDate() + 7 - date.getDay()))
}
