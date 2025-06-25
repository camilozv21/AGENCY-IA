import { Changelog } from '@/modules/company/Project/ChangeLog'
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
      title: `ContiA Changelog ${locale === 'es' ? '' : locale}`,
      description: `ContiA Changelog. ${locale === 'es' ? '' : locale}`,
      alternates: {
          canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${(locale == 'es' ? '' : '/' + locale)}/project/changelog`,
      }
  }
}

export default function ChangeLogPage() {
  return (
    <>
      <Changelog />
    </>
  )
}
