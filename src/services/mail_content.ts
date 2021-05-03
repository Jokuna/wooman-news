import { NumOfdays, TodayWeek } from './date';

type menu = {
  date: number;
  menu: string;
};

const MailContent = (
  TodayMenu: string,
  TodaySchedule: string,
  MonthlyMenu: Array<menu>
): string => {
  let text = `[메뉴]\n${TodayMenu}\n\n[복지관 일정]\n${TodaySchedule}`;
  const Menu25: string | undefined = MonthlyMenu.find((e) => e.date === 25)
    ?.menu;

  const Menu24: string | undefined = MonthlyMenu.find((e) => e.date === 24)
    ?.menu;

  const week = TodayWeek();
  const day = NumOfdays();

  // Special Day
  switch (day) {
    case 25:
      text = `1시간 일찍 퇴근\n\n` + text;
      break;
    case 24:
      if (!Menu25) {
        text = `1시간 일찍 퇴근\n\n` + text;
      }
      break;
    case 23:
      if (!Menu25 && !Menu24) {
        // 23일이 금요일 or 24, 25일 공휴일
        text = `1시간 일찍 퇴근\n\n` + text;
      }
      break;
  }

  // TodayList
  switch (week) {
    // case 1: // 월
    //   text = `[오늘의 할일]\n2시 도시락 세팅\n\n` + text;
    //   break;
    case 2: // 화
      text = `[오늘의 할일]\n3시 대체식 세팅\n\n` + text;
      break;
    // case 3: // 수
    //   text = `` + text;
    //   break;
    case 4: // 목
      text =
        `[오늘의 할일]\n김치 배달\n요리교실 업무지원 확인! (10시30분~12시)\n\n` +
        text;
      break;
    // case 5: // 금
    //   text = `` + text;
    //   break;
  }
  return text;
};

export default MailContent;
