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
    case 1: // 월
      text = `2시 도시락 세팅!!!\n` + text;
      break;
    case 2: // 화
      text = `3시 대체식 세팅!\n` + text;
      break;
    // case 3: // 수
    //   text = `` + text;
    //   break;
    case 4: // 목
      text = `김치 배달 & 요리교실 업무지원 확인(10시30분~12시)!\n` + text;
      break;
    // case 5: // 금
    //   text = `` + text;
    //   break;
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
