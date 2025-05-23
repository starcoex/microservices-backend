import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as ejs from 'ejs';
import { MailgunMessageData, MailgunService } from 'nestjs-mailgun';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { MailgunEmailInput } from './dto/mailgun-email.input';
import { SentMessageInfo } from 'nodemailer';
import { EmailType, NotifyEmailMessage } from '@app/common';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly mailgunService: MailgunService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendWithMailgun({
    email,
    subject,
    templatePath,
    data,
    activationCode,
    name,
  }: MailgunEmailInput) {
    const file = await fs.readFile(templatePath, 'utf8');
    const html = ejs.render(file, { email, name, activationCode, ...data });

    try {
      const emailData: MailgunMessageData = {
        from: this.configService.getOrThrow('MAILGUN_FROM'),
        to: email,
        name,
        subject,
        html,
        activationCode,
      };
      return await this.mailgunService.createEmail(
        this.configService.getOrThrow('MAILGUN_DOMAIN'),
        emailData,
      );
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendWithNodemailer({
    email,
    subject,
    templatePath,
    data,
    activationCode,
    name,
  }: SentMessageInfo) {
    try {
      await this.mailerService.sendMail({
        to: email, // 수신자 이메일
        subject: subject, // 이메일 제목
        template: templatePath,
        // template: 'welcome', // 템플릿 파일 이름 (확장자 .ems는 생략)
        context: {
          // EJS 템플릿에 전달할 데이터
          name,
          activationCode,
          ...data,
        },
      });
      console.log('Email sent successfully to', email);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }

  async notifyEmail({
    email,
    subject,
    templatePath,
    data,
    activationCode,
    name,
    emailType,
  }: NotifyEmailMessage) {
    if (emailType === EmailType.MAILGUN) {
      await this.sendWithMailgun({
        email,
        subject,
        templatePath,
        data,
        activationCode,
        name,
        emailType,
      });
    } else {
      await this.sendWithNodemailer({
        email,
        subject,
        templatePath,
        data,
        activationCode,
        name,
      });
    }
  }
}
