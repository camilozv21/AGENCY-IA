"use client";

import { Accordion, Container, Grid, Title } from '@mantine/core';
import classes from './FAQHomepage.module.css';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export function FAQHomepage() {
  const { t } = useTranslation('home');
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src="https://df50lbm4qcrt6.cloudfront.net/imageFAQHomepage.svg" alt="Frequently Asked Questions" layout="responsive" width={500} height={500} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              {t('home.FAQ.title')}
            </Title>

            <Accordion chevronPosition="right" variant="separated">
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>Que opciones de pago estan disponibles?</Accordion.Control>
                <Accordion.Panel>En ContiA ofrecemos una variedad de opciones de pago convenientes para garantizar una experiencia de compra fluida y sin complicaciones.

                  Las siguientes formas de pago están disponibles:

                  Pago por enlace: Nuestra plataforma te permite realizar pagos a través de un enlace seguro proporcionado durante el proceso de compra. Este método te permite autorizar el pago directamente desde tu cuenta bancaria, asegurando transacciones rápidas y eficientes.

                  Tarjeta de crédito: Aceptamos todas las principales tarjetas de crédito, ofreciéndote la flexibilidad de pagar con la tarjeta de tu preferencia. Nuestro sistema de pagos está cifrado y es completamente seguro, protegiendo tu información personal y financiera.

                  Tarjeta de débito: También puedes pagar con tu tarjeta de débito. Solo debes ingresar los datos de tu tarjeta durante el proceso de compra y el pago se procesará de forma segura. Asegúrate de que tu tarjeta esté habilitada para transacciones en línea.

                  En ContiA, priorizamos la seguridad de tu información de pago y seguimos las mejores prácticas del sector para proteger tu privacidad. Nuestros sistemas de pago utilizan cifrado y cumplen con rigurosos estándares de seguridad para salvaguardar tus datos sensibles.

                  Si enfrentas algún inconveniente o tienes preguntas específicas relacionadas con los pagos, nuestro equipo de atención al cliente está disponible para ayudarte rápidamente en contia@contia.io.

                  Nos esforzamos por ofrecerte una experiencia de pago profesional, confiable y satisfactoria en todo momento.

                  Ten en cuenta que la disponibilidad de ciertos métodos de pago puede variar según tu ubicación y el tipo de servicio que estés adquiriendo. Te recomendamos revisar la página de pago para obtener la información más actualizada sobre los métodos disponibles.

                  Gracias por elegir ContiA. Estamos encantados de poder atenderte y brindarte una experiencia de pago sin contratiempos.</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>Puedo cancelar mi plan?</Accordion.Control>
                <Accordion.Panel>Sí, puedes cancelar tu plan en cualquier momento.
                  En ContiA, entendemos que las circunstancias y preferencias pueden cambiar, y queremos ofrecer flexibilidad a nuestros usuarios. Creemos en brindar una experiencia sin complicaciones, lo que incluye la posibilidad de cancelar tu suscripción o plan cuando lo necesites.

                  Cuando decidas cancelar tu plan, normalmente puedes hacerlo desde la pestaña de &quot;Administrar suscripciones&quot; o comunicándote con nuestro equipo de soporte al correo contia@contia.io. Nos esforzamos por hacer que el proceso de cancelación sea claro y sencillo, asegurándonos de que tengas control total sobre tu suscripción.

                  Es importante tener en cuenta que los términos de cancelación pueden variar según el tipo de suscripción o plan que hayas elegido. Algunos planes pueden tener un período mínimo de compromiso o tarifas asociadas a la cancelación. Sin embargo, incluso con estas condiciones, nuestro objetivo es mantener el proceso lo más ágil y transparente posible.

                  En ContiA, valoramos a nuestros usuarios y queremos asegurarnos de que estén satisfechos con nuestros servicios. Aunque lamentaríamos verte partir, respetamos tu decisión y estamos comprometidos a ofrecerte una experiencia positiva tanto durante tu suscripción como en el proceso de cancelación.

                  Si tienes alguna pregunta adicional o necesitas ayuda para cancelar tu plan, nuestro equipo de atención al cliente está disponible para guiarte y resolver cualquier inquietud que puedas tener.

                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>Puedo actualizar o degradar mi plan actual?</Accordion.Control>
                <Accordion.Panel>Sí, tienes la flexibilidad de actualizar o degradar tu plan actual en ContiA. Entendemos que tus necesidades y requerimientos pueden cambiar con el tiempo, y queremos adaptarnos a esos cambios.

                  Si descubres que tu plan actual ya no se ajusta a lo que necesitas y requieres funciones o recursos adicionales, puedes actualizar tu plan. Para hacerlo, ve a la pestaña de &quot;Administrar suscripciones&quot; y elige el plan que desees; sigue los pasos indicados o bien contáctanos al correo contia@contia.io. Esto normalmente implica acceder a planes de nivel superior que ofrecen más funcionalidades, límites aumentados o beneficios adicionales.

                  El proceso para actualizar tu plan suele ser sencillo y puedes hacerlo directamente desde la configuración de tu cuenta o comunicándote con nuestro equipo de soporte.

                  De manera similar, si consideras que ya no necesitas ciertas funciones o deseas ajustar tu suscripción para que se adapte mejor a tus necesidades, puedes degradar tu plan. Esto te permite cambiar a un plan de nivel inferior que aún incluye las funciones esenciales que necesitas, pero a un menor costo o con menos recursos.

                  Al igual que con la actualización, la degradación del plan también puede realizarse desde la configuración de tu cuenta o contactando a nuestro equipo de atención al cliente.

                  En ContiA, nos esforzamos por que el proceso de cambio de plan —ya sea una actualización o una degradación— sea lo más fluido posible, asegurándonos de que tengas la flexibilidad necesaria para ajustar tu suscripción según tus necesidades cambiantes. Nuestro equipo de soporte está disponible para ayudarte en todo momento, responder tus preguntas y guiarte para tomar la mejor decisión.</Accordion.Panel>
              </Accordion.Item>

              {/* <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Do you store credit card information securely?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item> */}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}