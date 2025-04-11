import Image from 'next/image'
import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link href="/" className={styles.logo}>
          <picture className={styles.pictureContainer}>
            <source
              media="(min-width: 600px)"
              srcSet="https://i.imgur.com/Sifv7bZ.png"
            />
              <Image
                src="https://i.imgur.com/Sifv7bZ.png"
                alt="carson logo"
                className={styles.logoImage}
                width={97} 
                height={32} 
                priority
              />
          </picture>
          </Link>
        </h1>
        <nav>
          <section>
            <ul className={styles.navList}>
              <li><Link href="/plans" className={styles.navLink}>PLANES</Link></li>
              <li><Link href="/demo" className={styles.navLink}>DEMO</Link></li>
              <li><Link href="/contact" className={styles.navLink}>CONTACTO</Link></li>
            </ul>
          </section>
        </nav>
      </header>
    </>
  )
}
