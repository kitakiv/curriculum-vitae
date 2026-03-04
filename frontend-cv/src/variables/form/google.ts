export const getGoogleLink = () => {
    return `${process.env.BACKEND_URL}/google/login`;
};

const googleVariables = {
    googleLink: getGoogleLink,
    googleSvg: '',
    googleSignUpText: '',
    googleLoginText: '',
}

export default googleVariables