import { Card, CardSection, Flex, Group, Text, Title } from '@mantine/core';
import classes from './ServiceDescription.module.css';
import Image from 'next/image';
import { cardsHome } from '@/utils/cardsHome';

export default function ServiceDescription() {
  return (
    <>
      <Flex direction='column' justify="center" align="center" className={classes.flexContainer}>
        <div style={{ maxWidth: '500px', textAlign: 'center' }}>
          <Title order={2} className={classes.subtitle}>Nuestro conjunto de herramientas de IA</Title>
          <Text className={classes.text}>Revoluciona tu flujo de trabajo creativo de marketing con las Herramientas de IA de ContiA. Te proporcionamos la tecnología de IA más avanzada para generar contenido para redes sociales en alta definición y vídeos cautivadores.</Text>
        </div>
      </Flex>

      <Flex gap={20} direction="column" justify="center" align="center" p="20px 20px" className={classes.cardsContainer}>
        {cardsHome.map(card => (
          <Card key={card.id} shadow="sm" radius="lg" p={10} withBorder className={classes.card}>
            <CardSection>
              {card.type === 'image' ? (
                <Image
                  src={card.src}
                  alt={card.alt || 'Card Image'}
                  layout="responsive"
                  width={240}
                  height={240}
                  className={classes.image}
                />
              ) : (
                <video
                  src={card.src}
                  // controls
                  muted
                  autoPlay={true}
                  loop
                  className={classes.video}
                ></video>
              )}
            </CardSection>

            <Group gap={0} px={6}>
              <Text fw={500} fz="24px">{card.title}</Text>
              <Text size="xs">{card.description}</Text>
            </Group>
          </Card>
        ))}
      </Flex>

      <Flex direction="column" justify="flex-start" align="center" className={classes.heroContainer}>
        {cardsHome.map(card => (
          <Flex key={card.id} gap={20} align="center" justify="space-between" style={{ margin: '40px 0px', maxWidth: '1100px', width: '100%' }}>
            {card.type === 'image' ? (
              <Image
                src={card.src}
                alt={card.alt || 'Media Image'}
                layout="responsive"
                width={550}
                height={550}
                style={{
                  borderRadius: '15px',
                  maxWidth: '550px',
                  maxHeight: '550px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <video
                src={card.src}
                // controls
                muted
                autoPlay
                loop
                style={{
                  borderRadius: '15px',
                  maxWidth: '550px',
                  maxHeight: '550px',
                  objectFit: 'cover'
                }}
              />
            )}
            <div style={{ maxWidth: '550px', textAlign: 'left' }}>
              <Title order={2} style={{ fontSize: '2.5rem' }}>
                {card.title}
              </Title>
              <Text size="lg" mt={10}>
                {card.description}
              </Text>
            </div>
          </Flex>
        ))}
      </Flex>
    </>
  )
}
