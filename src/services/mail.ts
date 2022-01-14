import nodemailer from 'nodemailer';
import MailContent from './mail_content';
import { TodayDate, TodaySpecDate } from './date';
import MailJSON from '../config/mail.json';

import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

// Reference: https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a

/**
 *  Error: Missing credentials for "PLAIN"
      ... {
      code: 'EAUTH',
      command: 'API'
    }
    
    아이디, 비밀번호로 접속하여 메일을 보내던 기존 방식에서, OAuth를 사용해서 메일을 보내는 방식으로 수정.
 */

const MailList =
  MailJSON[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];

type menu = {
  date: number;
  menu: string;
};

const mailSend = async (
  TodayMenu: string,
  TodaySchedule: string,
  MonthlyMenu: Array<menu>
): Promise<void> => {
  // OAuth token 생성
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken: string = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token :(');
      }
      resolve(token ? token : 'Failed to create access token :(');
    });
  });

  // E-Mail 전송
  // Reference: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35847#issuecomment-512171642

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USER,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  const info = async (TARGET_EMAIL: string): Promise<void> => {
    const { messageId } = await transporter.sendMail({
      from: `"Wooman" <${process.env.NODEMAILER_USER}>`,
      to: TARGET_EMAIL,
      subject: `[오늘의 메뉴 & 일정] ${TodayDate()}`,
      text: MailContent(TodayMenu, TodaySchedule, MonthlyMenu)
    });
    console.log(`Message sent: ${messageId}`);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  };

  MailList.map(async (ele) => {
    await info(ele.email).catch((err) => {
      console.log(TodaySpecDate(), err, '30초 후에 재전송');
      setTimeout(function () {
        info(ele.email).catch((err) => {
          console.log(TodaySpecDate(), err, '실패');
        });
      }, 30 * 1000); // 30초 재 실행
    });
  });
};

export default mailSend;
