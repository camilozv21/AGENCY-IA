import PricingIntro from '@/modules/company/About/Pricing'
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
      title: `ContiA Pricing ${locale === 'es' ? '' : locale}`,
      description: `ContiA Pricing. ${locale === 'es' ? '' : locale}`,
      alternates: {
          canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${(locale == 'es' ? '' : '/' + locale)}/about/pricing`,
      }
  }
}

export default function PricingPage() {
  return (
    <>
      <PricingIntro />
    </>
  )
}
