"use client"

import React from 'react'
import styles from './Home.module.css'
import Image from 'next/image'
import bannerSpanish from './images/bannerSpanish.svg'
import bannerEnglish from './images/bannerEnglish.svg'
import bannerEnglishMobile from './images/bannerEnglishMobile.svg'
import bannerSpanishMobile from './images/bannerSpanishMobile.svg'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@mantine/hooks'
import { CardsPlans } from './CardsPlans'

export default function Home() {
  const { i18n } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <div className={styles.container}>
        <Image 
          priority={true} 
          src={isMobile ? (i18n.language === 'en' ? bannerEnglishMobile : bannerSpanishMobile) : (i18n.language === 'en' ? bannerEnglish : bannerSpanish)} 
          alt="Logo" width={isMobile ? 500 : 1000} height={isMobile ? 100 : 200} 
          className={styles.logo} 
        />
      </div>
      <CardsPlans />
    </>
  )
}
