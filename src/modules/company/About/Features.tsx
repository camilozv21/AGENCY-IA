'use client';

import { Container, Title, Text, SimpleGrid, Card, Group, ThemeIcon } from '@mantine/core';
import { IconPhoto, IconVideo, IconBrain, IconSettingsAutomation, IconShieldCheck, IconTrendingUp } from '@tabler/icons-react';

export default function Features() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="sm" ta="center">
        Características principales de ContiA
      </Title>
      <Text c="dimmed" ta="center" mb="xl">
        Descubre todo lo que nuestra plataforma puede hacer para automatizar tu presencia online y posicionar tu marca.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" withBorder>
          <Group align="flex-start">
            <ThemeIcon size="lg" radius="xl" color="indigo">
              <IconPhoto />
            </ThemeIcon>
            <div>
              <Text fw={600}>Imágenes personalizadas con IA</Text>
              <Text size="sm" c="dimmed">
                Crea imágenes profesionales y adaptadas a tu marca usando modelos como Image 4.0 de Google y Nova Canva de AWS. Ideal para redes sociales, ecommerce o publicidad.
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
              <Text fw={600}>Generación de videos para redes</Text>
              <Text size="sm" c="dimmed">
                Genera reels, TikToks o shorts usando IA de última generación como Veo 2 de Google y Nova Reel de AWS. Atrae más clientes con videos impactantes.
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
              <Text fw={600}>Asistente creativo con GPT-4 Turbo</Text>
              <Text size="sm" c="dimmed">
                Obtén ideas, textos y copies para tus campañas gracias a modelos de lenguaje avanzados. Ahorra tiempo y mejora la calidad de tu comunicación digital.
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
              <Text fw={600}>Automatización de contenido</Text>
              <Text size="sm" c="dimmed">
                Automatiza la creación y publicación de contenido. Aumenta tu productividad sin depender de agencias o community managers.
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
              <Text fw={600}>Planes escalables por tokens</Text>
              <Text size="sm" c="dimmed">
                Usa tus créditos como prefieras: imágenes, textos o videos. Cambia de estrategia cuando lo necesites sin pagar de más.
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
              <Text fw={600}>Seguridad y privacidad garantizada</Text>
              <Text size="sm" c="dimmed">
                Protegemos tus datos con cifrado y filtros automáticos de contenido sensible. ContiA cumple con estándares de seguridad a nivel empresarial.
              </Text>
            </div>
          </Group>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
