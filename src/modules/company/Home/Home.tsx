"use client"

import React from 'react'
import styles from './Home.module.css'
import Image from 'next/image'
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
        src={
          isMobile 
            ? (i18n.language === 'en' 
                ? 'https://df50lbm4qcrt6.cloudfront.net/bannerEnglishMobile.svg' 
                : 'https://df50lbm4qcrt6.cloudfront.net/bannerSpanishMobile.svg')
            : (i18n.language === 'en' 
                ? 'https://df50lbm4qcrt6.cloudfront.net/bannerEnglish.svg' 
                : 'https://df50lbm4qcrt6.cloudfront.net/bannerSpanish.svg')
        } 
        alt="Logo" 
        width={isMobile ? 500 : 1000} 
        height={isMobile ? 100 : 712} 
        className={styles.logo}
        placeholder="blur"
        blurDataURL={
          isMobile 
            ? (i18n.language === 'en' 
                ? 'https://df50lbm4qcrt6.cloudfront.net/bannerEnglishMobile_pre.jpg' 
                : 'https://df50lbm4qcrt6.cloudfront.net/bannerSpanishMobile_pre.jpg')
            : (i18n.language === 'en' 
                ? 'https://df50lbm4qcrt6.cloudfront.net/bannerEnglish_pre.jpg' 
                : 'https://df50lbm4qcrt6.cloudfront.net/bannerSpanish_pre.jpg')
        }
      />
      </div>
      <CardsPlans />
    </>
  )
}
