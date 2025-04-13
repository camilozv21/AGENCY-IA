import { Button, Card, Flex, Group, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import classes from './CardsPlans.module.css';
import { plansData } from '@/utils/plans';

export function CardsPlans() {
  const theme = useMantineTheme();

  return (
    <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      gap="lg"
      justify="center"
      align="start"
      direction="row"
      wrap="wrap"
      pt={30}
      pb={30}
      px='sm'
    >
      {plansData.map((plan) => (
        <div key={plan.name}>
          <Text size='xl' className={classes.featured} style={{ opacity: plan.featured ? 1 : 0 }}>
            Featured Plan
          </Text>
          <Card
            withBorder
            radius="md"
            className={`${classes.card} ${plan.featured ? classes.featuredCard : ''}`}
          >
            <Card.Section className={classes.imageSection}>
              <Text size='xl' className={classes.imageText}>{plan.name}</Text>
            </Card.Section>

            <Group justify="space-between" mt="md">
              <div>
                <Text fw={500} fz="xl">{plan.title}</Text>
                <Text fz="sm" c="dimmed">
                  {plan.description}
                </Text>
              </div>
              {/* <Badge variant="outline">25% off</Badge> */}
            </Group>

            <Card.Section className={classes.section} mt="md">
              {/* <Text fz="sm" c="dimmed" className={classes.label}>
                Basic configuration
              </Text> */}

              <Group gap={8} mb={-8} align='start'>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {plan.features.map((feature, index) => (
                    <li key={feature.text + index} className={classes.feature}>
                      <Flex gap='sm' align='center' pb={15}>
                        <ThemeIcon size={34} variant="default" radius="md">
                          <feature.icon size={22} color={theme.colors.violet[6]} />
                        </ThemeIcon>
                        <Text fz='sm'>{feature.text}</Text>
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

                <Button radius="xl" style={{ flex: 1 }} color="violet">
                  {plan.button}
                </Button>
              </Group>
            </Card.Section>
          </Card>
        </div>
      ))}
    </Flex>
  );
}