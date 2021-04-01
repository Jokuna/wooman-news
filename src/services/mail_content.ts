import { NumOfdays } from './date';

const MailContent = (TodayMenu, TodaySchedule, MonthlyMenu): string => {
  let text = `[메뉴]\n${TodayMenu}\n\n[복지관 일정]\n${TodaySchedule}`;
  const Menu25: string | undefined = MonthlyMenu.find((e) => e.date === 25)
    ?.menu;

  const Menu24: string | undefined = MonthlyMenu.find((e) => e.date === 24)
    ?.menu;

  if (NumOfdays() === 25) {
    text = `1시간 일찍 퇴근하는 날~\n` + text;
  } else if (NumOfdays() === 24) {
    // 24일이 금요일 or 25일 평일 공휴일
    if (!Menu25) {
      text = `1시간 일찍 퇴근하는 날~\n` + text;
    }
  } else if (NumOfdays() === 23) {
    if (!Menu25 && !Menu24) {
      // 23일이 금요일 or 24, 25일 공휴일
      text = `1시간 일찍 퇴근하는 날~\n` + text;
    }
  }
  return text;
};

export default MailContent;
