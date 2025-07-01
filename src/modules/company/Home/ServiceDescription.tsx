"use client";

import { Card, CardSection, Flex, Group, Text, Title } from '@mantine/core';
import classes from './ServiceDescription.module.css';
import Image from 'next/image';
import { cardsHome } from '@/utils/cardsHome';
import { useTranslation } from 'react-i18next';

export default function ServiceDescription() {
  const { t } = useTranslation('home');
  return (
    <>
      <Flex direction='column' justify="center" align="center" className={classes.flexContainer}>
        <div style={{ maxWidth: '500px', textAlign: 'center' }}>
          <Title order={2} className={classes.subtitle}>{t('home.service.title')}</Title>
          <Text className={classes.text}>{t('home.service.subtitle')}</Text>
        </div>
      </Flex>

      <Flex gap={20} direction="column" justify="center" align="center" p="20px 20px" className={classes.cardsContainer}>
        {cardsHome.map((card, idx) => (
          <Card key={card.id} shadow="sm" radius="lg" p={10} withBorder className={classes.card}>
            <CardSection>
              {card.type === 'image' ? (
                <Image
                  src={card.src}
                  alt={card.alt || 'Card Image'}
                  layout="responsive"
                  width={240}
                  height={240}
                  className={classes.image}
                />
              ) : (
                <video
                  src={card.src}
                  // controls
                  muted
                  autoPlay={true}
                  loop
                  className={classes.video}
                ></video>
              )}
            </CardSection>

            <Group gap={0} px={6}>
              <Text fw={500} fz="24px">{t(`home.service.cardshome.${idx}.title`)}</Text>
              <Text size="xs">{t(`home.service.cardshome.${idx}.description`)}</Text>
            </Group>
          </Card>
        ))}
      </Flex>

      <Flex direction="column" justify="flex-start" align="center" className={classes.heroContainer}>
        {cardsHome.map((card, idx) => (
          <Flex key={card.id} gap={20} align="center" justify="space-between" style={{ margin: '40px 0px', maxWidth: '1100px', width: '100%' }}>
            {card.type === 'image' ? (
              <Image
                src={card.src}
                alt={card.alt || 'Media Image'}
                layout="responsive"
                width={550}
                height={550}
                style={{
                  borderRadius: '15px',
                  maxWidth: '550px',
                  maxHeight: '550px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <video
                src={card.src}
                // controls
                muted
                autoPlay
                loop
                style={{
                  borderRadius: '15px',
                  maxWidth: '550px',
                  maxHeight: '550px',
                  objectFit: 'cover'
                }}
              />
            )}
            <div style={{ maxWidth: '550px', textAlign: 'left' }}>
              <Title order={2} style={{ fontSize: '2.5rem' }}>
                {t(`home.service.cardshome.${idx}.title`)}
              </Title>
              <Text size="lg" mt={10}>
                {t(`home.service.cardshome.${idx}.description`)}
              </Text>
            </div>
          </Flex>
        ))}
      </Flex>
    </>
  )
}
