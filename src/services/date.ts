import moment from 'moment-timezone';

// NumOfdays의 return 숫자는 개발 편의을 위해 추가한 것
const NumOfdays = (): number =>
  process.env.NODE_ENV == 'development'
    ? 23
    : Number(moment().tz('Asia/Seoul').format('DD'));

const TodayDate = (): string => moment().tz('Asia/Seoul').format('YY-MM-DD');
const TodaySpecDate = (): string =>
  moment().tz('Asia/Seoul').format('YY-MM-DD HH:mm');
const TodayWeek = (): number => moment().tz('Asia/Seoul').day();
// 요일
// 0: 일, 1: 월, 2: 화. 3: 수, 4: 목, 5: 금, 6: 토

export { NumOfdays, TodayDate, TodaySpecDate, TodayWeek };
