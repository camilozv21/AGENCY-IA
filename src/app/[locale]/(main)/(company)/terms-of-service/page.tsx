import TermsOfService from '@/modules/company/TermsOfService/TermsOfService'
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
      title: `ContiA Terms Of Service ${locale === 'es' ? '' : locale}`,
      description: `ContiA Terms Of Service. ${locale === 'es' ? '' : locale}`,
      alternates: {
          canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${(locale == 'es' ? '' : '/' + locale)}/terms-of-service`,
      }
  }
}

export default function TermsOfServicePage() {
  return (
    <TermsOfService />
  )
}
