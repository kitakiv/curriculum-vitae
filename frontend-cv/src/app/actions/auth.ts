'use server'

export type FormState = {
    message?: string;
    errors?: {
        login?: string[];
        name?: string[];
        password?: string[];
    };
    success?: boolean;
};

export async function signup(prevState: FormState | undefined, formData: FormData): Promise<FormState> {
    const login = formData.get('login') as string;
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;

    try {
        // Call your GraphQL signup mutation
        // Backend will set cookies via Set-Cookie header
        // const result = await apiClient.fetchGraphQL(SIGNUP_MUTATION, {
        //     variables: { signUpInput: { login, name, password } }
        // });

        return {
            success: true,
            message: 'Signup successful!'
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Signup failed'
        };
    }
}

export async function login(prevState: FormState | undefined, formData: FormData): Promise<FormState> {
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    try {
        // Call your GraphQL login mutation
        // Backend will set cookies via Set-Cookie header
        // const result = await apiClient.fetchGraphQL(LOGIN_MUTATION, {
        //     variables: { loginInput: { login, password } }
        // });

        return {
            success: true,
            message: 'Login successful!'
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Login failed'
        };
    }
}