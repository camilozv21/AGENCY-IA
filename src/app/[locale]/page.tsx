import { CardsPlans } from '@/modules/company/Home/CardsPlans';
import { FAQHomepage } from '@/modules/company/Home/FAQHomepage';
import { ImagesCarousel } from '@/modules/company/Home/ImagesCarousel'
import ServiceDescription from '@/modules/company/Home/ServiceDescription';
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
      title: `ContiA ${locale === 'es' ? '' : locale}`,
      description: `ContiA transforma la presencia digital de pequeñas empresas con contenido semanal personalizado generado por IA. Descubre posts, videos cortos y newsletters escalables para restaurantes, tiendas locales y freelancers. Aprovecha la última tecnología para automatizar y potenciar tu negocio. ${locale === 'es' ? '' : locale}`,
      alternates: {
          canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${(locale == 'es' ? '' : '/' + locale)}`,
      }
  }
}

export default function HomePage() {
  return (
    <>
      <ImagesCarousel />
      <div style={{ background: '#040507' }}>
        <ServiceDescription />
        <CardsPlans />
        <FAQHomepage />
      </div>
    </>
  )
}
