"use client"

import React from 'react'
import styles from './Home.module.css'
import Image from 'next/image'
import bannerSpanish from './images/Black Purple Modern Website Design And Development Banner.svg'
import bannerEnglish from './images/Black Purple Modern Website Design And Development Banner (2).svg'
import bannerEnglishMobile from './images/Black Purple Modern Website Design And Development Banner mobileEn.svg'
import bannerSpanishMobile from './images/Black Purple Modern Website Design And Development Banner mobileEs.svg'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@mantine/hooks'

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
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, vel, inventore quasi ducimus sequi atque asperiores accusantium enim voluptatem, nihil temporibus maxime pariatur maiores laudantium odit corporis! Necessitatibus, nam mollitia. Soluta doloremque dolorum possimus? Autem qui vel ex quis laboriosam impedit blanditiis recusandae eos, illo incidunt, atque exercitationem iusto asperiores voluptatum corporis. Veritatis voluptatibus aspernatur at non cumque, blanditiis minus ut nisi, sunt libero, assumenda ipsa recusandae unde! Recusandae, optio quos? Perspiciatis sunt nulla, perferendis recusandae error maxime voluptatem ex harum quod? Ab repellat amet molestias obcaecati harum magni accusantium aperiam, modi corporis itaque, culpa in vero, nihil natus quae?</p>
      </div>
    </>
  )
}
