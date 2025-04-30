import { Box, Group } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';
import styles from './ShinyButton.module.css';

export default function ShinyButton() {
  return (
    <Box component="a" href="/auth/signup" className={styles.wrapper}>
      <Box className={styles.glow} />
      <Box className={styles.button}>
        <Group gap={8}>
          <IconSparkles size={20} opacity={0.8} />
          <span>Empieza a crear ahora</span>
        </Group>
      </Box>
    </Box>
  );
}
