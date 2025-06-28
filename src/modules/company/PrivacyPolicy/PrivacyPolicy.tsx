"use client";

import React from 'react';
import { Container, Title, Text, Divider, List } from '@mantine/core';
import { useTranslation } from 'react-i18next';
export default function PrivacyPolicy() {
  const { t } = useTranslation('privacypolicy');
  return (
    <Container size="md" py="md">
      <Title order={1}>🛡️ {t('privacy.title')} </Title>
      <Text mt="md">{t('privacy.updatedate')}</Text>
      <Divider my="md" />

      <Text>
        {t('privacy.destitle')}
      </Text>

      <Title order={2} mt="md">{t('privacy.titlewecolle')}</Title>
      <List spacing="sm" type="unordered">
        <List.Item>
          <Text><strong>{t('privacy.listitem1')}</strong></Text>
          <List type="unordered" spacing="xs" withPadding>
            <List.Item>{t('privacy.listitem2')}</List.Item>
            <List.Item>{t('privacy.listitem3')}</List.Item>
            <List.Item>{t('privacy.listitem4')}</List.Item>
          </List>
        </List.Item>
        <List.Item>
          <Text><strong>{t('privacy.listitem5')}</strong></Text>
          <List type="unordered" spacing="xs" withPadding>
            <List.Item>{t('privacy.listitem6')}</List.Item>
            <List.Item>{t('privacy.listitem7')}</List.Item>
          </List>
        </List.Item>
        <List.Item>
          <Text><strong>{t('privacy.listitem8')}</strong></Text>
          <List type="unordered" spacing="xs" withPadding>
            <List.Item>
              {t('privacy.listitem9')} 
            </List.Item>
            <List.Item>
             {t('privacy.listitem10')}
            </List.Item>
          </List>
        </List.Item>
      </List>

      <Title order={2} mt="md">{t('privacy.listitem11')}</Title>
      <List spacing="sm" type="unordered">
        <List.Item>{t('privacy.listitem12')}</List.Item>
        <List.Item>{t('privacy.listitem13')}</List.Item>
        <List.Item>{t('privacy.listitem14')}</List.Item>
        <List.Item>{t('privacy.listitem15')}</List.Item>
        <List.Item>{t('privacy.listitem16')}</List.Item>
      </List>

      <Title order={2} mt="md">{t('privacy.listitem17')}</Title>
      <List spacing="sm" type="unordered">
        <List.Item>
          <strong>{t('privacy.listitem18')}</strong>{t('privacy.listitem19')} 
        </List.Item>
        <List.Item>
          <strong>{t('privacy.listitem20')}</strong>{t('privacy.listitem21')}
        </List.Item>
        <List.Item>
          <strong>{t('privacy.listitem22')}</strong>{t('privacy.listitem23')}
        </List.Item>
        <List.Item>
          <strong>{t('privacy.listitem24')}</strong>{t('privacy.listitem25')}   
        </List.Item>
      </List>

      <Title order={2} mt="md">{t('privacy.listitem26')}</Title>
      <Text mt="sm">
        {t('privacy.listitem27')}
      </Text>

      <Title order={2} mt="md">{t('privacy.listitem28')}</Title>
      <List spacing="sm" type="unordered">
        <List.Item>{t('privacy.listitem29')}</List.Item>
        <List.Item>{t('privacy.listitem30')}</List.Item>
        <List.Item>{t('privacy.listitem31')}</List.Item>
        <List.Item>{t('privacy.listitem32')}</List.Item>
      </List>

      <Title order={2} mt="md">{t('privacy.listitem33')}</Title>
      <List spacing="sm" type="unordered">
        <List.Item>{t('privacy.listitem34')}</List.Item>
        <List.Item>{t('privacy.listitem35')}</List.Item>
        <List.Item>{t('privacy.listitem36')}</List.Item>
        <List.Item>{t('privacy.listitem37')}</List.Item>
      </List>

      <Title order={2} mt="md">{t('privacy.listitem38')}</Title>
      <Text mt="sm">
        {t('privacy.listitem39')}
      </Text>

      <Title order={2} mt="md">{t('privacy.listitem40')}</Title>
      <Text mt="sm">
        {t('privacy.listitem41')}
      </Text>

      <Title order={2} mt="md">{t('privacy.listitem42')}</Title>
      <Text mt="sm">
       {t('privacy.listitem43')} 
        <br />J&M Industry, LLC
        <br />📧 {t('privacy.listitem44')}
        <br />🌐 {t('privacy.listitem45')} 
      </Text>
    </Container>
  );
}
