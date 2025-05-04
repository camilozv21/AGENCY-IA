"use client";

import { Button, Card, CardSection, Group, Text } from '@mantine/core';
import classes from './CardGradient.module.css';
import Image from 'next/image';
import { IconArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export function CardGradient({ imageUrl, title, description, buttonText }: { imageUrl: string; title: string; description: string; buttonText: string }) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/dashboard/tool/text-to-image');
  };
  return (
      <Card shadow="sm" radius="lg" p={10} withBorder className={classes.card}>
        <CardSection>
          <Image
            src={imageUrl}
            alt="Card Gradient"
            layout="responsive"
            width={240}
            height={240}
            className={classes.image}
          />
        </CardSection>

        <Group pl={-10} gap={0}>
          <Text fw={500}>{title}</Text>
          <Text size="xs" c="dimmed">
            {description}
          </Text>
        </Group>

        <Group justify='flex-end'>
          <Button onClick={() => handleButtonClick()} rightSection={<IconArrowRight />} color="#F3C96B" mt="sm" radius="md" style={{ color: '#1E1E2D'}}>
            {buttonText}
          </Button>
        </Group>
      </Card>
  );
}