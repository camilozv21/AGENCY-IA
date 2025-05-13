"use client";

import classes from './Generate.module.css';
import { Center, Flex, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import SkeletonImage from './SkeletonImage';
import { IconDownload, IconPhoto, IconSparkles } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { generateImagesFromFormCanva } from '@/services/aws/generateImageFromFormCanva';
import { camera, iluminations, sizes, styles } from '@/utils/aspectsRatio';
import SidebarFilters from './SidebarFilters';
import Image from 'next/image';

interface FormValues {
  prompt: string;
}

export default function Generate() {
  const [responseImages, setResponseImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<typeof sizes[0]>(sizes[0]);
  const [selectedStyles, setSelectedStyles] = useState<typeof styles[0]>();
  const [selectedIlumination, setSelectedIlumination] = useState<typeof iluminations[0]>();
  const [selectedCamera, setSelectedCamera] = useState<typeof camera[0]>();
  const [menuOpened, setMenuOpened] = useState(false);
  const [menuOpenedStyle, setMenuOpenedStyle] = useState(false);
  const [menuOpenedIlumination, setMenuOpenedIlumination] = useState(false);
  const [menuOpenedCamera, setMenuOpenedCamera] = useState(false);

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    validateInputOnChange: ['prompt'],
    initialValues: { prompt: '' },
    validate: {
      prompt: (value) =>
        !value ? 'Campo obligatorio' : value.length > 512 ? 'Máximo de caracteres 512' : null,
    },
  });

  const handleCreateImage = async (values: FormValues) => {
    const { prompt } = values;
    const settings = {
        style: selectedStyles?.name || "realistic",
        aspectRatio: selectedAspectRatio?.ratio || "1:1-lg",
        lighting: selectedIlumination?.type || "none",
        camera: selectedCamera?.type || "none",
        numberOfImages: 1,
      };

    setLoading(true);
    const response = await generateImagesFromFormCanva({prompt, settings});

    if (!response.success) {
      notifications.show({
        title: "Error",
        message: response.error || "No se pudo generar las imágenes",
        color: "red",
      });
      setResponseImages([]);
      setLoading(false);
      return;
    }

    setResponseImages(response.data?.images || []);

    notifications.show({
      title: "Éxito",
      message: "Imágenes generadas exitosamente",
      color: "green",
    });

    setLoading(false);
  };

  const handleDownload = (base64: string, index: number) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64}`;
    link.download = `image-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Flex>
      <SidebarFilters
        selectedAspectRatio={selectedAspectRatio}
        setSelectedAspectRatio={setSelectedAspectRatio}
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
        selectedIlumination={selectedIlumination}
        setSelectedIlumination={setSelectedIlumination}
        selectedCamera={selectedCamera}
        setSelectedCamera={setSelectedCamera}
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        menuOpenedStyle={menuOpenedStyle}
        setMenuOpenedStyle={setMenuOpenedStyle}
        menuOpenedIlumination={menuOpenedIlumination}
        setMenuOpenedIlumination={setMenuOpenedIlumination}
        menuOpenedCamera={menuOpenedCamera}
        setMenuOpenedCamera={setMenuOpenedCamera}
      />
      <Center px={15} pb={50} inline={false} className={classes.container}>
        <Flex direction="column" align="center" justify="center" h={'100%'} w={'100%'}>
          <form
            className={classes.form}
            onSubmit={form.onSubmit((values) => handleCreateImage(values))}
          >
            {loading ? (
              <Flex
                direction="row"
                align="center"
                justify="center"
                gap={20}
                my={30}
              >
                <SkeletonImage />
                <SkeletonImage />
                <SkeletonImage />
              </Flex>
            ) : responseImages.length > 0 ? (
              <Flex
                direction="row"
                align="center"
                justify="center"
                gap={20}
                style={{ marginBottom: 30 }}
              >
                {responseImages.map((base64, index) => (
                  <div
                    key={index}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <Image
                      src={`data:image/png;base64,${base64}`}
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
                      onClick={() => handleDownload(base64, index)}
                    >
                      Descarga
                    </Button>
                  </div>
                ))}
              </Flex>
            ) : (
              <IconPhoto className={classes.placeHolder} size={'100%'} stroke={1} color='#575757' />
            )}

            <TextInput
              className={classes.input}
              size="lg"
              placeholder="¿Qué quieres ver en la imagen?"
              rightSectionWidth={42}
              leftSection={<IconSparkles size={18} stroke={1.5} color='#FFFFFF' />}
              rightSection={
                <Button
                  type="submit"
                  color="#7438FF"
                  size="sm"
                  style={{ color: "#FFFFFF", marginRight: 6 }}
                >
                  Generar Imagen
                </Button>
              }
              rightSectionProps={{ style: { width: 'auto' } }}
              {...form.getInputProps('prompt')}
              key={form.key('prompt')}
            />
          </form>
        </Flex>
      </Center>
    </Flex>
  );
}