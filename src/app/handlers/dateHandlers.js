import moment from 'moment';

export const getBusinessDays = (startDate, endDate, holidayDates, weekDayWork) => {
  let count = 0;
  let currentDate = moment(startDate);
  let finalDate = moment(endDate);

  while (currentDate.isSameOrBefore(finalDate)) {
    if (
      calculateWeeklyWork(currentDate, weekDayWork) &&
      !isHoliday(currentDate, holidayDates) &&
      !isOfficialHoliday(currentDate)
    ) {
      count++;
    }
    currentDate.add(1, 'days');
  }

  return count;
};

function calculateWeeklyWork(date, weekDayWork) {
  const weeklyDay = weekDayWork || [];
  const day = date.day();
  return weeklyDay.includes(day);
}

function isHoliday(date, holidays) {
  return holidays.some((holiday) => moment(holiday).isSame(date.toDate(), 'day'));
}

export const shouldDisableDate = (date, holidayDates, weekDayWork) => {
  // Resmi Tatiller

  if (isOfficialHoliday(date)) {
    return true;
  }
  // Tarih hafta sonuna mı denk geliyor?
  if (weekDayWork && !calculateWeeklyWork(date, weekDayWork)) {
    return true;
  }
  // Özel tatil günleri devre dışı bırak
  if (isHoliday(date, holidayDates)) {
    return true;
  }
  return false;
};

export const isOfficialHoliday = (date) => {
  const disabledDates = [
    { month: 0, day: 1 }, // 1 Ocak (Ocak ayı 0-indexli olarak 0'dır)
    { month: 3, day: 23 }, // 23 Nisan (Nisan ayı 0-indexli olarak 3'tür)
    { month: 4, day: 1 }, // 1 Mayıs (Mayıs ayı 0-indexli olarak 4'tür)
    { month: 4, day: 19 }, // 19 Mayıs (Mayıs ayı 0-indexli olarak 4'tür)
    { month: 6, day: 15 }, // 15 Temmuz (Temmuz ayı 0-indexli olarak 6'dır)
    { month: 7, day: 30 }, // 30 Ağustos (Ağustos ayı 0-indexli olarak 7'dir)
    { month: 9, day: 29 }, // 29 Ekim (Ekim ayı 0-indexli olarak 9'dur)
  ];
  return disabledDates.some((d) => date.date() === d.day && date.month() === d.month);
};
