'use server'
import { LoginInput, SignUpInput } from "@/gql/graphql"
import { loginUser, signUpUser } from "@/query/auth.query";

export type LoginFormState = {
    message?: string;
    errors?: {
        [K in keyof LoginInput]?: string[];
    };
    success?: boolean;
};

export type SignupFormState = {
    message?: string;
    errors?: {
        [K in keyof SignUpInput]?: string[];
    };
    success?: boolean;
};

export async function signup(prevState: SignupFormState | undefined, formData: FormData): Promise<SignupFormState> {
    const name = formData.get('name') as string;
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    try {
        const result = await signUpUser({
            signUpInput: {
                login,
                name,
                password
            }
        });
        
        return {
            success: true,
            message: 'Signup successful!'
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Signup failed'
        };
    }
}

export async function login(prevState: LoginFormState | undefined, formData: FormData): Promise<LoginFormState> {
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    try {
       const result = await loginUser({
            loginInput: {
                login,
                password
            }
        });
        
        
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
