"use client";

import React, { useEffect } from 'react';
import { Button, Text, Title, Flex } from '@mantine/core';
import classes from './DashboardHome.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { CardGradient } from './CardGradient';
import { data } from '@/utils/cardsDashboard';

export default function DashboardHome({ user }: { user?: { email: string, name: string, image: string } }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
    async function verifyUser() {
      if (user?.email) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?email=${encodeURIComponent(user.email)}`,
          { method: 'GET', cache: 'no-store' }
        );

        const getRes = await res.json();

        if (!getRes || !getRes.email) {
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
            }),
          });
        }
      }
    }
    verifyUser();
  }, []);

  return (
    <>
      <Flex direction="column" justify="center" align="center" className={classes.container}>
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
            color='var(--yellow-contia)'
            href="/dashboard/tool/text-to-image"
          >
            Provar Ahora
          </Button>
        </div>
      </Flex>
      
      <div className={classes.containerStudio}>
        <Title order={3} className={classes.subtitle} mx={'1rem'}>
          ContiA Estudio
        </Title>
        <Text className={classes.descriptionText} mx={'1rem'} size='sm'>
          Crea posts desde cero, edita imagenes y mucho mas!
        </Text>

        <Flex
          justify="flex-start" 
          direction={'row'}
          align="center" 
          wrap="wrap"
          mx={'1rem'} 
          gap={'2rem'} 
          my={20}
        >
          {data.map((item, index) => (
            <CardGradient
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              link={item.link}
              disabled={item.disabled}
            />
          ))}
        </Flex>
      </div>
    </>
  );
}