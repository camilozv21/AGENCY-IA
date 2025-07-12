"use client";

import classes from './Generate.module.css';
import { Center, Flex, Button, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import SkeletonImage from './SkeletonImage';
import { IconDownload, IconPhoto, IconSparkles } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { generateImagesFromFormCanva } from '@/services/aws/generateImageFromFormCanva';
import { camera, iluminations, sizes, styles, typesTask } from '@/utils/aspectsRatio';
import SidebarFilters from './SidebarFilters';
import Image from 'next/image';
import { generateImagesFromFormImageCanva } from '@/services/aws/generateImageFromFormImageCanva';
import { useMediaQuery } from '@mantine/hooks';
import { generateImagen4 } from '@/services/Gcloud/generateVideoToPromptImagen4';
import { Result } from '@/types/createimagefromtextimagen4.type';
import { useTranslation } from 'react-i18next';
import { Carousel } from '@mantine/carousel';

interface FormValues {
  prompt: string;
}

export default function Generate() {
  const [responseImages, setResponseImages] = useState<string[]>([]);
  const [responseImages40, setResponseImages40] = useState<Result>({} as Result);
  const [loading, setLoading] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<typeof sizes[0]>(sizes[0]);
  const [selectedStyles, setSelectedStyles] = useState<typeof styles[0]>();
  const [selectedIlumination, setSelectedIlumination] = useState<typeof iluminations[0]>();
  const [selectedCamera, setSelectedCamera] = useState<typeof camera[0]>();
  const [quantityImages, setQuantityImages] = useState(3);
  const [selectedTypeTask, setSelectedTypeTask] = useState<typeof typesTask[0]>(typesTask[0]);
  const [maskText, setMaskText] = useState<string>('');
  const [menuOpened, setMenuOpened] = useState(false);
  const [menuOpenedStyle, setMenuOpenedStyle] = useState(false);
  const [menuOpenedIlumination, setMenuOpenedIlumination] = useState(false);
  const [menuOpenedCamera, setMenuOpenedCamera] = useState(false);
  const [menuOpenedTypeTask, setMenuOpenedTypeTask] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('Nova Canva');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation('dashboard');

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    validateInputOnChange: ['prompt'],
    initialValues: { prompt: '' },
    validate: {
      prompt: (value) =>
        !value ? t('dashboard.tool.image.obligatorio') : value.length > 512 ? t('dashboard.tool.image.max') : null,
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
        title: t('dashboard.tool.image.error'),
        message: response.error || t('dashboard.tool.image.noimagen'),
        color: "red",
      });
      setResponseImages([]);
      setLoading(false);
      return;
    }

    setResponseImages(response.data?.images || []);

    notifications.show({
      title: t('dashboard.tool.image.exito'),
      message: t('dashboard.tool.image.exitotexto'),
      color: "green",
    });

    setLoading(false);
  };

const handleCreateImageFromImage = async (values: FormValues) => {
  try {
    const { prompt } = values;

    const settings = {
      style: selectedStyles?.name || "realistic",
      aspectRatio: selectedAspectRatio?.ratio || "1:1-lg",
      lighting: selectedIlumination?.type || "none",
      camera: selectedCamera?.type || "none",
      numberOfImages: quantityImages || 1,
      maskPrompt: maskText,
    };

    // 1) Prepara el blob local
    if (!uploadedImage) {
      throw new Error("No image uploaded");
    }
    const blob = await (await fetch(uploadedImage)).blob();

    // 2) Pide signed URL al backend (no envía la imagen, solo JSON pequeño)
    const fileName = `image_${Date.now()}.png`;

    const signedUrlRes = await fetch("/api/s3-get-signed-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName,
        fileType: "image/png",
      }),
    });

    if (!signedUrlRes.ok) {
      throw new Error("No se pudo obtener el signed URL");
    }

    const { signedUrl, publicUrl } = await signedUrlRes.json();

    // 3) Sube la imagen directamente a S3 usando el signed URL
    const uploadRes = await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": "image/png" },
      body: blob,
    });

    if (!uploadRes.ok) {
      throw new Error("No se pudo subir la imagen a S3");
    }

    setLoading(true);

    // 4) Llama a tu API de generación, pasando la URL como imageBase64
    const response = await generateImagesFromFormImageCanva({
      prompt,
      imageBase64: publicUrl, // Aquí pasas la URL, tu API ya la descarga y convierte a base64
      settings,
      typeTask: selectedTypeTask?.type,
      maskPrompt: maskText,
    });

    if (!response.success) {
      notifications.show({
        title: t("dashboard.tool.image.error"),
        message: response.error || t("dashboard.tool.image.noimagen"),
        color: "red",
      });
      setResponseImages([]);
      setLoading(false);
      return;
    }

    setResponseImages(response.data?.images || []);

    notifications.show({
      title: t("dashboard.tool.image.exito"),
      message: t("dashboard.tool.image.exitotexto"),
      color: "green",
    });

    setLoading(false);
  } catch (error: unknown) {
    console.error(error);
    notifications.show({
      title: t("dashboard.tool.image.error"),
      message: (error as Error).message,
      color: "red",
    });
    setLoading(false);
  }
};

  const handleCreateImage40 = async (values: FormValues) => {
    const { prompt } = values;

    const parameters = {
      aspectRatio: selectedAspectRatio?.ratio.replace('-lg', '') || "1:1-lg".replace('-lg', ''),
      sampleCount: quantityImages || 3,
      safetySetting: "block_only_high",
      personGeneration: "allow_adult",
      includeRaiReason: false,
      includeSafetyAttributes: false,
    };

    setLoading(true);

    const response = await generateImagen4({ promptSettings: { prompt, parameters } });

    if (!response.success) {
      notifications.show({
        title: t('dashboard.tool.image.error'),
        message: response.error || t('dashboard.tool.image.noimagen'),
        color: "red",
      });
      setResponseImages([]);
      setLoading(false);
      return;
    }

    setResponseImages40(response.data?.result || {} as Result);

    notifications.show({
      title: t('dashboard.tool.image.exito'),
      message: t('dashboard.tool.image.exitotexto'),
      color: "green",
    });

    setLoading(false);
  }

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
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        maskText={maskText}
        setMaskText={setMaskText}
      />
      <Center px={15} pb={50} inline={false} className={classes.container}>
        <Flex direction="column" align="center" justify="center" h={'100%'} w={'100%'}>
          <form
            className={classes.form}
            onSubmit={form.onSubmit((values) => selectedModel === 'Nova Canva' ? uploadedImage ? handleCreateImageFromImage(values) : handleCreateImage(values) : handleCreateImage40(values))}
          >
            <Flex
              direction={"row"}
              align="center"
              justify="flex-start"
              id='flex-images'
              gap={20}
              style={{ marginBottom: 30, flexWrap: 'wrap', height: '100%', margin: '0 auto', minWidth: isMobile ? '100%' : '300px' }}
            >
              {loading ? (
                // Array.from({ length: quantityImages }).map((_, index) => (
                  <div
                    // key={index}
                    style={{
                      width: '100%',
                      aspectRatio: selectedAspectRatio?.ratio || '1 / 1',
                      marginTop: '3rem',
                      margin: 'auto'
                    }}
                  >
                    <SkeletonImage />
                  </div>
                // ))
              ) : selectedModel === 'Nova Canva' && responseImages.length > 0 ? (
                  <Carousel
                    style={{ position: 'relative', zIndex: 1 }}
                    withControls={true}
                    controlsOffset={0}
                    draggable={true}
                    // slideSize={{ base: '0%', sm: '0%' }}
                    // slideGap={{ base: 'xs', sm: 'sm' }}
                  >
                    {responseImages.map((base64, index) => (
                      <Carousel.Slide key={index}>
                      <div
                        style={{
                          width: '100%',
                          // aspectRatio: selectedAspectRatio?.ratio || '1 / 1',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginTop: '3rem',
                          margin: 'auto'
                        }}
                      >
                        <Image
                          src={`data:image/png;base64,${base64}`}
                          alt="Generated"
                          layout="responsive"
                          width={1}
                          height={1}
                          className={classes.image}
                          style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                        />
                        <Button
                          leftSection={<IconDownload />}
                          mt="sm"
                          color="var(--yellow-contia)"
                          style={{ color: 'var(--text-brown)' }}
                          onClick={() => handleDownload(base64, index)}
                        >
                          {t('dashboard.tool.image.descarga')}
                        </Button>
                      </div>
                      </Carousel.Slide>
                    ))}
                  </Carousel>
              ) : selectedModel === 'image 4.0' && responseImages40?.predictions?.length > 0 ? (
                responseImages40.predictions.map((img, index) => (
                  <div
                    key={index}
                    style={{
                      width: isMobile ? '100%' : `calc(100% / ${quantityImages > 3 ? 3 : quantityImages} - 20px)`,
                      aspectRatio: selectedAspectRatio?.ratio || '1 / 1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginTop: '3rem',
                    }}
                  >
                    <Image
                      src={`data:image/png;base64,${img.bytesBase64Encoded}`}
                      alt="Generated"
                      layout="responsive"
                      width={1}
                      height={1}
                      className={classes.image}
                      style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                    />
                    <Button
                      leftSection={<IconDownload />}
                      mt="sm"
                      color="var(--yellow-contia)"
                      style={{ color: 'var(--text-brown)' }}
                      onClick={() => handleDownload(img.bytesBase64Encoded, index)}
                    >
                      {t('dashboard.tool.image.descarga')}
                    </Button>
                  </div>
                ))
              ) : (
                <IconPhoto
                  className={classes.placeHolder}
                  size={'100%'}
                  stroke={1}
                  color="#575757"
                />
              )}
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
                placeholder={t('dashboard.tool.image.quieresver')}
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
                {t('dashboard.tool.image.generar')}
              </Button>
            </Flex>
          </form>
        </Flex>
      </Center>
    </Flex>
  );
}