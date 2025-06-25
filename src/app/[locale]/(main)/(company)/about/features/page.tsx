import Features from '@/modules/company/About/Features'
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
      title: `ContiA Features ${locale === 'es' ? '' : locale}`,
      description: `ContiA Features. ${locale === 'es' ? '' : locale}`,
      alternates: {
          canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${(locale == 'es' ? '' : '/' + locale)}/about/features`,
      }
  }
}

export default function FeaturesPage() {
  return (
    <>
      <Features />
    </>
  )
}
