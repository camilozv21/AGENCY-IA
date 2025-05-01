"use client";

import { useState } from 'react';
import {
  Icon2fa,
  IconDatabaseImport,
  IconFingerprint,
  IconHome,
  IconKey,
  IconLogout,
  IconPhoto,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './Sidebar.module.css';
import Link from 'next/link';

const data = [
  { link: '/dashboard', label: 'Home', icon: IconHome },
  { link: '/dashboard/tool/text-to-image', label: 'Texto a Imagen', icon: IconPhoto },
  { link: '/dashboard/', label: 'Security', icon: IconFingerprint },
  { link: '/dashboard/', label: 'SSH Keys', icon: IconKey },
  { link: '/dashboard/', label: 'Databases', icon: IconDatabaseImport },
  { link: '/dashboard/', label: 'Authentication', icon: Icon2fa },
  { link: '/dashboard/', label: 'Other Settings', icon: IconSettings },
];

export function Sidebar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          {/* <MantineLogo size={28} /> */}
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}