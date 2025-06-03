import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

interface SessionPayload extends JwtPayload {
  name: string;
  email: string;
  image: string
}
 
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session', error)
  }
}

export async function createSession({ name, email, image }: { name: string; email: string; image: string }) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ name, email, image, expiresAt })
  return session
}

export async function getSession(request: NextRequest) {
  const cookie = request.cookies.get('authjs.session-token')?.value;
  if (!cookie) return null
  
  const session = await decrypt(cookie) as SessionPayload
  if (!session?.id) return null

  return { isAuth: true, userId: session.id, role: session.role, email: session.email }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('authjs.session-token')
}