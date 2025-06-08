"use client";

import { Button, Card, Flex, Group, Text, ThemeIcon, Tabs } from '@mantine/core';
import classes from './CardsPlans.module.css';
import { plansData } from '@/utils/plans';
import { useAppSelector } from '@/lib/hooks';

export function CardsPlans() {
  const monthlyPlans = plansData.filter(plan => plan.duration === '/month');
  const annualPlans = plansData.filter(plan => plan.duration === '/year');
  // const [plan, setPlan] = useState<typeof monthlyPlans[0] | typeof annualPlans[0]>();
  const user = useAppSelector((state) => state.user.data);

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
        <Tabs.Tab value="monthly">Mensual</Tabs.Tab>
        <Tabs.Tab value="annual">Anual</Tabs.Tab>
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
          {monthlyPlans.map((plan) => (
            <div key={plan.name}>
              <Text size="xl" className={classes.featured} style={{ opacity: plan.featured ? 1 : 0 }}>
                Featured Plan
              </Text>
              <Card
                withBorder
                radius="md"
                shadow="xl"
                className={`${classes.card} ${plan.featured ? classes.featuredCard : ''}`}
              >
                <Card.Section className={classes.imageSection}>
                  <Text size="xl" className={classes.imageText}>
                    {plan.name}
                  </Text>
                </Card.Section>

                <Group justify="space-between" mt="md">
                  <div>
                    <Text fw={500} fz="xl">
                      {plan.title}
                    </Text>
                    <Text fz="sm" c="dimmed">
                      {plan.description}
                    </Text>
                  </div>
                </Group>

                <Card.Section className={classes.section} mt="md">
                  <Group gap={8} mb={-8} align="start">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {plan.features.map((feature, index) => (
                        <li key={feature.text + index} className={classes.feature}>
                          <Flex gap="sm" align="center" pb={15}>
                            <ThemeIcon size={34} variant="default" radius="md">
                              <feature.icon size={22} color="var(--yellow-contia)" />
                            </ThemeIcon>
                            <Text fz="sm">{feature.text}</Text>
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
                        {plan.paymentFrequency}
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
                      {plan.button}
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
          {annualPlans.map((plan) => (
            <div key={plan.name}>
              <Text size="xl" className={classes.featured} style={{ opacity: plan.featured ? 1 : 0 }}>
                Featured Plan
              </Text>
              <Card
                withBorder
                radius="md"
                shadow="xl"
                className={`${classes.card} ${plan.featured ? classes.featuredCard : ''}`}
              >
                <Card.Section className={classes.imageSection}>
                  <Text size="xl" className={classes.imageText}>
                    {plan.name}
                  </Text>
                </Card.Section>

                <Group justify="space-between" mt="md">
                  <div>
                    <Text fw={500} fz="xl">
                      {plan.title}
                    </Text>
                    <Text fz="sm" c="dimmed">
                      {plan.description}
                    </Text>
                  </div>
                </Group>

                <Card.Section className={classes.section} mt="md">
                  <Group gap={8} mb={-8} align="start">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {plan.features.map((feature, index) => (
                        <li key={feature.text + index} className={classes.feature}>
                          <Flex gap="sm" align="center" pb={15}>
                            <ThemeIcon size={34} variant="default" radius="md">
                              <feature.icon size={22} color="var(--yellow-contia)" />
                            </ThemeIcon>
                            <Text fz="sm">{feature.text}</Text>
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
                        {plan.paymentFrequency}
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
                      {plan.button}
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