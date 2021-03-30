import moment from 'moment-timezone';
const NumOfdays = () => Number(moment().tz("Asia/Seoul").format('DD'));
const TodayDate = () => moment().tz("Asia/Seoul").format('YY-MM-DD');

export {
  NumOfdays,
  TodayDate
}