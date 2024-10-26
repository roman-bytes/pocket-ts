'use server'

import { redirect } from 'next/navigation'
import { createSession } from '@/app/lib/session'

export async function loginUser(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  if (!username || !password) {
    return { error: 'All fields are required' }
  }

  const user = await fetch(`http://localhost:8080/users/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json())

  if (!user) {
    console.error('User was not found.')
    return { error: 'User not found' }
  }
  await createSession(user);

  redirect('/dashboard')
}
