"use client";

import React from 'react';
import { Title, Text, Container, Accordion, Paper } from '@mantine/core';
import { SupportForm } from './SupportForm';
import { useTranslation } from 'react-i18next';

export default function Support({ user }: { user?: { email: string, name: string, image: string } }) {
  const { t } = useTranslation('support');
  return (
    <Container size="md" pt={60} pb={60}>
      <Title order={1} mb="md" ta="center" fw={900}>
        {t('support.listitem1')} 
      </Title>
      <Text size="lg" ta="center" mb="xl">
        {t('support.listitem2')} 
      </Text>

      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Accordion variant="separated" transitionDuration={300}>
          <Accordion.Item value="1">
            <Accordion.Control>{t('support.listitem3')} </Accordion.Control>
            <Accordion.Panel>
              {t('support.listitem4')}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="2">
            <Accordion.Control>{t('support.listitem5')}</Accordion.Control>
            <Accordion.Panel>
              {t('support.listitem6')}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="3">
            <Accordion.Control>{t('support.listitem7')}</Accordion.Control>
            <Accordion.Panel>
              {t('support.listitem8')} 
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="4">
            <Accordion.Control>{t('support.listitem9')}</Accordion.Control>
            <Accordion.Panel>
              {t('support.listitem10')} 
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="5">
            <Accordion.Control>{t('support.listitem11')}</Accordion.Control>
            <Accordion.Panel>
              {t('support.listitem12')} 
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>

      { user ? (
        <SupportForm />
      ) : (
        <Text ta="center" mt="xl">
          {t('support.listitem13')}
        </Text>
      )}
    </Container>
  );
}
