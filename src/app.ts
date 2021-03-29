require('dotenv').config()

const axios = require('axios');
// const cheerio = require('cheerio');

import { load } from 'cheerio';

const nodemailer = require('nodemailer');

type menuJSON = { // 초기 형태 선언
  index: {
    date: number,
    menu: string
  }
};

const main = async () => {
  const { data: menuHTML } = await axios.get('http://www.wooman.or.kr/community/?act=sub1_3');
  // console.log(menuHTML, typeof(menuHTML))
  const $_menu = load(menuHTML);
  // const text = $_menu('table').text()

  const menuCrawled = $_menu('td > div.foods');
  // console.log(menuCrawled)
  const menuText : Array<menuJSON>  = $_menu(menuCrawled)
  .map(
    (i, ele) => {
      return {
        date: i,
        menu: $_menu(ele).html()?.replace(/<br>/g, "\n").replace(/&amp;/g, "&").trim()
      };
    }
  )
  .get();

  console.log(menuText)

  // const text = $_menu('table').find('td').each((index: number, element: object) => {
  //   let OneDaymenu = '';
  //   // const { children } = element; // error Property 'children' does not exist on type '{}'.
  //   // const children: [
  //   //   element: {
  //   //   type: string,
  //   //   name: 
  //   //   }
  //   // ] = element.children;
  //   const children:object = element.children;
  //   children.forEach((element) => {
  //     if (element.type === 'tag' && element.name === 'div') {
  //       for (let e of element.children) {
  //         if (!!e.data && e.type === 'text') {
  //           OneDaymenu += (e.data.trim() + ' ');
  //         }
  //       }
  //     }
  //   })
  //   menuJSON[index] = {
  //     date: index,
  //     menu: OneDaymenu.trim().replace(/ /g, "\n")
  //   }
  // })
  
  // const text = $_menu('table').find('td').each((index: number, element: object) => {
  //   let OneDaymenu = '';
  //   // const { children } = element; // error Property 'children' does not exist on type '{}'.
  //   // const children: [
  //   //   element: {
  //   //   type: string,
  //   //   name: 
  //   //   }
  //   // ] = element.children;
  //   const children:object = element.children;
  //   children.forEach((element) => {
  //     if (element.type === 'tag' && element.name === 'div') {
  //       for (let e of element.children) {
  //         if (!!e.data && e.type === 'text') {
  //           OneDaymenu += (e.data.trim() + ' ');
  //         }
  //       }
  //     }
  //   })
  //   menuJSON[index] = {
  //     date: index,
  //     menu: OneDaymenu.trim().replace(/ /g, "\n")
  //   }
  // })
  // console.log(text)
  // console.log(typeof($_menu('table').find('td')))
  // console.log(menuJSON)
  // console.log(menuJSON[29])
  
  // const mailSend = async () => {
  //   let transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     host: 'smtp.gmail.com',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: process.env.NODEMAILER_USER,
  //       pass: process.env.NODEMAILER_PASS,
  //     },
  //   });

  //   // send mail with defined transport object
  //   let info = await transporter.sendMail({
  //     from: `"Woman" <${process.env.NODEMAILER_USER}>`,
  //     to: 'jokuna@kakao.com',
  //     subject: `[오늘의 메뉴] 2021 03 29`,
  //     text: menuJSON[29].menu
  //   });

  //   console.log('Message sent: %s', info.messageId);
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  //};

  // await mailSend().catch(console.error);
}

main();
