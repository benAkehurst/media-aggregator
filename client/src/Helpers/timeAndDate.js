import moment from 'moment';

export function convertDate(date) {
  const convertedDate = moment(date).format('DD/MM/YYYY');
  return convertedDate;
}
