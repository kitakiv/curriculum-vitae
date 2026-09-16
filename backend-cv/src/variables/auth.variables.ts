const auth = {
    signup: {
        success: true,
        message: 'User created successfully. Please check your email to verify your account. Check your spam folder if you do not see the email in your inbox.',
    },
    userRegistration: {
       subject: 'New User Registration',
       pathToAdminPage: '/admin/dashboard/'
    },
    forgotPassword: {
        message: 'If an account exists for this email address, you will receive a password reset link at your email address.',
        subject: 'Password Reset Request'
    }
}

export default auth;