import 'dotenv/config';


import schedule from 'node-schedule';
import { crawler, crawlerPlan } from './services/crawler';
import mailSend from './services/mail';

import { NumOfdays } from './services/date';

type menu = {
  date: number;
  menu: string;
};

const main = async () => {
  // const MonthlyMenu: Array<menu> = await crawler(
  //   'http://www.wooman.or.kr/community/?act=sub1_3'
  // );
  // const MonthlySchedule: Array<menu> = await crawlerPlan(
  //   'http://www.wooman.or.kr/community/?act=sub1_2'
  // );
  // const TodayMenu: string | undefined = MonthlyMenu.find(
  //   (e) => e.date === NumOfdays()
  // )?.menu;

  // const TodaySchedule: string | undefined = MonthlySchedule.find(
  //   (e) => e.date === NumOfdays()
  // )?.menu;

  // if (TodayMenu && TodaySchedule) {
  //   await mailSend(TodayMenu, TodaySchedule, MonthlyMenu).catch(console.error);
  // }

  console.log('wow2')
  await mailSend('', '', []).catch(console.error);
};

console.log("Why doesn't working")
main();

// Main Function
// schedule.scheduleJob('30 22 * * *', function () {
//   // 서버 시간에 맞춰서 작동함.
//   // 30 22 * * * (Ubuntu 서버 시간 기준) 오전 7시 30분
//   // 1분 매크로 0 * * * * *
//   main();
// });
