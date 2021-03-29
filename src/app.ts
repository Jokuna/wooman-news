require('dotenv').config()

import schedule from "node-schedule"
import crawler from "./services/crawler";
import mailSend from "./services/mail";

import { NumOfdays } from "./services/date";

type menu = {
  date: number,
  menu: string
};

const main = async () => {
  const MonthlyMenu: Array<menu> = await crawler();
  const TodayMenu: string | undefined = MonthlyMenu.find(e => e.date === NumOfdays)?.menu;

  if (TodayMenu) {
    await mailSend(TodayMenu).catch(console.error);
  }
}

const job = schedule.scheduleJob('56 22 * * *', function(){ // 서버 시간에 맞춰서 작동함.
  main();
});