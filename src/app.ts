require('dotenv').config()

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

main();