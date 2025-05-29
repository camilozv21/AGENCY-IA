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

export function ChangePassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Validar el token mediante un endpoint dedicado
    async function validateToken() {
      if (!token) {
        setErrorMessage('Token no proveído.');
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
            setErrorMessage('Token inválido o expirado.');
          }
        } else {
          setErrorMessage('Error al validar el token.');
        }
      } catch (error: unknown) {
        setErrorMessage(`Error en la conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
      setLoading(false);
    }
    validateToken();
  }, [token]);

  const handleSubmit = async () => {
    setErrorMessage('');
    if (password !== passwordConfirm) {
      setErrorMessage('Las contraseñas no coinciden.');
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
        setErrorMessage(data.error || 'Error al cambiar la contraseña.');
      }
    } catch (error: unknown) {
      setErrorMessage(`Error en la conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  if (loading) {
    return (
      <Container size={460} my={30}>
        <Text ta="center">Cargando...</Text>
      </Container>
    );
  }

  if (!isValidToken || errorMessage) {
    return (
      <Container size={460} my={30}>
        <Text ta="center" c="red">{errorMessage || 'Token inválido o expirado.'}</Text>
      </Container>
    );
  }

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Cambia tu contraseña
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Introduce tu nueva contraseña
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput 
          label="Nueva contraseña" 
          type="password"
          placeholder="******" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextInput 
          label="Confirmar contraseña" 
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
              <Box ml={5}>Volver al login</Box>
            </Center>
          </Anchor>
          <Button color="yellow" className={classes.control} onClick={handleSubmit}>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
}