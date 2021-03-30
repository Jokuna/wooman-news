import nodemailer from 'nodemailer';

import { TodayDate } from './date';

const mailSend = async (
  TodayMenu: string,
  TodaySchedule: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Woman" <${process.env.NODEMAILER_USER}>`,
    to: process.env.MAIL_EMAIL,
    subject: `[오늘의 메뉴 & 일정] ${TodayDate()}`,
    text: `[메뉴]\n${TodayMenu}\n\n[복지관 일정]\n${TodaySchedule}`
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  return;
};

export default mailSend;
