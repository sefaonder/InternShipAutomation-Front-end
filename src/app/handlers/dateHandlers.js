import moment from 'moment';

export const getBusinessDays = (startDate, endDate, holidayDates) => {
  let count = 0;
  let currentDate = moment(startDate);
  let finalDate = moment(endDate);

  while (currentDate.isBefore(finalDate)) {
    if (
      currentDate.day() !== 0 &&
      currentDate.day() !== 6 &&
      !holidayDates.includes(currentDate.format('DD-MM-YYYY'))
    ) {
      count++;
    }
    currentDate.add(1, 'days');
  }

  return count;
};

export const shouldDisableDate = (date, holidayDates) => {
  // Tarih hafta sonuna mı denk geliyor?
  const weekendDays = [0, 6];
  console.log('date', date);
  if (weekendDays.includes(date.day())) {
    return true;
  }
  // Özel tatil günleri devre dışı bırak
  if (holidayDates.some((holiday) => moment(holiday).isSame(date, 'day'))) {
    return true;
  }
  return false;
};
