'use server'

import { cookies } from 'next/headers';

export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value || null;
}

export async function clearTokens() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
}
