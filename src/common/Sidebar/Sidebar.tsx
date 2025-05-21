"use client";

import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import {
  Icon2fa,
  IconDatabaseImport,
  IconFingerprint,
  IconHome,
  IconKey,
  IconPhoto,
  IconSettings,
} from '@tabler/icons-react';
import { Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './Sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navData = [
  { link: '/dashboard', label: 'Home', icon: IconHome },
  { link: '/dashboard/tool/text-to-image', label: 'Crear Post', icon: IconPhoto },
  { link: '/dashboard/', label: 'Security', icon: IconFingerprint },
  { link: '/dashboard/', label: 'SSH Keys', icon: IconKey },
  { link: '/dashboard/', label: 'Databases', icon: IconDatabaseImport },
  { link: '/dashboard/', label: 'Authentication', icon: Icon2fa },
  { link: '/dashboard/', label: 'Other Settings', icon: IconSettings },
];

interface NavbarLinkProps {
  icon: typeof IconHome;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function Sidebar() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [active, setActive] = useState(0);
  const pathname = usePathname();

  if (pathname.includes('/dashboard/tool/text-to-image')) return null;

  const links = navData.map((item, index) => {
    if (isMobile) {
      // Render minimal links for mobile
      return (
        <Link key={item.label} href={item.link}>
          <NavbarLink
            icon={item.icon}
            label={item.label}
            active={index === active}
            onClick={() => setActive(index)}
          />
        </Link>
      );
    }

    // Render full links for desktop
    return (
      <Link
        key={item.label}
        href={item.link}
        className={classes.link}
        data-active={index === active || undefined}
        onClick={() => setActive(index)}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}