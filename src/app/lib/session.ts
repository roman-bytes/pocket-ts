import 'server-only'
import { cookies } from 'next/headers'

export async function createSession(session: any) {
    console.log('session', session);

    cookies().set('session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
}
