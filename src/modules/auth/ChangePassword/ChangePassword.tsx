"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';
import {
    Anchor,
    Box,
    Button,
    Center,
    Container,
    Group,
    Paper,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import classes from './ChangePassword.module.css';
import { useTranslation } from 'react-i18next';

export function ChangePassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const { t } = useTranslation('auth');

  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Validar el token mediante un endpoint dedicado
    async function validateToken() {
      if (!token) {
        setErrorMessage(t('auth.changepassword.token'));
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/validate-reset-token?token=${token}`);
        if (res.ok) {
          const data = await res.json();
          if (data.valid) {
            setIsValidToken(true);
          } else {
            setErrorMessage(t('auth.changepassword.tokenexpirado'));
          }
        } else {
          setErrorMessage(t('auth.changepassword.tokenvalidar'));
        }
      } catch (error: unknown) {
        setErrorMessage(`${t('auth.changepassword.errorconexion')} ${error instanceof Error ? error.message : t('auth.changepassword.errordesconocido')}`);
      }
      setLoading(false);
    }
    validateToken();
  }, [token]);

  const handleSubmit = async () => {
    setErrorMessage('');
    if (password !== passwordConfirm) {
      setErrorMessage(t('auth.changepassword.passcoincide'));
      return;
    }
    // Enviar la nueva contraseña junto con el token para actualizar la contraseña del usuario
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        // Redireccionar al iniciar sesión tras el cambio exitoso
        router.push('/auth/login');
      } else {
        const data = await res.json();
        setErrorMessage(data.error || t('auth.changepassword.passcambiar'));
      }
    } catch (error: unknown) {
      setErrorMessage(`${t('auth.changepassword.errorconexion')} ${error instanceof Error ? error.message : t('auth.changepassword.errordesconocido')}`);
    }
  };

  if (loading) {
    return (
      <Container size={460} my={30}>
        <Text ta="center">{t('auth.changepassword.cargando')}</Text>
      </Container>
    );
  }

  if (!isValidToken || errorMessage) {
    return (
      <Container size={460} my={30}>
        <Text ta="center" c="red">{errorMessage || t('auth.changepassword.tokenexpirado')}</Text>
      </Container>
    );
  }

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        {t('auth.changepassword.cambia')}
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        {t('auth.changepassword.introduce')}
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput 
          label={t('auth.changepassword.nueva')} 
          type="password"
          placeholder="******" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextInput 
          label={t('auth.changepassword.confirmar')} 
          type="password"
          placeholder="******" 
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          mt="md"
        />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control} onClick={() => router.push('/login')}>
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} color="var(--yellow-contia)" />
              <Box ml={5}>{t('auth.changepassword.volver')}</Box>
            </Center>
          </Anchor>
          <Button color="var(--yellow-contia)" className={classes.control} onClick={handleSubmit}>{t('auth.changepassword.restablecer')}</Button>
        </Group>
      </Paper>
    </Container>
  );
}