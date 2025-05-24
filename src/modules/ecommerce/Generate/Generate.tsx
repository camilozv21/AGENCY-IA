"use client";

import classes from './Generate.module.css';
import { Center, Flex, Button, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import SkeletonImage from './SkeletonImage';
import { IconDownload, IconPhoto, IconSparkles } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { generateImagesFromFormCanva } from '@/services/aws/generateImageFromFormCanva';
import { camera, iluminations, sizes, styles } from '@/utils/aspectsRatio';
import SidebarFilters from './SidebarFilters';
import Image from 'next/image';
import { generateImagesFromFormImageCanva } from '@/services/aws/generateImageFromFormImageCanva';
import { useMediaQuery } from '@mantine/hooks';

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
  const [quantityImages, setQuantityImages] = useState(3);
  const [selectedTypeTask, setSelectedTypeTask] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);
  const [menuOpenedStyle, setMenuOpenedStyle] = useState(false);
  const [menuOpenedIlumination, setMenuOpenedIlumination] = useState(false);
  const [menuOpenedCamera, setMenuOpenedCamera] = useState(false);
  const [menuOpenedTypeTask, setMenuOpenedTypeTask] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

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
        numberOfImages: quantityImages || 3,
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

  const handleCreateImageFromImage = async (values: FormValues) => {
    const { prompt } = values;
    const settings = {
        style: selectedStyles?.name || "realistic",
        aspectRatio: selectedAspectRatio?.ratio || "1:1-lg",
        lighting: selectedIlumination?.type || "none",
        camera: selectedCamera?.type || "none",
        numberOfImages: quantityImages || 3,
      };
    const imageBase64 = uploadedImage || '';

    setLoading(true);
    const response = await generateImagesFromFormImageCanva({prompt, imageBase64, settings});

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
    <Flex className={classes.flexContainer}>
      <SidebarFilters
        selectedAspectRatio={selectedAspectRatio}
        setSelectedAspectRatio={setSelectedAspectRatio}
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
        selectedIlumination={selectedIlumination}
        setSelectedIlumination={setSelectedIlumination}
        selectedCamera={selectedCamera}
        setSelectedCamera={setSelectedCamera}
        setQuantityImages={setQuantityImages}
        quantityImages={quantityImages}
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        menuOpenedStyle={menuOpenedStyle}
        setMenuOpenedStyle={setMenuOpenedStyle}
        menuOpenedIlumination={menuOpenedIlumination}
        setMenuOpenedIlumination={setMenuOpenedIlumination}
        menuOpenedCamera={menuOpenedCamera}
        setMenuOpenedCamera={setMenuOpenedCamera}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        setSelectedTypeTask={setSelectedTypeTask}
        selectedTypeTask={selectedTypeTask}
        menuOpenedTypeTask={menuOpenedTypeTask}
        setMenuOpenedTypeTask={setMenuOpenedTypeTask}
      />
      <Center px={15} pb={50} inline={false} className={classes.container}>
        <Flex direction="column" align="center" justify="center" h={'100%'} w={'100%'}>
          <form
            className={classes.form}
            onSubmit={form.onSubmit((values) => uploadedImage ? handleCreateImageFromImage(values) : handleCreateImage(values))}
          >
            <Flex
              direction={isMobile ? "column" : "row"}
              align="center"
              justify="flex-start"
              gap={20}
              style={{ marginBottom: 30, flexWrap: 'wrap' }}
            >
              {loading
                ? // Render skeletons based on quantityImages
                  Array.from({ length: quantityImages }).map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: isMobile ? '100%' : `calc(100% / ${quantityImages > 3 ? 3 : quantityImages} - 20px)`,
                        aspectRatio: selectedAspectRatio?.ratio || '1 / 1',
                        marginTop: '3rem'
                      }}
                    >
                      <SkeletonImage />
                    </div>
                  ))
                : // Render images if available
                  responseImages.length > 0
                  ? responseImages.map((base64, index) => (
                      <div
                        key={index}
                        style={{
                          width: isMobile ? '100%' : `calc(100% / ${quantityImages > 3 ? 3 : quantityImages} - 20px)`,
                          aspectRatio: selectedAspectRatio?.ratio || '1 / 1',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginTop: '3rem'
                        }}
                      >
                        <Image
                          src={`data:image/png;base64,${base64}`}
                          alt="Generated"
                          layout="responsive"
                          width={1}
                          height={1}
                          className={classes.image}
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: 'auto',
                          }}
                        />
                        <Button
                          leftSection={<IconDownload />}
                          mt="sm"
                          color="var(--yellow-contia)"
                          style={{ color: 'var(--text-brown)' }}
                          onClick={() => handleDownload(base64, index)}
                        >
                          Descarga
                        </Button>
                      </div>
                    ))
                  : // Render placeholder if no images and not loading
                    <IconPhoto
                      className={classes.placeHolder}
                      size={'100%'}
                      stroke={1}
                      color="#575757"
                    />
              }
            </Flex>
      
            <Flex
              direction={isMobile ? 'column' : 'row'}
              align="center"
              justify="center"
              gap={5}
              className={classes.inputContainer}
            >
              <Textarea
                className={classes.input}
                size="lg"
                autosize
                placeholder="¿Qué quieres ver en la imagen?"
                rightSectionWidth={42}
                leftSection={<IconSparkles size={18} stroke={1.5} color="#FFFFFF" />}
                rightSectionProps={{ style: { width: 'auto' } }}
                {...form.getInputProps('prompt')}
                key={form.key('prompt')}
              />
              <Button
                type="submit"
                color="#7438FF"
                size="sm"
                style={{ color: '#FFFFFF', maxWidth: '700px' }}
                className={classes.button}
              >
                Generar Imagen
              </Button>
            </Flex>
          </form>
        </Flex>
      </Center>
    </Flex>
  );
}