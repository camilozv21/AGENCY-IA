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
  const namespaces = ["common"];

  const { resources } = await initTranslations(locale, namespaces);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={manrope.variable}>
        <MantineProvider defaultColorScheme="dark">
        <Notifications />
          <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
            <HeaderMenu />
            <main>{children}</main>
            <Footer />
          </TranslationsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}