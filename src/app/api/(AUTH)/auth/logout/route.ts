import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function POST() {
  await deleteSession()

  return new NextResponse(
    JSON.stringify({ message: 'Sesión cerrada correctamente' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': 'session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure',
      },
    }
  )
}
