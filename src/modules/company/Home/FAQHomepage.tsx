"use client";

import { Accordion, Container, Grid, Title } from '@mantine/core';
import classes from './FAQHomepage.module.css';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export function FAQHomepage() {
  const { t } = useTranslation('home');
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src="https://df50lbm4qcrt6.cloudfront.net/imageFAQHomepage.svg" alt="Frequently Asked Questions" layout="responsive" width={500} height={500} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              {t('home.FAQ.title')}
            </Title>

            <Accordion chevronPosition="right" variant="separated">
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>{t('home.FAQ.opciones')}</Accordion.Control>
                <Accordion.Panel>{t('home.FAQ.opcionestexto')}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>{t('home.FAQ.cancelar')}</Accordion.Control>
                <Accordion.Panel>{t('home.FAQ.cancelartexto')}
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>{t('home.FAQ.actualizar')}</Accordion.Control>
                <Accordion.Panel>{t('home.FAQ.actualizartexto')}</Accordion.Panel>
              </Accordion.Item>

              {/* <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Do you store credit card information securely?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item> */}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}