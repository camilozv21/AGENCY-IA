"use client";

import { createImageFromForm } from '@/services/openAI/createImageFromForm';
import classes from './Generate.module.css';
import { Center, Flex, Text, Textarea, Button, TextInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { CreateImageFromForm } from '@/types/createImageFromForm.type';
import Image from 'next/image';
import SkeletonImage from './SkeletonImage';
import { useMediaQuery } from '@mantine/hooks';
import { IconDownload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface FormValues {
  prompt: string;
  typeOfBusiness: string;
  typeOfLighting: string;
}

export default function Generate() {
  // Change the state type to an array of CreateImageFromForm
  const [responseImages, setRresponseImages] = useState<CreateImageFromForm[]>([]);
  const [loading, setLoading] = useState(false);
  const issmallScreen = useMediaQuery('(min-width: 768px)');

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    validateInputOnChange: [
      'prompt',
      'typeOfBusiness',
      'typeOfLighting',
    ],
    initialValues: { prompt: '', typeOfBusiness: '', typeOfLighting: '' },
    validate: {
      prompt: (value) =>
        !value ? 'Campo obligatorio' : value.length > 512 ? 'Máximo de caracteres 512' : null,
      typeOfBusiness: (value) =>
        !value ? 'Campo obligatorio' : value.length < 10 ? 'Ingresa mínimo 10 letras' : null,
      // typeOfLighting: (value) =>
      //   !value ? 'Campo obligatorio' : value.length < 10 ? 'Ingresa mínimo 10 letras' : null,
    }
  });

  const handleCreateImage = async (values: FormValues) => {
    const { prompt, typeOfBusiness, typeOfLighting } = values;

    const body = {
      prompt: `Type of business: ${typeOfBusiness}. Type of lighting: ${typeOfLighting}. How the image has to be: ${prompt}`,
    };

    setLoading(true);
    const response = await createImageFromForm(body);
    // Ensure responseImages is always an array
    if (!response.success) {
      notifications.show({
        title: "Error",
        message: response.error || "No se pudo generar las imagenes",
        color: "red",
      });
      setLoading(false);
      return;
    }
    setRresponseImages(
      Array.isArray(response.data) 
        ? response.data.filter((item): item is CreateImageFromForm => item !== undefined) 
        : [response.data].filter((item): item is CreateImageFromForm => item !== undefined)
    );

    notifications.show({
      title: "Éxito",
      message: "Inicio de sesión exitoso",
      color: "green",
    });

    setLoading(false);
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = url.substring(url.lastIndexOf('/') + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Center
        mx={15}
        mb={50}
        mt={50}
        inline={false}
        className={classes.container}
      >
        <Flex direction="column" align="center" justify="center" mb={50}>
          <Text my={30} fw={700} fz={35} component="h1">
            Describe tu negocio y la imagen que quieres crear
          </Text>
          <form
            onSubmit={form.onSubmit((values) => handleCreateImage(values))}
            style={{ width: "100%" }}
          >
            <TextInput
              mb={10}
              withAsterisk
              label={"Tipo de Negocio"}
              placeholder="Tienda de perfumes, relojes, etc."
              key={form.key("typeOfBusiness")}
              {...form.getInputProps("typeOfBusiness")}
            />

            <Select
              mb={10}
              withAsterisk
              label="Tipo de Iluminacion"
              data={[
                { value: "", label: "" },
                { value: "Natural", label: "Natural" },
                { value: "Artificial", label: "Artificial" },
                { value: "Mixto", label: "Mixto" },
              ]}
              key={form.key("typeOfLighting")}
              {...form.getInputProps("typeOfLighting")}
            />

            <Textarea
              mb={10}
              withAsterisk
              w={"100%"}
              label={"Describe la imagen que quieres crear"}
              className={classes.inputArea}
              placeholder="Un reloj de pulsera hiperrealista de lujo de alta gama inspirado en Rolex. El reloj tiene caja de oro, esfera negra con índices dorados y brazalete de metal pulido. La escena muestra el reloj colocado sobre un cojín de terciopelo oscuro, bajo una iluminación suave y cálida que resalta sus superficies brillantes y sus intrincados detalles. El fondo es elegante y minimalista, y evoca un ambiente sofisticado y de calidad. La imagen debe resaltar el lujo, la precisión y la exclusividad."
              key={form.key("prompt")}
              {...form.getInputProps("prompt")}
            />

            <Button
              type="submit"
              mt={10}
              fullWidth
              color="#F3C96B"
              style={{ color: "#1E1E2D" }}
            >
              Generar Imagen
            </Button>
          </form>
        </Flex>

        {loading ? (
          <>
            <Text my={30} fw={700} fz={35}>
              Generando imagen...
            </Text>
            <Flex
              direction={issmallScreen ? "row" : "column"}
              align="center"
              justify="center"
              mb={50}
              w={"100%"}
              gap={20}
              style={{ maxWidth: '1200px' }}
            >
              <SkeletonImage />
              <SkeletonImage />
              <SkeletonImage />
            </Flex>
          </>
        ) : (
          responseImages.length > 0 && (
            <>
              <Text my={30} fw={700} fz={35}>
                ¡Imagenes Generadas!
              </Text>
              <Flex
                direction={issmallScreen ? "row" : "column"}
                align="center"
                justify="center"
                mb={50}
                w={"100%"}
                gap={20}
                style={{ maxWidth: '1200px' }}
              >
                {responseImages.map((image: CreateImageFromForm, index: number) => (
                  image.data?.map((img: { url?: string }, idx: number) => (
                    <div
                      key={`${index}-${idx}`}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <Image
                        priority={true}
                        src={img.url || ""}
                        alt="Generated"
                        width={500}
                        height={500}
                        className={classes.image}
                      />
                      <Button
                        leftSection={<IconDownload />}
                        mt="sm"
                        color="#F3C96B"
                        style={{ color: "#1E1E2D" }}
                        onClick={() => handleDownload(img.url || "")}
                      >
                        Descarga
                      </Button>
                    </div>
                  ))
                ))}
              </Flex>
            </>
          )
        )}
      </Center>
    </>
  );
}