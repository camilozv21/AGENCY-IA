'use client';

import {
  TextInput,
  Textarea,
  Button,
  Group,
  Box,
  Select,
  Notification,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';

export function SupportForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      issueType: '',
      message: '',
    },

    validateInputOnChange: true,

    validate: {
      name: (value) => (value.length < 2 ? 'Tu nombre es muy corto' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Correo inválido'),
      issueType: (value) => (value ? null : 'Selecciona un tipo de problema'),
      message: (value) =>
        value.length < 10 ? 'Describe el problema con más detalle' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const subjectMap: Record<string, string> = {
      generacion: 'Problemas con generación de contenido',
      pago: 'Problemas con el pago o suscripción',
      rendimiento: 'La app funciona lento o mal',
      otro: 'Otro tipo de error',
    };

    const payload = {
      to: 'contia@contia.io',
      subject: `Soporte - ${subjectMap[values.issueType] || 'Otro'}`,
      message: `
        <p><strong>Nombre:</strong> ${values.name}</p>
        <p><strong>Correo:</strong> ${values.email}</p>
        <p><strong>Tipo de problema:</strong> ${subjectMap[values.issueType]}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${values.message.replace(/\n/g, '<br />')}</p>
      `,
    };

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess('Tu solicitud ha sido enviada con éxito.');
        form.reset();
      } else {
        setError('Hubo un error al enviar el formulario. Inténtalo más tarde.');
      }
    } catch (err: unknown) {
      setError((err as Error).message + 'Error de red al enviar el formulario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maw={500} mx="auto" mt="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Nombre"
          placeholder="John Doe"
          {...form.getInputProps('name')}
        />

        <TextInput
          withAsterisk
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          mt="md"
          {...form.getInputProps('email')}
        />

        <Select
          label="Tipo de problema"
          placeholder="Selecciona una opción"
          mt="md"
          data={[
            { value: 'generacion', label: 'Problemas con generación de contenido' },
            { value: 'pago', label: 'Problemas con el pago o suscripción' },
            { value: 'rendimiento', label: 'La app funciona lento o mal' },
            { value: 'otro', label: 'Otro tipo de error' },
          ]}
          {...form.getInputProps('issueType')}
        />

        <Textarea
          withAsterisk
          label="Descripción del problema"
          placeholder="Cuéntanos qué ocurrió, cuándo, y si puedes cómo replicarlo..."
          mt="md"
          minRows={4}
          autosize
          {...form.getInputProps('message')}
        />

        <Group mt="xl">
          <Button
            type="submit"
            loading={loading}
            color="var(--yellow-contia)"
            style={{ color: 'var(--text-brown)' }}
          >
            Enviar solicitud
          </Button>
        </Group>

        {success && (
          <Notification
            icon={<IconCheck size={18} />}
            color="teal"
            title="Enviado"
            mt="lg"
          >
            {success}
          </Notification>
        )}

        {error && (
          <Notification
            icon={<IconX size={18} />}
            color="red"
            title="Error"
            mt="lg"
          >
            {error}
          </Notification>
        )}
      </form>
    </Box>
  );
}
