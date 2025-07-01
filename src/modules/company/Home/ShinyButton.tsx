import { Box, Group } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';
import styles from './ShinyButton.module.css';
import { useTranslation } from 'react-i18next';

export default function ShinyButton() {
  const { t } = useTranslation('home');
  return (
    <Box component="a" href="/dashboard" className={styles.wrapper}>
      <Box className={styles.glow} />
      <Box className={styles.button}>
        <Group gap={8}>
          <IconSparkles size={20} opacity={0.8} />
          <span>{t('home.carousel.shinybutton')}</span>
        </Group>
      </Box>
    </Box>
  );
}
