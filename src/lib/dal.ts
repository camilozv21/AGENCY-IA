import 'server-only'
 
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { decrypt } from './session'
import { cookies } from 'next/headers'
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  if (!cookie) return null;

  const session = await decrypt(cookie);
  if (!session) {
    redirect('/auth/login')
  }
  return session
})
