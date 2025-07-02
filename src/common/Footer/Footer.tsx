'use client'

import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import classes from './Footer.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getFooterData } from '@/utils/footer';

export function Footer() {
  const pathname = usePathname();
  const { i18n, t } = useTranslation('common');
  const data = getFooterData(i18n.language);

  const groups = data.map((group, idx) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        target={link.target || '_self'}
      >
        {t(`footer.navigation.${idx}.links.${index}.label`)}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{t(`footer.navigation.${idx}.title`)}</Text>
        {links}
      </div>
    );
  });

  if (pathname.includes('dashboard/tool/text-to-image')) return null;
  if (pathname.includes('dashboard/tool/text-to-video')) return null;

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
        <picture>
          <source
            media="(min-width: 600px)"
            srcSet="https://df50lbm4qcrt6.cloudfront.net/logonobg.png"
          />
            <Image
              src="https://df50lbm4qcrt6.cloudfront.net/logonobg.png"
              alt="carson logo"
              width={97} 
              height={32} 
              priority
            />
          </picture>
          <Text size="xs" c="dimmed" className={classes.description}>
            {t('footer.description')}
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2025 ContiA. {t('footer.derechos')}
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          {/* <Text size="sm" mr={20} fw={700}> */}
            <a href="/privacy-policy" target="_blank" className={classes.link}>
              {t('footer.privacy')}
            </a>
          {/* </Text> */}
          {/* <Text size="sm" mr={20} fw={700}> */}
            <a href="/terms-of-service" target="_blank" className={classes.link}>
              {t('footer.terms')}
            </a>
          {/* </Text> */}
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}