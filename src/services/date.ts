import moment from 'moment-timezone';

const NumOfdays = (): number => Number(moment().tz('Asia/Seoul').format('DD'));
const TodayDate = (): string => moment().tz('Asia/Seoul').format('YY-MM-DD');

export { NumOfdays, TodayDate };
