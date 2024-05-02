import moment from 'moment';

export const getBusinessDays = (startDate, endDate, holidayDates, weekDayWork) => {
  let count = 0;
  let currentDate = moment(startDate);
  let finalDate = moment(endDate);

  while (currentDate.isBefore(finalDate)) {
    if (calculateWeeklyWork(currentDate, weekDayWork) && !isHoliday(currentDate, holidayDates)) {
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
  return holidays.some((holiday) => moment(holiday).isSame(date, 'day'));
}

export const shouldDisableDate = (date, holidayDates, weekDayWork) => {
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
