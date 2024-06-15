import dayjs from 'dayjs';

const convertUtcToIst = (date) => {
  return date.add(5, 'hour').add(30, 'minute');
};

const convertIstToUtc = (date) => {
  return date.subtract(5, 'hour').subtract(30, 'minute');
}

const generateCronPattern = (date, frequency, dayOfWeek) => {
  console.log(date.minute());
  const minutes = date.minute();
  const hours = date.hour();
  const weekDay = date.day();
  const monthDay = date.date();
  const month = date.month() + 1;
  
  switch (frequency) {
    case 'daily':
      return `${minutes} ${hours} * * *`;
    case 'weekly':
      return `${minutes} ${hours} * * ${weekDay}`;
    case 'monthly':
      return `${minutes} ${hours} ${monthDay} * *`;
    case 'specific-day':
      return `${minutes} ${hours} * * ${dayOfWeek}`;
    default:
      return `${minutes} ${hours} ${monthDay} ${month} *`;
  }
};

const convertCronToDateTime = (cronString) => {
  const [minute, hour, dayOfMonth, month, dayOfWeek] = cronString.split(' ');

  const current = dayjs();

  const newMinute = minute === '*' ? current.minute() : parseInt(minute, 10);
  const newHour = hour === '*' ? current.hour() : parseInt(hour, 10);
  const newDayOfMonth = dayOfMonth === '*' ? current.date() : parseInt(dayOfMonth, 10);
  const newMonth = month === '*' ? current.month() + 1 : parseInt(month, 10); // Day.js months are 0-indexed
  const newYear = current.year();

  const newDate = dayjs(new Date(newYear, newMonth - 1, newDayOfMonth, newHour, newMinute));

  if (dayOfWeek !== '*') {
    const targetDayOfWeek = parseInt(dayOfWeek, 10);
    const currentDayOfWeek = newDate.day();

    const dayDifference = (targetDayOfWeek - currentDayOfWeek + 7) % 7;
    newDate.add(dayDifference, 'day');
  }

  return newDate.toISOString();
};

const cronModule = {
  convertUtcToIst,
  convertIstToUtc,
  generateCronPattern,
  convertCronToDateTime
};

export default cronModule;