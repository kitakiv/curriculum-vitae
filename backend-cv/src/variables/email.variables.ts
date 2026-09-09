export const verifiedEmailPage = (url: string) => {
  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="3;url=${url}/login">
            <title>Email Verified</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              h1 { color: #4CAF50; }
              p { font-size: 18px; color: #666; }
              a { color: #4CAF50; text-decoration: none; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>✓ Email Verified Successfully!</h1>
            <p>Your email has been verified. You can now login.</p>
            <p>Redirecting to login page in 3 seconds...</p>
            <p>If not redirected, <a href="${url}/login">click here</a></p>
          </body>
        </html>
      `
}

export const emailVerificatioMessage = (url: string, name: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Welcome!</h1>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Hello ${name},</h2>
                    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                      Thank you for signing up! We're excited to have you on board. To get started, please verify your email address by clicking the button below.
                    </p>
                    <!-- Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="${url}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">Verify Email Address</a>
                        </td>
                      </tr>
                    </table>
                    <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; text-align: center;">
                      Or copy and paste this link in your browser:<br>
                      <a href="${url}" style="color: #667eea; word-break: break-all;">${url}</a>
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="color: #999999; font-size: 13px; margin: 0 0 10px 0;">
                      This verification link will expire in <strong>1 hour</strong>.
                    </p>
                    <p style="color: #999999; font-size: 13px; margin: 0;">
                      If you didn't create an account, please ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
              <!-- Footer Text -->
              <table width="600" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                <tr>
                  <td style="text-align: center; padding: 20px;">
                    <p style="color: #999999; font-size: 12px; margin: 0;">
                      © 2024 Your Company. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}


export const newUserRegisteredEmail = (
  userEmail: string,
  adminUrl: string,
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>New User Registered</title>

        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
            background: #f5f7fa;
            font-family: Arial, sans-serif;
            color: #333;
          }

          .wrapper {
            width: 100%;
            padding: 50px 20px;
          }

          .container {
            max-width: 550px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }

          .icon {
            width: 65px;
            height: 65px;
            margin: 0 auto 20px;
            border-radius: 50%;
            background: #eef2ff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
          }

          h1 {
            margin: 0 0 15px;
            text-align: center;
            font-size: 26px;
            color: #222;
          }

          .description {
            text-align: center;
            font-size: 16px;
            line-height: 1.6;
            color: #666;
          }

          .user-info {
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fb;
            border-radius: 10px;
          }

          .label {
            margin-bottom: 6px;
            font-size: 13px;
            color: #888;
          }

          .email {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            word-break: break-word;
          }

          .button-container {
            text-align: center;
            margin-top: 30px;
          }

          .button {
            display: inline-block;
            padding: 13px 25px;
            background: #4caf50;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
          }

          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 13px;
            color: #999;
          }
        </style>
      </head>

      <body>
        <div class="wrapper">
          <div class="container">

            <div class="icon">
              👤
            </div>

            <h1>New User Registered</h1>

            <p class="description">
              A new user has successfully registered on your website.
            </p>

            <div class="user-info">
              <div class="label">
                User email
              </div>

              <div class="email">
                ${userEmail}
              </div>
            </div>

            <div class="button-container">
              <a
                href="${adminUrl}"
                class="button"
              >
                Open Admin Panel
              </a>
            </div>

            <p class="footer">
              This is an automatic notification from your website.
            </p>

          </div>
        </div>
      </body>
    </html>
  `;
};



export const resetPasswordPage = (resetLink: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #f9f9f9;
            color: #333;
          }

          .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 40px;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          }

          h1 {
            color: #4CAF50;
          }

          p {
            font-size: 16px;
            color: #666;
            line-height: 1.6;
          }

          .button {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 25px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          }

          .link {
            word-break: break-all;
            font-size: 13px;
            color: #888;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>Reset Your Password</h1>

          <p>
            We received a request to reset your password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <a href="${resetLink}" class="button">
            Reset Password
          </a>

          <p>
            This link will expire soon for security reasons.
          </p>

          <p>
            If you didn't request a password reset, you can safely ignore this email.
          </p>

          <p>
            If the button doesn't work, copy and open this link:
          </p>

          <p class="link">
            <a href="${resetLink}">${resetLink}</a>
          </p>
        </div>
      </body>
    </html>
  `;
};





