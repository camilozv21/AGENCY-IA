'use client';

import { Button, Center, Flex, Textarea } from '@mantine/core';
import classes from './GenerateVideo.module.css';
import SidebarParameters from './SidebarParameters';
import { useState } from 'react';
import { sizesVideo } from '@/utils/aspectsRatio';
import { useForm } from '@mantine/form';
import SkeletonImage from '../Generate/SkeletonImage';
import { IconDownload, IconMovie, IconSparkles } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { generateVideoToVeo2 } from '@/services/Gcloud/generateVideoToPromptVeo2';
import { genereteVideoToPromptAWS } from '@/services/aws/generateVideoFromPrompt';
import { useTranslation } from 'react-i18next';

interface FormValues {
  prompt: string;
  aspectRatio: string;
  image?: string;
  duration: number;
}

export default function GenerateVideo() {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<typeof sizesVideo[0]>(sizesVideo[0]);
  const [menuAspectRatio, setMenuAspectRatio] = useState(false);
  // const [duration, setDuration] = useState(6);
  const [selectedModel, setSelectedModel] = useState('Nova Reel');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [loading, setLoading] = useState(false);
  const [responseVideo, setResponseVideo] = useState<string[]>([]);
  const [responseVideoReel, setResponseVideoReel] = useState<string>();
  const { t } = useTranslation('dashboard');

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: { prompt: '', aspectRatio: selectedAspectRatio.ratio, image: uploadedImage || '', duration: 6 },
    validate: {
      prompt: (value) =>
        !value ? t('dashboard.tool.image.obligatorio') : value.length > 120 ? t('dashboard.tool.video.max120') : null,
    },
  });

  const handleCreateVideoReel = async (values: { prompt: string, duration: number, image?: string }) => {
    setLoading(true);

    try {
      const response = await genereteVideoToPromptAWS({
        prompt: values.prompt,
        duration: 6,
        image: uploadedImage || '',
      });

      setLoading(false);
      setResponseVideoReel(response?.data?.fileName);
    } catch (error: unknown) {
      setLoading(false);
      console.error(t('dashboard.tool.video.errorvideo'), (error as Error).message);
      let errorMessage = t('dashboard.tool.video.errortext');
      if ((error as Error).message.includes('400')) {
        errorMessage = t('dashboard.tool.video.errorvalidacion');
      } else if ((error as Error).message.includes('401')) {
        errorMessage = t('dashboard.tool.video.errorsesion');
      } else if ((error as Error).message.includes('403')) {
        errorMessage = t('dashboard.tool.video.errortokens');
      } else if ((error as Error).message.includes('500')) {
        errorMessage = t('dashboard.tool.video.errorserver');
      }
      console.error(errorMessage);
      
    }
  }

  const handleCreateVideoVeo2 = async (values: { prompt: string, aspectRatio: string, image?: string }) => {
    setLoading(true);
    try {
      const response = await generateVideoToVeo2({
        prompt: values.prompt,
        parameters: {
          aspectRatio: values.aspectRatio,
          sampleCount: 1,
          durationSeconds: 5,
          personGeneration: 'allow_adult',
          enablePromptRewriting: true,
          addWatermark: false,
        },
        image: uploadedImage || '',
        model: selectedModel
      });
  
      const operationId = response.data?.operationId || '';
      if (!operationId) {
        setLoading(false);
        console.error('No se recibió operationId');
        return;
      }
  
      // Polling para verificar si el video ya está listo
      const pollForVideo = async (attempt = 0) => {
        const responseVideo = await handleCheckVideoVeo2(operationId);
        if (responseVideo?.done && responseVideo?.response?.videos?.[0]?.bytesBase64Encoded) {
          setResponseVideo([responseVideo.response.videos[0].bytesBase64Encoded]);
          setLoading(false);
        } else if (responseVideo?.error) {
          setLoading(false);
        } else if (attempt < 10) {
          setTimeout(() => pollForVideo(attempt + 1), 30000); // Intenta cada 30 segundos, máximo 10 veces
        } else {
          setLoading(false);
          console.error('No se pudo generar el video en el tiempo esperado:', responseVideo);
        }
      };
  
      pollForVideo();
    } catch (error) {
      setLoading(false);
      console.error('Error al crear el video:', error);
    }
  };

  const handleCheckVideoVeo2 = async (operationId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/operation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationId: operationId
      }),
    });

    const data = await response.json();

    // console.log('API Response:', data);
    return data;
  }

  const handleDownload = (base64: string, index: number) => {
    const link = document.createElement('a');
    link.href = `data:video/mp4;base64,${base64}`;
    link.download = `video_generado_${index + 1}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Flex className={classes.FlexContainer}>
        <SidebarParameters 
          selectedAspectRatio={selectedAspectRatio}
          setSelectedAspectRatio={setSelectedAspectRatio}
          // duration={duration}
          // setDuration={setDuration}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          menuAspectRatio={menuAspectRatio}
          setMenuAspectRatio={setMenuAspectRatio}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />

        <Center px={15} pb={50} inline={false} className={classes.container}>
          <Flex direction="column" align="center" justify="center" h={'100%'} w={'100%'}>
            <form
              className={classes.form}
              onSubmit={form.onSubmit((values) => selectedModel === 'Veo 2' || selectedModel === 'Veo 3' ? handleCreateVideoVeo2(values) : handleCreateVideoReel(values))}
            >

              <Flex
                direction={isMobile ? "column" : "row"}
                align="center"
                justify="flex-start"
                gap={20}
                style={{ marginBottom: 30, flexWrap: 'wrap' }}
              >
                {loading ? (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: selectedAspectRatio?.ratio || '1 / 1',
                      marginTop: '3rem'
                    }}
                  >
                    <SkeletonImage />
                  </div>
                ) : (
                  <>
                    {/* Renderiza videos Veo 2 */}
                    {responseVideo.length > 0 && (
                      responseVideo.map((base64, index) => (
                        <div
                          key={index}
                          style={{
                            width: '100%',
                            aspectRatio: selectedAspectRatio?.ratio || '1 / 1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '3rem'
                          }}
                        >
                          <video
                            controls
                            src={`data:video/mp4;base64,${base64}`}
                            style={{
                              objectFit: 'cover',
                              width: '100%',
                              height: 'auto',
                              borderRadius: '12px',
                              background: '#000',
                            }}
                            className={classes.image}
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
                      ))
                    )}
              
                    {/* Renderiza video Nova Reel fuera del map */}
                    {selectedModel === 'Nova Reel' && responseVideoReel && (
                      <div
                        style={{
                          width: '100%',
                          aspectRatio: selectedAspectRatio?.ratio || '1 / 1',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginTop: '3rem'
                        }}
                      >
                        <video
                          controls
                          src={responseVideoReel}
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: 'auto',
                            borderRadius: '12px',
                            background: '#000',
                          }}
                          className={classes.image}
                        />
                        <Button
                          leftSection={<IconDownload />}
                          mt="sm"
                          color="var(--yellow-contia)"
                          style={{ color: 'var(--text-brown)' }}
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = responseVideoReel;
                            link.download = `video_nova_reel.mp4`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          {t('dashboard.tool.image.descarga')}
                        </Button>
                      </div>
                    )}
                  </>
                )}
                {responseVideo.length === 0 && !responseVideoReel && !loading && (
                  <IconMovie
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
                  placeholder={t('dashboard.tool.video.quequieres')}
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
                  {t('dashboard.tool.video.generar')}
                </Button>
              </Flex>
            </form>
          </Flex>
        </Center>
      </Flex>
    </>
  )
}
