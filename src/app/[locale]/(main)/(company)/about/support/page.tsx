import { auth } from '@/auth';
import Support from '@/modules/company/About/Support/Support'
import { Metadata } from 'next';
import React from 'react'

interface PageProps {
  params: Promise<{
      locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
      title: `ContiA Support ${locale === 'es' ? '' : locale}`,
      description: `ContiA Support. ${locale === 'es' ? '' : locale}`,
      alternates: {
          canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${(locale == 'es' ? '' : '/' + locale)}/about/support`,
      }
  }
}

export default async function SupportPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <Support user={user ? { email: user.email ?? '', name: user.name ?? '', image: user.image ?? '' } : undefined} />
    </>
  )
}
