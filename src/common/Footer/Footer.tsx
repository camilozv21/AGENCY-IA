'use client'

import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import classes from './Footer.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const data = [
    {
      title: 'About',
      links: [
        { target: '_self', label: 'Features', link: `${i18n.language === 'es' ? '/about/features' : '/en/about/features'}` },
        { target: '_self', label: 'Pricing', link: `${i18n.language === 'es' ? '/about/pricing' : '/en/about/pricing'}` },
        { target: '_self', label: 'Support', link: `${i18n.language === 'es' ? '/about/support' : '/en/about/support'}` },
        // { label: 'Forums', link: '#' },
      ],
    },
    {
      title: 'Project',
      links: [
        // { label: 'Contribute', link: `${i18n.language === 'es' ? '/project/contribute' : '/en/project/contribute'}` },
        // { label: 'Media assets', link: '#' },
        { target: '_self', label: 'Changelog', link: `${i18n.language === 'es' ? '/project/changelog' : '/en/project/changelog'}` },
        // { label: 'Releases', link: '#' },
      ],
    },
    {
      title: 'Community',
      links: [
        { target: '_blank', label: 'Join Discord', link: 'https://discord.gg/mF3vV2zj' },
        { target: '_blank', label: 'Follow on Instagram', link: 'https://www.instagram.com/contia.io/?hl=en' },
        // { target: '_blank', label: 'GitHub discussions', link: 'https://github.com/your-repo/discussions' },
      ],
    },
  ];

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        target={link.target || '_self'}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
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
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2025 ContiA. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          {/* <Text size="sm" mr={20} fw={700}> */}
            <a href="/privacy-policy" target="_blank" className={classes.link}>
              Privacy Policy
            </a>
          {/* </Text> */}
          {/* <Text size="sm" mr={20} fw={700}> */}
            <a href="/terms-of-service" target="_blank" className={classes.link}>
              Terms of Service
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