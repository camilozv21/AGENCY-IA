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

interface CardProps {
  image: string;
  avatar: string;
}

function CardCustom({ image, avatar }: CardProps) {
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
            <Text fw={500}>crazyvideos</Text>
          </Group>
          <Text size="xs" c="dimmed">8 h</Text>
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
          <Text size="sm" fw={500}>1003 Me gusta</Text>
          <Text size="sm">
            <Text span fw={500}>crazyvideos </Text>
            The movie vs subtitles 😂
          </Text>
          <Text size="xs" c="dimmed">Ver los 4 comentarios</Text>
        </Stack>
      </Card>
    </Paper>
  );
}

export function ImagesCarousel() {
  const theme = useMantineTheme();
  const autoScroll = useRef(AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false }));
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
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
          {mobile ? 'Generación de Contenido IA' : 'Generacion de Contenido IA Para Redes Sociales'}
        </Title>
        <Text className={classes.subtext} mx={10}>
          {mobile ? 'Crea contenido con IA y transforma tus ideas en publicaciones impactantes con ContiA. Mejora tu presencia en redes sociales.'
           : 'Crea contenido con inteligencia artificial y transforma tus ideas en impactantes publicaciones con el generador de ContiA. Potencia tu presencia en redes sociales de forma fácil y profesional.'}
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
        // align="start"
        // slidesToScroll={mobile ? 2 : 2}
        // loop
        height={700}
        plugins={[autoScroll.current]}
      >
        {slides}
      </Carousel>
    </>
  );
}