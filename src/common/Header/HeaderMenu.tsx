'use client';

import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
  IconUser,
} from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Group,
  HoverCard,
  Menu,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMenu.module.css';
import Image from 'next/image';
import { LanguagePicker } from './LanguagePicker';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const pathname = usePathname();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={'var(--yellow-contia)'} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  if (pathname.includes('dashboard/tool/text-to-image')) return null;

  return (
    <Box style={{ zIndex: 100, position: 'relative' }}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href='/'>
            <picture>
              <source
                media="(min-width: 600px)"
                srcSet="https://df50lbm4qcrt6.cloudfront.net/logonobg.png"
              />
                <Image
                  src="https://df50lbm4qcrt6.cloudfront.net/logonobg.png"
                  alt="carson logo"
                  width={97} 
                  height={32} 
                  priority
                />
            </picture>
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Link href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Paquetes
                    </Box>
                    <IconChevronDown size={16} color={'var(--yellow-contia)'} />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs" style={{ color: 'var(--yellow-contia)'}}>
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default" color='var(--yellow-contia)'>Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href="#" className={classes.link}>
              Contactanos
            </Link>
            <Link href="#" className={classes.link}>
              Soporte
            </Link>

            <Group visibleFrom="sm" gap={0}>
              {/* <Link href='/cart'>
                <Indicator id='indicator-cart' inline label="1" size={16} color='var(--text-brown)' className={classes.indicatorContainer}>
                  <IconShoppingCart size={25} color="var(--yellow-contia)" />
                </Indicator>
              </Link> */}
              {/* <Button variant="default" component='div'>
                <Link href='/auth/login'>
                  Log in
                </Link>
              </Button>
              <Button color='var(--yellow-contia)' style={{ color: 'var(--text-brown)'}} component='div'>
                <Link href='/auth/signup'>
                  Registrate
                </Link>
              </Button> */}
              <LanguagePicker />
              <Menu radius="md" width="auto" withinPortal={false}>
                <Menu.Target>
                  <UnstyledButton className={classes.control}>
                    <Flex gap="xs" align="center">
                      <IconUser stroke={2} />
                      <IconChevronDown size={16} stroke={1.5} className={classes.icon} />
                    </Flex>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component="a" href="/auth/login">
                    Log in
                  </Menu.Item>
                  <Menu.Item component="a" href="/auth/signup">
                    Registrate
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" component='div'>
              <Link href='/auth/login'>
                Log in
              </Link>
            </Button>
            <Button>Sign up</Button>
            <LanguagePicker />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}