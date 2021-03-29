import axios from 'axios';
import { load } from 'cheerio';


type menu = {
  date: number,
  menu: string
};

const crawler = async () => {
  const { data: menuHTML } = await axios.get('http://www.wooman.or.kr/community/?act=sub1_3');
  const $_menu = load(menuHTML);
    // const text = $_menu('table').text()
  const menuCrawled = $_menu('td > div.foods');
  const menuList : Array<menu>  = $_menu(menuCrawled)
  .map(
    (i, ele) => {
      // console.log(ele)
      // console.log(Number($_menu(ele).parent().find('span').html()?.trim()))
      // console.log($_menu(ele).html()?.replace(/<br>/g, "\n").replace(/&amp;/g, "&").trim())
      return {
        date: Number($_menu(ele).parent().find('span').html()?.trim()),
        menu: $_menu(ele).html()?.replace(/<br>/g, "\n").replace(/&amp;/g, "&").trim()
      }
    }
  )
  .get();
  return menuList;
}

export default crawler;
