'use server'

import { cookies } from 'next/headers';



export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get('access_token')?.value || null;
}

export async function setAccessToken(token: string) {
    'use server'
    const cookieStore = await cookies();
    cookieStore.set('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 15, // 15 minutes
    });
}

export async function setRefreshToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('refresh_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 20 hours
    });
}

export async function getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get('refresh_token')?.value || null;
}

export async function clearTokens() {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
}
