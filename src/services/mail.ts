import nodemailer from 'nodemailer';

import { TodayDate } from './date';

const mailSend = async (TodayMenu: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Woman" <${process.env.NODEMAILER_USER}>`,
    to: process.env.NODEMAILER_EMAIL,
    subject: `[오늘의 메뉴] ${TodayDate()}`,
    text: TodayMenu
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  return;
};

export default mailSend;
