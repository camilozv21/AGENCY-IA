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
import { useTranslation } from 'react-i18next';
export function SupportForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation('supportform');
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      issueType: '',
      message: '',
    },

    validateInputOnChange: true,

    validate: {
      name: (value) => (value.length < 2 ? t('supportform.listitem1') : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('supportform.listitem2')),
      issueType: (value) => (value ? null : t('supportform.listitem3') ),
      message: (value) =>
        value.length < 10 ? t('supportform.listitem4')  : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const subjectMap: Record<string, string> = {
      generacion: t('supportform.listitem5') ,
      pago: t('supportform.listitem6'),
      rendimiento: t('supportform.listitem7'),
      otro: t('supportform.listitem8'),
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
        setSuccess( t('supportform.listitem9'));
        form.reset();
      } else {
        setError( t('supportform.listitem10'));
      }
    } catch (err: unknown) {
      setError((err as Error).message +  t('supportform.listitem11'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maw={500} mx="auto" mt="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label= {t('supportform.listitem12')}
          placeholder="John Doe"
          {...form.getInputProps('name')}
        />

        <TextInput
          withAsterisk
          label={t('supportform.listitem13')}
          placeholder={t('supportform.listitem14')}
          mt="md"
          {...form.getInputProps('email')}
        />

        <Select
          label={t('supportform.listitem15')}
          placeholder={t('supportform.listitem16')}
          mt="md"
          data={[
            { value: 'generacion', label: t('supportform.listitem17')},
            { value: 'pago', label: t('supportform.listitem18')},
            { value: 'rendimiento', label: t('supportform.listitem19')},
            { value: 'otro', label: t('supportform.listitem20')},
          ]}
          {...form.getInputProps('issueType')}
        />

        <Textarea
          withAsterisk
          label={t('supportform.listitem21')}
          placeholder={t('supportform.listitem22')}
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
           {t('supportform.listitem25')} 
          </Button>
        </Group>

        {success && (
          <Notification
            icon={<IconCheck size={18} />}
            color="teal"
            title={t('supportform.listitem23')}
            mt="lg"
          >
            {success}
          </Notification>
        )}

        {error && (
          <Notification
            icon={<IconX size={18} />}
            color="red"
            title={t('supportform.listitem24')}
            mt="lg"
          >
            {error}
          </Notification>
        )}
      </form>
    </Box>
  );
}
