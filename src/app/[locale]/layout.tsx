import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dropzone/styles.css';
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { i18nConfig } from "@/i18nConfig";
import { notFound } from "next/navigation";
import initTranslations from "../i18n";
import { ReactNode } from "react";
import { dir } from "i18next";
import TranslationsProvider from "./TranslationsProvider";
import { Footer } from "@/common/Footer/Footer";
import { HeaderMenu } from "@/common/Header/HeaderMenu";
import icon from "../favicon.ico";
import StoreProvider from "./StoreProvider";
import { auth } from "@/auth";
import SetupData from "@/common/SetupData/SetupData";
import ActivatePasswordAlert from "@/common/ActivatePasswordAlert/ActivatePasswordAlert";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "700"] 
});

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'ContiA',
    description: 'Create your AI content for your brand.',
    icons: {
      icon: icon.src,
    },
  }
};

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }
  
  const namespaces = ["common", "about", "privacypolicy", "home", "dashboard"];

  const { resources } = await initTranslations(locale, namespaces);

  const session = await auth();
  const user = session?.user;

  return (
    <html lang={locale} dir={dir(locale)}>
      <StoreProvider>
        <body className={manrope.variable}>
          <MantineProvider defaultColorScheme="dark">
            <Notifications />
            <SetupData user={user ? { email: user.email ?? '', name: user.name ?? '', image: user.image ?? '' } : undefined} />
            <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
              <HeaderMenu user={user ? { email: user.email ?? '', name: user.name ?? '', image: user.image ?? '' } : undefined} />
              <ActivatePasswordAlert user={user ? { email: user.email ?? '', name: user.name ?? '', image: user.image ?? '' } : undefined} />
              <main style={{height: '100%', width: '100%'}}>{children}</main>
              <Footer />
            </TranslationsProvider>
          </MantineProvider>
        </body>
      </StoreProvider>
    </html>
  );
}