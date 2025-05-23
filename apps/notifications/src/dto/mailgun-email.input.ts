import { IsEmail, IsEnum, IsObject, IsString } from 'class-validator';
import { EmailType } from '@app/common';

// enum EmailType {
//   NODEMAILER = 0,
//   MAILGUN = 1,
//   UNRECOGNIZED = -1,
// }

export class MailgunEmailInput {
  @IsString()
  subject: string;

  @IsObject()
  data: object;

  @IsString()
  activationCode: string;

  @IsString()
  templatePath: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsEnum(EmailType, {
    message:
      'emailType must be a valid EmailType value (NODEMAILER or MAILGUN)',
  })
  emailType: EmailType;
}
