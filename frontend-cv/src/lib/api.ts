
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const QueryUrl = {
    login: `${backendUrl}/api/login`,
    register: `${backendUrl}/api/register`,
    profile: `${backendUrl}/api/profile`,
}

export default QueryUrl