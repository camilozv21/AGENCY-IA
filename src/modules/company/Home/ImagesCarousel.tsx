"use client";

import { Carousel } from '@mantine/carousel';
import { ActionIcon, Avatar, Card, Group, Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import AutoScroll from 'embla-carousel-auto-scroll'
import { useMediaQuery } from '@mantine/hooks';
import classes from './ImagesCarousel.module.css';
import { useRef } from 'react';
import Image from 'next/image';
import { IconBookmark, IconBrandTelegram, IconHeart, IconMessageCircle } from '@tabler/icons-react';
import { data } from '@/utils/carouselImages';
import ShinyButton from './ShinyButton';
import { useTranslation } from 'react-i18next';

interface CardProps {
  image: string;
  avatar: string;
  name: string;
  bio: string;
  number: number;
  commentsNumber: number;
}

function CardCustom({ image, avatar, name, bio, number, commentsNumber }: CardProps) {
  const { t } = useTranslation('home');
  return (
    <Paper
      shadow="none"
      radius="md"
      className={classes.card}
    >
      <Card withBorder radius="md" shadow="sm" maw={400}>
        {/* Header */}
        <Group justify="space-between" align="center" mb={10}>
          <Group>
            <Avatar radius="xl" src={avatar} />
            <Text fw={500}>{name}</Text>
          </Group>
          <Text size="xs" c="dimmed">{commentsNumber} h</Text>
        </Group>

        {/* Imagen principal */}
        <Image
          src={image}
          alt="Instagram meme"
          width={300}
          height={200}
          draggable={false}
          priority={true} 
          quality={75}
        />

        {/* Iconos de interacción */}
        <Group justify="space-between">
          <Group>
            <ActionIcon variant="subtle" color="dark">
              <IconHeart size={20} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="dark">
              <IconMessageCircle size={20} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="dark">
            <IconBrandTelegram size={20} />
            </ActionIcon>
          </Group>
          <ActionIcon variant="subtle" color="dark">
            <IconBookmark size={20} />
          </ActionIcon>
        </Group>

        {/* Detalles de la publicación */}
        <Stack gap={2} mt="xs">
          <Text size="sm" fw={500}>{number} {t('home.carousel.likes')}</Text>
          <Text size="sm">
            <Text span fw={500}>{name} </Text>
            {bio}
          </Text>
          <Text size="xs" c="dimmed">{t('home.carousel.comments', { count: commentsNumber })}</Text>
        </Stack>
      </Card>
    </Paper>
  );
}

export function ImagesCarousel() {
  const theme = useMantineTheme();
  const autoScroll = useRef(AutoScroll({ speed: 1, direction: 'backward', stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false }));
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const { t } = useTranslation('home');
  const slides = data.map((item) => (
    <Carousel.Slide key={item.image}>
      <CardCustom {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '7%',
            left: 0,
            width: '100%',
            height: '100%',
            maxHeight: '700px',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src="https://df50lbm4qcrt6.cloudfront.net/home-carousel/Stars.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={classes.dark}></div>
      <div className={classes.containerHome}>
        <Title order={1} className={classes.mainTitle}>
          {mobile ? t('home.carousel.titlemobile') : t('home.carousel.title')}
        </Title>
        <Text className={classes.subtext} mx={10}>
          {mobile ? t('home.carousel.subtextmobile')
           : t('home.carousel.subtext')}
        </Text>
        <ShinyButton />
      </div>
      <Carousel
        style={{ position: 'relative', zIndex: 1 }}
        classNames={{
          root: classes.carouselRoot,
          container: classes.carouselContainer,
        }}
        withControls={false}
        draggable={false}
        slideSize={{ base: '0%', sm: '0%' }}
        slideGap={{ base: 'xs', sm: 'sm' }}
        initialSlide={data.length - 1}
        emblaOptions={{ loop: true }}
        height={700}
        plugins={[autoScroll.current]}
      >
        {slides}
      </Carousel>
    </>
  );
}