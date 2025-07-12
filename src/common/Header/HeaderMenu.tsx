'use client';

import {
  IconChevronDown,
  IconUser,
} from '@tabler/icons-react';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Menu,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMenu.module.css';
import Image from 'next/image';
import { LanguagePicker } from './LanguagePicker';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoogleActions } from '@/modules/auth/Signup/googleAction';
import { useTranslation } from 'react-i18next';
import ShowTokens from '../ShowTokens/ShowTokens';

// const mockdata = [
//   {
//     icon: IconCode,
//     title: 'Open source',
//     description: 'This Pokémon’s cry is very loud and distracting',
//   },
//   {
//     icon: IconCoin,
//     title: 'Free for everyone',
//     description: 'The fluid of Smeargle’s tail secretions changes',
//   },
//   {
//     icon: IconBook,
//     title: 'Documentation',
//     description: 'Yanma is capable of seeing 360 degrees without',
//   },
//   {
//     icon: IconFingerprint,
//     title: 'Security',
//     description: 'The shell’s rounded shape and the grooves on its.',
//   },
//   {
//     icon: IconChartPie3,
//     title: 'Analytics',
//     description: 'This Pokémon uses its flying ability to quickly chase',
//   },
//   {
//     icon: IconNotification,
//     title: 'Notifications',
//     description: 'Combusken battles with the intensely hot flames it spews',
//   },
// ];

export function HeaderMenu({ user }: { user?: { email: string, name: string, image: string } }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { i18n, t } = useTranslation();
  // const theme = useMantineTheme();
  const pathname = usePathname();
  // const user = useAppSelector((state) => state.user.data);

  // const links = mockdata.map((item) => (
  //   <UnstyledButton className={classes.subLink} key={item.title}>
  //     <Group wrap="nowrap" align="flex-start">
  //       <ThemeIcon size={34} variant="default" radius="md">
  //         <item.icon size={22} color={'var(--yellow-contia)'} />
  //       </ThemeIcon>
  //       <div>
  //         <Text size="sm" fw={500}>
  //           {item.title}
  //         </Text>
  //         <Text size="xs" c="dimmed">
  //           {item.description}
  //         </Text>
  //       </div>
  //     </Group>
  //   </UnstyledButton>
  // ));

  if (pathname.includes('dashboard/tool/text-to-image')) return null;
  if (pathname.includes('dashboard/tool/text-to-video')) return null;

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
            {/* <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
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
            </HoverCard> */}
            {/* <Link href="#" className={classes.link}>
              Contactanos
            </Link> */}
            <Link href={`${i18n.language === 'es' ? '/about/support' : '/en/about/support'}`} className={classes.link}>
              {t('header.soporte')}
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
              <ShowTokens />
              <Menu radius="md" width={220} withinPortal={false}>
                <Menu.Target>
                  <UnstyledButton className={classes.control}>
                    <Flex gap="xs" align="center">
                      {user ? (
                        <Image
                          src={user.image || 'https://df50lbm4qcrt6.cloudfront.net/contia_logo_circle.png'}
                          alt="User Avatar"
                          width={32}
                          height={32}
                          style={{ borderRadius: '50%' }}
                        />
                      ) : (
                        <IconUser stroke={2} />
                      )}
                      <IconChevronDown size={16} stroke={1.5} className={classes.icon} />
                    </Flex>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Group align="center" gap="xs" mb="xs" style={{ padding: 8 }}>
                    {user ? (
                      <>
                        <Image
                          src={user.image || 'https://df50lbm4qcrt6.cloudfront.net/contia_logo_circle.png'}
                          alt="User Avatar"
                          width={32}
                          height={32}
                          style={{ borderRadius: '50%' }}
                        />
                        <Text fw={500} size="sm">{user.name}</Text>
                      </>
                    ) : (
                      <>
                        <IconUser stroke={2} />
                        <Text fw={500} size="sm">{t('header.invitado')}</Text>
                      </>
                    )}
                  </Group>
                  <Divider my="xs" />
                  {!user && (
                    <>
                      <Menu.Item component={Link} href="/auth/login">
                        {t('header.iniciarsesion')}
                      </Menu.Item>
                      <Menu.Item component={Link} href="/auth/signup">
                        {t('header.registrarse')}
                      </Menu.Item>
                    </>
                  )}
                  {user && (
                    <>
                      <Menu.Item
                        component="a"
                        target="_blank"
                        href={
                          process.env.NODE_ENV === 'development'
                            ? "https://billing.stripe.com/p/login/test_3cI5kDaku3y7gFbbYggEg00" + '?prefilled_email=' + user?.email
                            : "https://billing.stripe.com/p/login/3cI5kDaku3y7gFbbYggEg00" + '?prefilled_email=' + user?.email
                        }
                      >
                        {t('header.portalusuario')}
                      </Menu.Item>
                      <Menu.Item component="div">
                        <form action={GoogleActions}>
                          <UnstyledButton type="submit" style={{ width: '100%', color: 'var(--mantine-color-red-7)' }}>
                            {t('header.cerrarsesion')}
                          </UnstyledButton>
                        </form>
                      </Menu.Item>
                    </>
                  )}
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
      <Divider />
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
          {/* User section for mobile */}
          <Group justify="center" align="center" mb="md">
            <Flex gap="xs" align="center">
              {user ? (
                <Image
                  src={user.image || 'https://df50lbm4qcrt6.cloudfront.net/contia_logo_circle.png'}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  style={{ borderRadius: '50%' }}
                />
              ) : (
                <IconUser stroke={2} />
              )}
              <Text fw={500}>{user ? user.name : 'Invitado'}</Text>
            </Flex>
          </Group>
          <Group justify="center" grow pb="xl" px="md" mb="md">
            {!user && (
              <>
                <Button
                  variant="default"
                  component={Link}
                  href="/auth/login"
                  fullWidth
                  onClick={closeDrawer}
                >
                  Log in
                </Button>
                <Button
                  color='var(--yellow-contia)'
                  style={{ color: 'var(--text-brown)'}}
                  component={Link}
                  href="/auth/signup"
                  fullWidth
                  onClick={closeDrawer}
                >
                  Registrate
                </Button>
              </>
            )}
            {user && (
              <>
                <div style={{ maxWidth: '200px', margin: '0 auto' }}>
                  <ShowTokens />
                </div>
                <Button
                  variant="default"
                  component="a"
                  target="_blank"
                  href={
                    process.env.NODE_ENV === 'development'
                      ? "https://billing.stripe.com/p/login/test_3cI5kDaku3y7gFbbYggEg00" + '?prefilled_email=' + user?.email
                      : "https://billing.stripe.com/p/login/3cI5kDaku3y7gFbbYggEg00" + '?prefilled_email=' + user?.email
                  }
                  fullWidth
                  onClick={closeDrawer}
                >
                  Portal de usuario
                </Button>
                <form action={GoogleActions} style={{ width: '100%' }} onSubmit={closeDrawer}>
                  <Button type="submit" variant="outline" color="red" fullWidth>
                    Cerrar sesión
                  </Button>
                </form>
              </>
            )}
          </Group>
          <Divider my="sm" />

          <Link href="#" className={classes.link} onClick={closeDrawer}>
            Home
          </Link>
          {/* <UnstyledButton className={classes.link} onClick={() => { toggleLinks(); }}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton> */}
          {/* <Collapse in={linksOpened}>
            {mockdata.map((item) => (
              <UnstyledButton
                className={classes.subLink}
                key={item.title}
                onClick={closeDrawer}
              >
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
            ))}
          </Collapse> */}
          <Link href={`${i18n.language === 'es' ? '/about/support' : '/en/about/support'}`} className={classes.link}>
            Soporte
          </Link>
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <LanguagePicker />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}