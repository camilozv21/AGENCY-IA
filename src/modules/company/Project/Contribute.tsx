'use client';

import { Title, Text, Button, Box, Card, Group, Stack } from '@mantine/core';
import { IconHeartHandshake, IconCode, IconMessage } from '@tabler/icons-react';
import Link from 'next/link';

export function Contribute() {
  return (
    <Box maw={900} mx="auto" px="md" py={80}>
      <Stack align="center">
        <Title order={2} ta="center" style={{ fontSize: 32 }}>
          ¿Quieres contribuir a mejorar ContiA?
        </Title>

        <Text ta="center" size="lg" c="dimmed">
          ContiA crece gracias a personas como tú. Ya sea aportando ideas, reportando bugs, mejorando el código o ayudando a otros usuarios,
          tu aporte hace la diferencia.
        </Text>

        <Group grow align="stretch">
          <Card shadow="md" radius="md" p="lg" withBorder>
            <Group align="center">
              <IconMessage size={32} color="var(--yellow-contia)" />
              <Text fw={600}>Sugerencias y feedback</Text>
            </Group>
            <Text c="dimmed" mt="sm" fz="sm">
              ¿Tienes una idea o mejora? Nos encantaría escucharla.
            </Text>
            <Button
              mt="md"
              variant="light"
              component={Link}
              href="/support"
              color="var(--yellow-contia)"
              style={{ color: 'var(--text-brown)' }}
            >
              Enviar sugerencia
            </Button>
          </Card>

          <Card shadow="md" radius="md" p="lg" withBorder>
            <Group align="center">
              <IconCode size={32} color="var(--yellow-contia)" />
              <Text fw={600}>Contribuir al código</Text>
            </Group>
            <Text c="dimmed" mt="sm" fz="sm">
              ¿Eres developer? Puedes sugerir mejoras o hacer PRs a nuestro repositorio.
            </Text>
            <Button
              mt="md"
              variant="light"
              component="a"
              href="https://github.com/tu-repo-contia" // actualiza con tu repo
              target="_blank"
              rel="noopener noreferrer"
              color="var(--yellow-contia)"
              style={{ color: 'var(--text-brown)' }}
            >
              Ir al repositorio
            </Button>
          </Card>

          <Card shadow="md" radius="md" p="lg" withBorder>
            <Group align="center">
              <IconHeartHandshake size={32} color="var(--yellow-contia)" />
              <Text fw={600}>Apóyanos compartiendo</Text>
            </Group>
            <Text c="dimmed" mt="sm" fz="sm">
              Difunde nuestra herramienta entre amigos, emprendedores o comunidades. ¡Cada nuevo usuario cuenta!
            </Text>
            <Button
              mt="md"
              variant="light"
              color="var(--yellow-contia)"
              style={{ color: 'var(--text-brown)' }}
              component="a"
              href="https://www.linkedin.com/shareArticle?mini=true&url=https://contia.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Compartir en LinkedIn
            </Button>
          </Card>
        </Group>
      </Stack>
    </Box>
  );
}
