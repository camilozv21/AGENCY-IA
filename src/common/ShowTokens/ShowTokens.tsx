'use client'

import { Badge, Group, Text, Tooltip } from '@mantine/core'
import { readLocalStorageValue } from '@mantine/hooks';
import { IconBolt } from '@tabler/icons-react'

export default function ShowTokens() {
  const tokens = readLocalStorageValue<number>({ key: 'tokens' });

  return (
    <Tooltip label="Tokens disponibles" withArrow>
      <Group px={8} py={4} style={{
        backgroundColor: '#1a1b1e',
        borderRadius: 8,
        cursor: 'default'
      }}>
        <IconBolt size={16} color="#a78bfa" />
        <Text size="sm" color="gray.1" fw={500}>
          {tokens ?? 0}
        </Text>
        <Badge variant="light" size="xs" color="violet" radius="sm" px={6}>
          Tokens
        </Badge>
      </Group>
    </Tooltip>
  )
}
