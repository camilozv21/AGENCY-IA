"use client";

import React from 'react';
import { Container, Title, Text, Divider, List } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const { t } = useTranslation('termsofservice');
  const { t:privacy } = useTranslation('privacypolicy');
  return (
    <Container size="md" py="md">
      <Title order={1}>📜 {t('termsofservice.title')}</Title>
      <Text mt="md">{t('termsofservice.updatedate')}</Text>
      <Divider my="md" />

      <Text>
        {t('termsofservice.destitle')}
      </Text>

      <Title order={2} mt="md">{t('termsofservice.useService')}</Title>
      <Text mt="sm">
        {t('termsofservice.listitem1')} 
      </Text>
      <Text mt="sm">{t('termsofservice.listitem2')}</Text>
      <List spacing="xs" type="unordered" withPadding mt="xs">
        <List.Item>{t('termsofservice.listitem3')}</List.Item>
        <List.Item>{t('termsofservice.listitem4')}</List.Item>
        <List.Item>{t('termsofservice.listitem5')}</List.Item>
        <List.Item>{t('termsofservice.listitem6')}</List.Item>
      </List>

      <Title order={2} mt="md">{t('termsofservice.listitem7')}</Title>
      <List spacing="xs" type="unordered" withPadding mt="sm">
        <List.Item>{t('termsofservice.listitem8')}</List.Item>
        <List.Item>{t('termsofservice.listitem9')}</List.Item>
        <List.Item>{t('termsofservice.listitem10')}</List.Item>
        <List.Item>{t('termsofservice.listitem11')}</List.Item>
      </List>

      <Title order={2} mt="md">{t('termsofservice.listitem12')}</Title>
      <List spacing="xs" type="unordered" withPadding mt="sm">
        <List.Item>{t('termsofservice.listitem13')}</List.Item>
        <List.Item>{t('termsofservice.listitem14')}</List.Item>
        <List.Item>{t('termsofservice.listitem15')}</List.Item>
        <List.Item>
          {t('termsofservice.listitem16')}
        </List.Item>
      </List>

      <Title order={2} mt="md">{t('termsofservice.listitem17')}</Title>
      <Text mt="sm">
        {t('termsofservice.listitem18')} 
        <br /><br />
        {t('termsofservice.listitem19')}
      </Text>

      <Title order={2} mt="md">{t('termsofservice.listitem20')} </Title>
      <Text mt="sm">
        {t('termsofservice.listitem21')} 
      </Text>
      <List spacing="xs" type="unordered" withPadding mt="xs">
        <List.Item>{t('termsofservice.listitem22')}  </List.Item>
        <List.Item>{t('termsofservice.listitem23')}  </List.Item>
        <List.Item>{t('termsofservice.listitem24')}  </List.Item>
      </List>
      <Text mt="sm">
        {t('termsofservice.listitem25')} 
      </Text>

      <Title order={2} mt="md">{t('termsofservice.listitem26')}</Title>
      <Text mt="sm">
        {t('termsofservice.listitem27')}
      </Text>

      <Title order={2} mt="md">{t('termsofservice.listitem28')} </Title>
      <Text mt="sm">
        {t('termsofservice.listitem29')}
      </Text>

      <Title order={2} mt="md">{t('termsofservice.listitem30')}</Title>
      <Text mt="sm">
        {t('termsofservice.listitem31')}
      </Text>

      <Title order={2} mt="md">{t('termsofservice.listitem32')} </Title>
      <Text mt="sm">
        {t('termsofservice.listitem33')}
      </Text>

      <Title order={2} mt="md">{t('termsofservice.listitem34')}</Title>
      <Text mt="sm">
        {t('termsofservice.listitem35')} 
      </Text>

      <Title order={2} mt="md">{t('termsofservice.listitem36')}</Title>
      <Text mt="sm">
        {privacy('privacy.listitem43')}
        <br />📧 {privacy('privacy.listitem44')}
        <br />🌐 {privacy('privacy.listitem45')} 
      </Text>
    </Container>
  );
}