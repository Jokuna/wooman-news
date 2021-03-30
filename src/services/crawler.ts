import axios from 'axios';
import { load } from 'cheerio';

type menu = {
  date: number;
  menu: string;
};

const crawler = async (url: string): Promise<Array<menu>> => {
  const { data: menuHTML } = await axios.get(url);
  const $_menu = load(menuHTML);
  // const text = $_menu('table').text()
  const menuCrawled = $_menu('td > div.foods');
  const menuList: Array<menu> = $_menu(menuCrawled)
    .map((i, ele) => {
      return {
        date: Number($_menu(ele).parent().find('span').html()?.trim()),
        menu: $_menu(ele)
          .html()
          ?.replace(/<br>/g, '\n')
          .replace(/&amp;/g, '&')
          .trim()
      };
    })
    .get();
  return menuList;
};

const crawlerPlan = async (url: string): Promise<Array<menu>> => {
  const { data: menuHTML } = await axios.get(url);
  const $_menu = load(menuHTML);
  // const text = $_menu('table').text()
  const menuCrawled = $_menu('td > div.title');
  let menuList: Array<menu> = $_menu(menuCrawled)
    .map((i, ele) => {
      return {
        date: Number($_menu(ele).parent().find('span').html()?.trim()),
        menu: $_menu(ele).text().trim()
      };
    })
    .get();

  menuList = menuList.reduce((r: Array<menu>, e: menu) => {
    if (!r.find((element: { date: number }) => element.date === e.date)) {
      r.push(e);
    } else {
      const index = r.findIndex((element) => element.date === e.date);
      r[index].menu = r[index].menu.concat('\n', e.menu).trim();
    }
    return r;
  }, []);
  return menuList;
};

// export default crawler;

export { crawler, crawlerPlan };
