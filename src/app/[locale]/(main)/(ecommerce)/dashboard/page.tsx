import { auth } from '@/auth'
import DashboardHome from '@/modules/ecommerce/DashboardHome/DashboardHome'
import React from 'react'

export default async function DashboardPage() {
  const session = await auth()
  const user = session?.user;

  return (
    <>
      <DashboardHome user={user ? { email: user.email ?? '', name: user.name ?? '', image: user.image ?? '' } : undefined} />
    </>
  )
}
