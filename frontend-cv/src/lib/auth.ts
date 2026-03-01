'use server'

import { cookies } from 'next/headers';

export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value || null;
}

export async function setAccessToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 15, // 15 minutes
    });
}

export async function clearTokens() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
}
