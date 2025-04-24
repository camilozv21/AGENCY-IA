"use client";

import React, { useState } from 'react';
import classes from './Generate.module.css';
import { Center, Flex, Text, Textarea, Button, Modal } from '@mantine/core';
import Image from 'next/image';

export default function Generate() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const handleGenerateImage = async () => {
    // Simulación de llamada a la API
    const generatedImageUrl = "https://i.imgur.com/18CcHAB.png"; // Reemplazar con la URL generada por la API
    setImageUrl(generatedImageUrl);
    setModalOpened(true);
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated-image.png';
      link.click();
    }
  };

  return (
    <>
      <Center>
        <Flex direction="column" align="center" justify="center">
          <Text my={30} fw={700} fz={35} component="h1">
            Describe tu negocio y la imagen que quieres crear
          </Text>
          <Textarea
            w={'100%'}
            className={classes.inputArea}
            placeholder="Un reloj de pulsera hiperrealista de lujo de alta gama inspirado en Rolex. El reloj tiene caja de oro, esfera negra con índices dorados y brazalete de metal pulido. La escena muestra el reloj colocado sobre un cojín de terciopelo oscuro, bajo una iluminación suave y cálida que resalta sus superficies brillantes y sus intrincados detalles. El fondo es elegante y minimalista, y evoca un ambiente sofisticado y de calidad. La imagen debe resaltar el lujo, la precisión y la exclusividad."
          />
          <Button mt={10} onClick={handleGenerateImage} fullWidth color='#F3C96B' style={{ color: '#1E1E2D' }}>
            Generar Imagen
          </Button>
        </Flex>
      </Center>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Imagen Generada"
        centered
        size='auto'
      >
        {imageUrl && (
          <div>
            <Image
              src={imageUrl}
              alt="Generated"
              width={500}
              height={500}
              className={classes.image}
            />
            <Button mt={20} fullWidth onClick={handleDownload}>
              Descargar Imagen
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}