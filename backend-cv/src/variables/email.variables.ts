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