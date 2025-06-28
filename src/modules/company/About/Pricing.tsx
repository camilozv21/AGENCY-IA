
'use client';

import { Title, Text, Container, Button, Flex, ThemeIcon, List } from '@mantine/core';
import { IconCheck, IconArrowRight } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export default function PricingIntro() {
  const { t } = useTranslation('about');
  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="md">{t('pricing.title')}</Title>
      <Text size="lg" mb="xl" c="dimmed">
        {t('pricing.destitle')}
      </Text>

      <Flex direction="column" gap="xl">
        <PlanBlock
          title= {t('pricing.basicplantitle')}
          description={t('pricing.desbasicplantitle')}
          features={[
            t(`pricing.featuresbasic.${0}`),
            t(`pricing.featuresbasic.${1}`),
            t(`pricing.featuresbasic.${2}`),
            t(`pricing.featuresbasic.${3}`)
          ]}
          link="https://buy.stripe.com/28EcN58cm4Cbex3e6ogEg02"
        />

        <PlanBlock
          title={t('pricing.enterpriceplantitle')}
          description={t('pricing.desenterpriceplantitle')}
          features={[
            'Hasta 175 imágenes personalizadas para redes sociales.',
            '7 videos tipo Veo 3 (5s) para campañas sociales.',
            '10 videos Nova Reel (6s) generados con AWS.',
            'Asistente con IA para ideas, guiones y copies instantáneos.'
          ]}
          link="https://buy.stripe.com/6oU7sL0JUc4D88F5zSgEg04"
        />

        <PlanBlock
          title="Plan Premium – $199.00 USD / mes"
          description="La solución definitiva para empresas que quieren liderar su nicho y automatizar su estrategia digital."
          features={[
            '288 imágenes personalizadas listas para campañas.',
            '14 reels (5s) con Google Veo 3 y 19 videos Nova Reel (6s) en AWS.',
            'Soporte de Google Image 4.0 para imágenes hiperrealistas.',
            'Asistente creativo con IA para campañas y automatización de contenido.'
          ]}
          link="https://buy.stripe.com/5kQcN5eAKgkTcoV3rKgEg08"
        />
      </Flex>

      <Text mt="xl" ta="center" c="dimmed">
        ¿Anual o mensual? Tú decides. Al contratar cualquier plan de forma anual, obtienes más del 15% de ahorro mensual promedio.
      </Text>
    </Container>
  );
}

function PlanBlock({ title, description, features, link }: { title: string; description: string; features: string[]; link: string }) {
  return (
    <div>
      <Title order={3} mb="xs">{title}</Title>
      <Text mb="sm">{description}</Text>
      <List spacing="xs" size="sm" icon={<ThemeIcon color="var(--yellow-contia)" size={20} radius="xl"><IconCheck style={{ color: 'var(--text-brown)'}} size={14} /></ThemeIcon>}>
        {features.map((feature, idx) => <List.Item key={idx}>{feature}</List.Item>)}
      </List>
      <Button
        mt="md"
        radius="xl"
        size="md"
        rightSection={<IconArrowRight size={18} />}
        component="a"
        href={link}
        target="_blank"
        color="var(--yellow-contia)"
        style={{ color: 'var(--text-brown)'}}
      >
        Comenzar ahora
      </Button>
    </div>
  );
}
