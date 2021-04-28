import nodemailer from 'nodemailer';
import MailContent from './mail_content';
import { TodayDate } from './date';
import MailList from "../config/mail.json";

import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;
// https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a

/**
 * Error: Missing credentials for "PLAIN"
    at SMTPConnection._formatError (/home/kuna/dev/wooman/node_modules/nodemailer/lib/smtp-connection/index.js:774:19)
    at SMTPConnection.login (/home/kuna/dev/wooman/node_modules/nodemailer/lib/smtp-connection/index.js:438:38)
    at /home/kuna/dev/wooman/node_modules/nodemailer/lib/smtp-transport/index.js:271:32
    at SMTPConnection.<anonymous> (/home/kuna/dev/wooman/node_modules/nodemailer/lib/smtp-connection/index.js:209:17)
    at Object.onceWrapper (events.js:421:28)
    at SMTPConnection.emit (events.js:315:20)
    at SMTPConnection._actionEHLO (/home/kuna/dev/wooman/node_modules/nodemailer/lib/smtp-connection/index.js:1303:14)
    at SMTPConnection._processResponse (/home/kuna/dev/wooman/node_modules/nodemailer/lib/smtp-connection/index.js:932:20)
    at SMTPConnection._onData (/home/kuna/dev/wooman/node_modules/nodemailer/lib/smtp-connection/index.js:739:14)
    at TLSSocket.SMTPConnection._onSocketData (/home/kuna/dev/wooman/node_modules/nodemailer/lib/smtp-connection/index.js:189:44) {
  code: 'EAUTH',
  command: 'API'
}

망할놈의 에러로 인해,  아이디, 비밀번호로 접속하여 메일을 보내던 기존 방식에서, OAuth를 사용해서 메일을 보내는 방식으로 수정할 예정.
 */


// const List = MailList[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];

const List = MailList['development'];

type menu = {
  date: number;
  menu: string;
};

const mailSend = async (
  TodayMenu: string,
  TodaySchedule: string,
  MonthlyMenu: Array<menu>
): Promise<void> => {
  console.log('wow')

  // Token 발행

  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  console.log(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REFRESH_TOKEN
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });
  
  const accessToken: string = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log(err)
        reject("Failed to create access token :(");
      }
      resolve(token ? token : '');
    });
  });

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35847#issuecomment-512171642

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      pass: process.env.MAIL_PASSWORD
    }
  });

  // send mail with defined transport object
  // const info = async (MAIL_EMAIL: string) => {
  //   console.log(MAIL_EMAIL)
  //   transporter.sendMail({
  //     from: `"Woman" <${process.env.NODEMAILER_USER}>`,
  //     to: MAIL_EMAIL,
  //     subject: `[오늘의 메뉴 & 일정] ${TodayDate()}`,
  //     text: MailContent(TodayMenu, TodaySchedule, MonthlyMenu)
  //   }).then((info2) => {
  //     console.log('Message sent: %s', info2.messageId);
  //   }).catch(error => {
  //     console.log(error)
  //   });
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // }

  const info = async (MAIL_EMAIL: string) => {
    transporter.sendMail({
      from: `"Woman" <${process.env.NODEMAILER_USER}>`,
      to: 'jokuna@kakao.com',
      subject: `[오늘의 메뉴 & 일정]`,
      text: 'test'
    }).then((info2) => {
      console.log('Message sent: %s', info2.messageId);
    }).catch(error => {
      console.log(error)
    });
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

  info('');

  // List.map(async (ele) => {
  //   await info(ele.email)
  // });

};

export default mailSend;
