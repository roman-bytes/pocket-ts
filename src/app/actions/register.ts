'use server';

import { redirect } from 'next/navigation'

export async function registerUser(formData: FormData) {
  const username = formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')
  const firstName = formData.get('first_name')
  const lastName = formData.get('last_name')


  if (!username || !email || !password) {
    return { error: 'All fields are required' }
  }

  const user = await fetch(`http://localhost:8080/users`, {
    method: "POST",
    body: JSON.stringify({
      "username": username,
      "password": password,
      "full_name": firstName + ' ' + lastName,
      "email": email,
    })
  }).then(res => res.json());


  if (!user) {
    console.error('User was not created.');
    return { error: 'Something went wrong creating the user. Please try again.' }
  }
  console.log('User', user)

    redirect('/login?registered=true')
}
