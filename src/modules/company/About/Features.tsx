'use client';

import { Container, Title, Text, SimpleGrid, Card, Group, ThemeIcon } from '@mantine/core';
import { IconPhoto, IconVideo, IconBrain, IconSettingsAutomation, IconShieldCheck, IconTrendingUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation('about');
  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="sm" ta="center">
        {t('features.title')}
      </Title>
      <Text c="dimmed" ta="center" mb="xl">
        {t('features.descubre')}
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" withBorder>
          <Group align="flex-start">
            <ThemeIcon size="lg" radius="xl" color="indigo">
              <IconPhoto />
            </ThemeIcon>
            <div>
              <Text fw={600}>{t('features.imgpersonalizadas')}</Text>
              <Text size="sm" c="dimmed">
                {t('features.descimgpersonalizadas')}
              </Text>
            </div>
          </Group>
        </Card>

        <Card shadow="sm" radius="md" withBorder>
          <Group align="flex-start">
            <ThemeIcon size="lg" radius="xl" color="violet">
              <IconVideo />
            </ThemeIcon>
            <div>
              <Text fw={600}>{t('features.vidre')}</Text>
              <Text size="sm" c="dimmed">
                {t('features.desvidre')}
              </Text>
            </div>
          </Group>
        </Card>

        <Card shadow="sm" radius="md" withBorder>
          <Group align="flex-start">
            <ThemeIcon size="lg" radius="xl" color="grape">
              <IconBrain />
            </ThemeIcon>
            <div>
              <Text fw={600}>{t('features.asis')}</Text>
              <Text size="sm" c="dimmed">
               {t('features.desasis')}
              </Text>
            </div>
          </Group>
        </Card>

        <Card shadow="sm" radius="md" withBorder>
          <Group align="flex-start">
            <ThemeIcon size="lg" radius="xl" color="teal">
              <IconSettingsAutomation />
            </ThemeIcon>
            <div>
              <Text fw={600}>{t('features.autcont')}</Text>
              <Text size="sm" c="dimmed">
                {t('features.desautcont')}
              </Text>
            </div>
          </Group>
        </Card>

        <Card shadow="sm" radius="md" withBorder>
          <Group align="flex-start">
            <ThemeIcon size="lg" radius="xl" color="orange">
              <IconTrendingUp />
            </ThemeIcon>
            <div>
              <Text fw={600}>{t('features.plans')}</Text>
              <Text size="sm" c="dimmed">
                {t('features.desplans')}
              </Text>
            </div>
          </Group>
        </Card>

        <Card shadow="sm" radius="md" withBorder>
          <Group align="flex-start">
            <ThemeIcon size="lg" radius="xl" color="green">
              <IconShieldCheck />
            </ThemeIcon>
            <div>
              <Text fw={600}>{t('features.segpriv')}</Text>
              <Text size="sm" c="dimmed">
                {t('features.dessegpriv')}
              </Text>
            </div>
          </Group>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
