import PrivacyPolicy from '@/modules/company/PrivacyPolicy/PrivacyPolicy'
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
      title: `ContiA Privacy Policy ${locale === 'es' ? '' : locale}`,
      description: `ContiA Privacy Policy. ${locale === 'es' ? '' : locale}`,
      alternates: {
          canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${(locale == 'es' ? '' : '/' + locale)}/privacy-policy`,
      }
  }
}

export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicy />
  )
}
