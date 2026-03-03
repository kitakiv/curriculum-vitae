import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import emailNoreplyConfig from '../config/email.config'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { errors } from 'src/errors/errors.config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private transporter;

  constructor(
    @Inject(emailNoreplyConfig.KEY)
    private emailConfig: ConfigType<typeof emailNoreplyConfig>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private logger: Logger = new Logger(EmailService.name)
  ) {
    const transportOptions: SMTPTransport.Options = {
      host: this.emailConfig.emailHost,
      port: this.emailConfig.emailPort,
      secure: false,
      auth: {
        user: this.emailConfig.emailUser,
        pass: this.emailConfig.emailPass
      },
    };
    this.transporter = nodemailer.createTransport(transportOptions);
  }

  async sendVerificationEmail(email: string, token: string) {
    try {
      this.logger.log(`Sending verification email to: ${email}`);
      this.logger.log(`Verification token: ${token}`);

      const verificationUrl = `${this.emailConfig.backendUrl}/email/verify-email?token=${token}`;

      this.logger.log(`Verification URL: ${verificationUrl}`);

      const info = await this.transporter.sendMail({
        from: this.emailConfig.emailFrom,
        to: email,
        subject: 'Verify your email',
        html: `
        <h1>Email Verification</h1>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationUrl}">Verify Email</a>
      `,
      });

      this.logger.log(`Email sent successfully: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error('Failed to send email:', error);
      throw new BadRequestException('Failed to send verification email');
    }
  }


  async verifyEmail(token: string) {
    const user = await this.userRepository.findOne({
      where: { verificationToken: token }
    });

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }
    user.isEmailVerified = true;
    user.verificationToken = null;
    try {
      await this.userRepository.save(user);
      return { message: 'Email verified successfully. You can now login.' };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('User'));
    }
  }

}
