import schedule from 'node-schedule';
import { crawler, crawlerPlan } from './services/crawler';
import mailSend from './services/mail';

import { NumOfdays } from './services/date';

type menu = {
  date: number;
  menu: string;
};

const main = async () : Promise<void> => {
  if (process.env.NODE_ENV == 'development') {
    await import('dotenv/config'); // Dynamic import
    // 개발용으로만 .env 파일 사용,
    // 배포 시, Docker-compose의 environment을 통해 환경 변수들을 가져옴
  }

  const MonthlyMenu: Array<menu> = await crawler(
    'http://www.wooman.or.kr/community/?act=sub1_3'
  );
  const MonthlySchedule: Array<menu> = await crawlerPlan(
    'http://www.wooman.or.kr/community/?act=sub1_2'
  );
  const TodayMenu: string | undefined = MonthlyMenu.find(
    (e) => e.date === NumOfdays()
  )?.menu;

  const TodaySchedule: string | undefined = MonthlySchedule.find(
    (e) => e.date === NumOfdays()
  )?.menu;

  if (TodayMenu && TodaySchedule) {
    await mailSend(TodayMenu, TodaySchedule, MonthlyMenu).catch(console.error);
  }
};

// Main Function
const timer: string = process.env.NODE_ENV == 'development' ? '20 * * * * *' : '30 22 * * *';

schedule.scheduleJob(timer, function () {
  // 서버 시간에 맞춰서 작동함.
  // 30 22 * * * (Ubuntu 서버 시간 기준) 오전 7시 30분
  // 1분 매크로 0 * * * * *
  main();
});
