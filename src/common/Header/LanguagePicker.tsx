'use client';

import { useEffect, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Image, Menu, UnstyledButton } from '@mantine/core';
import classes from './LanguagePicker.module.css';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { i18nConfig } from '@/i18nConfig';

type Language = {
  label: string;
  image: string;
  value: string;
};

const data: Language[] = [
  { label: 'Español', image: 'https://i.imgur.com/v72UaHG.png', value: 'es' },
  { label: 'English', image: 'https://i.imgur.com/NVCmjWC.png', value: 'en' },
];

export function LanguagePicker() {
  const [opened, setOpened] = useState(false);
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [selected, setSelected] = useState<Language>(
    data.find((lang) => lang.value === currentLocale) || data[0]
  );

  useEffect(() => {
    const currentLanguage = data.find((lang) => lang.value === currentLocale);
    if (currentLanguage) {
      setSelected(currentLanguage);
    }
  }, [currentLocale]);

  const handleChange = (newLocale: string) => {
    i18n.changeLanguage(newLocale);

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  const updateLanguage = (item: Language) => {
    setSelected(item);
    handleChange(item.value);
  };

  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Image src={item.image} alt={item.label} width={18} height={18} />}
      onClick={() => updateLanguage(item)}
      key={item.label}
      value={item.value}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal={false}
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} alt={selected.label} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}