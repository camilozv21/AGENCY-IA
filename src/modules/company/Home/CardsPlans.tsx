"use client";

import { Button, Card, Flex, Group, Text, ThemeIcon, Tabs, Badge } from '@mantine/core';
import classes from './CardsPlans.module.css';
import { plansDataMonthly, plansDataYearly } from '@/utils/plans';
import { useTranslation } from 'react-i18next';

export function CardsPlans({ user }: { user?: { email?: string, name?: string, image?: string } }) {
  const monthlyPlans = plansDataMonthly;
  const annualPlans = plansDataYearly;
  const { t } = useTranslation('home');
  // const [plan, setPlan] = useState<typeof monthlyPlans[0] | typeof annualPlans[0]>();

  return (
    <Tabs 
      defaultValue="monthly" 
      mt={50} 
      color="var(--yellow-contia)" 
      variant="pills" 
      radius="md"
      style={{ zIndex: '1000', position: 'relative' }}
      autoContrast
      classNames={{
        tab: classes.colorTabs
      }}
    >
      <Tabs.List justify="center">
        <Tabs.Tab value="monthly">{t('home.cards.mensual')}</Tabs.Tab>
        <Tabs.Tab value="annual">{t('home.cards.anual')}</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="monthly" pt="xs">
        <Flex
          mih={50}
          gap="lg"
          justify="center"
          align="start"
          direction="row"
          wrap="wrap"
          // pt={30}
          pb={30}
          px="sm"
          // mt={50}
          style={{ zIndex: '1000', position: 'relative' }}
        >
          {monthlyPlans.map((plan, idx) => (
            <div key={plan.name}>
              <Text size="xl" className={classes.featured} style={{ opacity: plan.featured ? 1 : 0 }}>
                {t('home.cards.featured')}
              </Text>
              <Card
                withBorder
                radius="md"
                shadow="xl"
                className={`${classes.card} ${plan.featured ? classes.featuredCard : ''}`}
              >
                <Card.Section className={classes.imageSection}>
                  <Text size="xl" className={classes.imageText}>
                    {t(`home.cards.planmonthly.${idx}.name`)}
                  </Text>
                </Card.Section>

                <Group justify="space-between" mt="md">
                  <div>
                    <Text fw={500} fz="xl">
                      {t(`home.cards.planmonthly.${idx}.title`)}
                    </Text>
                    <Text fz="sm" c="dimmed">
                      {t(`home.cards.planmonthly.${idx}.description`)}
                    </Text>
                  </div>
                </Group>

                <Card.Section className={classes.section} mt="md">
                  <Badge variant="outline" color="var(--yellow-contia)" mb={10} size="lg">{t(`home.cards.planmonthly.${idx}.tokens`)} Tokens</Badge>
                  <Group gap={8} mb={-8} align="start">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {plan.features.map((feature, index) => (
                        <li key={feature.text + index} className={classes.feature}>
                          <Flex gap="sm" align="center" pb={15}>
                            <ThemeIcon size={34} variant="default" radius="md">
                              <feature.icon size={22} color="var(--yellow-contia)" />
                            </ThemeIcon>
                            <Text fz="sm">{t(`home.cards.planmonthly.${idx}.features.${index}.text`)}</Text>
                          </Flex>
                        </li>
                      ))}
                    </ul>
                  </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                  <Group gap={30}>
                    <div>
                      <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                        {plan.price}
                      </Text>
                      <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                        {t(`home.cards.planmonthly.${idx}.paymentFrequency`)}
                      </Text>
                    </div>

                    <Button
                      component="a"
                      href={
                        plan.link + '?prefilled_email=' + user?.email
                      }
                      target="_blank"
                      radius="xl" 
                      style={{ flex: 1, color: 'var(--text-brown)' }} 
                      color="var(--yellow-contia)"
                    >
                      {t(`home.cards.planmonthly.${idx}.button`)}
                    </Button>
                  </Group>
                </Card.Section>
              </Card>
            </div>
          ))}
        </Flex>
      </Tabs.Panel>

      <Tabs.Panel value="annual" pt="xs">
        <Flex
          mih={50}
          gap="lg"
          justify="center"
          align="start"
          direction="row"
          wrap="wrap"
          pb={30}
          px="sm"
          style={{ zIndex: '1000', position: 'relative' }}
        >
          {annualPlans.map((plan, idx) => (
            <div key={plan.name}>
              <Text size="xl" className={classes.featured} style={{ opacity: plan.featured ? 1 : 0 }}>
                {t('home.cards.featured')}
              </Text>
              <Card
                withBorder
                radius="md"
                shadow="xl"
                className={`${classes.card} ${plan.featured ? classes.featuredCard : ''}`}
              >
                <Card.Section className={classes.imageSection}>
                  <Text size="xl" className={classes.imageText}>
                    {t(`home.cards.planyearly.${idx}.name`)}
                  </Text>
                </Card.Section>

                <Group justify="space-between" mt="md">
                  <div>
                    <Text fw={500} fz="xl">
                      {t(`home.cards.planyearly.${idx}.title`)}
                    </Text>
                    <Text fz="sm" c="dimmed">
                      {t(`home.cards.planyearly.${idx}.description`)}
                    </Text>
                  </div>
                </Group>

                <Card.Section className={classes.section} mt="md">
                   <Badge variant="outline" color="var(--yellow-contia)" mb={10} size="lg">{plan.tokens} Tokens</Badge>
                  <Group gap={8} mb={-8} align="start">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {plan.features.map((feature, index) => (
                        <li key={feature.text + index} className={classes.feature}>
                          <Flex gap="sm" align="center" pb={15}>
                            <ThemeIcon size={34} variant="default" radius="md">
                              <feature.icon size={22} color="var(--yellow-contia)" />
                            </ThemeIcon>
                            <Text fz="sm">{t(`home.cards.planyearly.${idx}.features.${index}.text`)}</Text>
                          </Flex>
                        </li>
                      ))}
                    </ul>
                  </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                  <Group gap={30}>
                    <div>
                      <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                        {plan.price}
                      </Text>
                      <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                        {t(`home.cards.planyearly.${idx}.paymentFrequency`)}
                      </Text>
                    </div>

                    <Button 
                      component="a"
                      href={
                        plan.link + '?prefilled_email=' + user?.email
                      }
                      target="_blank"
                      radius="xl" 
                      style={{ flex: 1, color: 'var(--text-brown)' }} 
                      color="var(--yellow-contia)"
                    >
                      {t(`home.cards.planyearly.${idx}.button`)}
                    </Button>
                  </Group>
                </Card.Section>
              </Card>
            </div>
          ))}
        </Flex>
      </Tabs.Panel>
    </Tabs>
  );
}