'use client';

import {
  Title,
  Text,
  Box,
  Accordion,
  Badge,
  Group,
  Stack,
} from '@mantine/core';
import { IconSparkles, IconBug, IconTool } from '@tabler/icons-react';

export function Changelog() {
  const updates = [
    {
      version: 'v1.4.0',
      date: 'Junio 2025',
      highlights: [
        {
          type: 'new',
          text: 'Soporte para el modelo Veo 2 de Google para generación de video ultra realista.',
        },
        {
          type: 'new',
          text: 'Integración con Nova Canva de AWS para generación gráfica basada en marca.',
        },
        {
          type: 'improve',
          text: 'Mejoras de rendimiento en la carga inicial y el panel de usuario.',
        },
      ],
    },
    {
      version: 'v1.3.2',
      date: 'Mayo 2025',
      highlights: [
        {
          type: 'fix',
          text: 'Solucionado error que impedía generar videos en algunos navegadores móviles.',
        },
        {
          type: 'new',
          text: 'Nuevo modelo Nova Reel integrado para contenido tipo TikTok de hasta 6 segundos.',
        },
      ],
    },
    {
      version: 'v1.2.0',
      date: 'Abril 2025',
      highlights: [
        {
          type: 'new',
          text: 'Incorporado soporte para Google Image 4.0 como motor de generación de imágenes.',
        },
        {
          type: 'improve',
          text: 'Nuevo diseño en la interfaz de generación para facilitar la navegación móvil.',
        },
        {
          type: 'fix',
          text: 'Ajustes menores de validación en el formulario de soporte.',
        },
      ],
    },
  ];

  const typeBadge = {
    new: { label: 'Nuevo', color: 'green', icon: <IconSparkles size={14} /> },
    fix: { label: 'Fix', color: 'red', icon: <IconBug size={14} /> },
    improve: { label: 'Mejora', color: 'blue', icon: <IconTool size={14} /> },
  };

  return (
    <Box maw={800} mx="auto" px="md" py={80}>
      <Stack>
        <Title order={2} style={{ fontSize: 32 }} ta="center">
          Changelog
        </Title>
        <Text ta="center" c="dimmed" mb="md">
          Consulta los últimos cambios, mejoras y correcciones realizadas en ContiA.
        </Text>

        <Accordion variant="separated">
          {updates.map((update) => (
            <Accordion.Item key={update.version} value={update.version}>
              <Accordion.Control>
                <Group justify="space-between">
                  <Text fw={600}>{update.version}</Text>
                  <Text size="sm" c="dimmed">
                    {update.date}
                  </Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack>
                  {update.highlights.map((item, idx) => (
                    <Group key={idx} align="start">
                      <Badge
                        color={(typeBadge[item.type as 'new' | 'fix' | 'improve']).color}
                        leftSection={typeBadge[item.type as 'new' | 'fix' | 'improve'].icon}
                        size="sm"
                        radius="sm"
                        variant="light"
                      >
                        {typeBadge[item.type as 'new' | 'fix' | 'improve'].label}
                      </Badge>
                      <Text size="sm">{item.text}</Text>
                    </Group>
                  ))}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
    </Box>
  );
}
