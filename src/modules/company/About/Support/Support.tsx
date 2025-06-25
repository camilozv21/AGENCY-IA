"use client";

import React from 'react';
import { Title, Text, Container, Accordion, Paper } from '@mantine/core';
import { SupportForm } from './SupportForm';

export default function Support({ user }: { user?: { email: string, name: string, image: string } }) {
  return (
    <Container size="md" pt={60} pb={60}>
      <Title order={1} mb="md" ta="center" fw={900}>
        Centro de Soporte de ContiA
      </Title>
      <Text size="lg" ta="center" mb="xl">
        ¿Tienes dudas, problemas técnicos o necesitas ayuda para aprovechar al máximo nuestros modelos de generación?
        Aquí encontrarás respuestas y formas de contactarnos.
      </Text>

      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Accordion variant="separated" transitionDuration={300}>
          <Accordion.Item value="1">
            <Accordion.Control>¿Cómo empiezo a usar los generadores de imágenes y videos?</Accordion.Control>
            <Accordion.Panel>
              Una vez adquieras un plan, accede a tu panel desde el menú principal. Allí podrás seleccionar el modelo de generación (Veo 3, Image 4.0, Nova Canva, Nova Reel) y empezar a crear tu contenido.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="2">
            <Accordion.Control>¿Puedo cambiar de plan en cualquier momento?</Accordion.Control>
            <Accordion.Panel>
              Sí, puedes cambiar de plan desde tu cuenta. El nuevo plan se activa inmediatamente y se ajusta el número de tokens disponibles según tu suscripción actual.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="3">
            <Accordion.Control>¿Qué hago si tengo problemas con la generación de contenido?</Accordion.Control>
            <Accordion.Panel>
              Si un modelo no responde correctamente o el contenido generado no cumple con tus expectativas, llena el siguiente formulario indicando el problema y adjunta ejemplos si es posible.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="4">
            <Accordion.Control>¿Cuál es el tiempo de respuesta del soporte técnico?</Accordion.Control>
            <Accordion.Panel>
              Nuestro equipo responde en menos de 24 horas hábiles.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="5">
            <Accordion.Control>¿Los tokens vencen?</Accordion.Control>
            <Accordion.Panel>
              Los tokens mensuales se renuevan cada ciclo. Si tienes un plan anual, puedes acumularlos durante todo el año. Recomendamos usarlos antes de la renovación para sacar el mayor provecho.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>

      { user ? (
        <SupportForm />
      ) : (
        <Text ta="center" mt="xl">
          Inicia sesión para acceder al formulario de soporte.
        </Text>
      )}
    </Container>
  );
}
