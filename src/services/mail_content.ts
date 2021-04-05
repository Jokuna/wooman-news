import { NumOfdays, TodayWeek } from './date';

const MailContent = (TodayMenu, TodaySchedule, MonthlyMenu): string => {
  let text = `[메뉴]\n${TodayMenu}\n\n[복지관 일정]\n${TodaySchedule}`;
  const Menu25: string | undefined = MonthlyMenu.find((e) => e.date === 25)
    ?.menu;

  const Menu24: string | undefined = MonthlyMenu.find((e) => e.date === 24)
    ?.menu;

  const week = TodayWeek();
  const day = NumOfdays();

  // TodayList
  switch (week) {
    case 1:
      text = `도시락 세팅!!!\n` + text;
      break;
    case 2:
      text = `대체식 세팅\n` + text;
      break;
    case 3:
      text = `10시30분부터 12시 업무 지원인지 확인!\n` + text;
      break;
  }

  switch (day) {
    case 25:
      text = `1시간 일찍 퇴근하는 날~\n` + text;
      break;
    case 24:
      if (!Menu25) {
        text = `1시간 일찍 퇴근하는 날~\n` + text;
      }
      break;
    case 23:
      if (!Menu25 && !Menu24) {
        // 23일이 금요일 or 24, 25일 공휴일
        text = `1시간 일찍 퇴근하는 날~\n` + text;
      }
      break;
  }
  return text;
};

export default MailContent;
