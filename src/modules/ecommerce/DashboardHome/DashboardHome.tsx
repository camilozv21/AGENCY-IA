"use client";

import React from 'react';
import { Group, Button, Text, Title } from '@mantine/core';
import classes from './DashboardHome.module.css';
import { useMediaQuery } from '@mantine/hooks';

export default function DashboardHome() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Group className={classes.carouselContainer}>
      <div className={classes.imageWrapper}>
        <img
          src="https://df50lbm4qcrt6.cloudfront.net/dashboard/dashboardHomeImage.png"
          alt="Dashboard Home"
          className={classes.image}
        />
      </div>
      <div className={classes.overlay}></div>
      <div className={classes.content}>
        <Title order={3} className={classes.title}>
          {isMobile ? "Nuevo Modelo De Imagenes" : "Nuevo Modelo De Generacion De Imagenes"}
        </Title>
        <Text className={classes.description}>
          {isMobile ? "Convierte tus ideas en imagenes!" : "Convierte tus ideas en imagenes de alta calidad!"}
        </Text>
        <Button
          className={classes.button}
          component="a"
          color='#F3C96B'
          href="/dashboard/tool/text-to-image"
        >
          Provar Ahora
        </Button>
      </div>
    </Group>
  );
}