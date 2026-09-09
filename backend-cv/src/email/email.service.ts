import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import emailNoreplyConfig from '../config/email.config';
import adminConfig from '../config/admin.cofing';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { errors } from 'src/errors/errors.config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { verifiedEmailPage, emailVerificatioMessage, newUserRegisteredEmail } from '../variables/email.variables';
import Auth from '../variables/auth.variables';

@Injectable()
export class EmailService {
  private transporter;

  constructor(
    @Inject(emailNoreplyConfig.KEY)
    private readonly emailConfig: ConfigType<typeof emailNoreplyConfig>,
    @Inject(adminConfig.KEY)
    private readonly adminEmailConfig: ConfigType<typeof adminConfig>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: Logger,
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

  async sendVerificationEmail(email: string, token: string, name: string) {
    const verificationUrl = `${this.emailConfig.backendUrl}/email/verify-email?token=${token}`;
    const mailOptions = {
      from: this.emailConfig.emailFrom,
      to: email,
      subject: 'Verify your email',
      html: emailVerificatioMessage(verificationUrl, name),
    }
    const adminUrl = `${this.adminEmailConfig.backendUrl}${Auth.userRegistration.pathToAdminPage}`;
    if (this.adminEmailConfig.adminEmail) {
      await this.sendEmail(
        this.adminEmailConfig.adminEmail,
        Auth.userRegistration.subject,
        newUserRegisteredEmail(email, adminUrl),
      );
    } else {
      this.logger.warn(
        'Admin email is not configured. Skipping sending new user registration email.',
      );
    }

    const info = await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        this.logger.error('Error sending email:', error);
        throw new BadRequestException('Failed to send verification email');
      } else {
        this.logger.log('Email sent successfully:', info);
      }
      return info;
    });
    return info;
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: this.emailConfig.emailFrom,
      to,
      subject,
      html,
    }
    console.log('Sending email to:', mailOptions);
    const info = await this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        this.logger.error('Error sending email:', error);
        throw new BadRequestException('Failed to send email');
      } else {
        this.logger.log('Email sent successfully:', info);
      }
    });
    return info;
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
      const frontendUrl = this.emailConfig.frontendUrl || 'http://localhost:3000';
      return verifiedEmailPage(frontendUrl);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('User'));
    }
  }

}
