import { IconAdFilled, IconAutomation, IconBrandMeta, IconBrandTiktok, IconRobot } from '@tabler/icons-react';

export const plansData = [
  {
    name: 'BASICO',
    title: 'Para pequeños empresarios en busca de nuevas oportunidades.',
    description:
      'Ideal para quienes están empezando a construir su presencia online y necesitan un empujón con contenido profesional, sin complicarse con estrategias avanzadas. Perfecto para emprendedores individuales, negocios locales o freelancers.',
    price: '$49.00',
    features: [
      {text: '3 publicaciones semanales listas para redes (100% personalizadas)', icon: IconBrandMeta},
      {text: '1 video corto semanal tipo reel o TikTok, adaptado a tu marca', icon: IconBrandTiktok},
      {text: 'Automatización básica: contenido generado sin esfuerzo', icon: IconAutomation},      
    ],
    featured: false,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_3cI5kDaku3y7gFbbYggEg00'
          : '',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRwuPGPNJsUq7ASUIeO6HwE'
          : '',
    duration: '/month'
  },
  {
    name: 'EMPRESARIAL',
    title: 'Para negocios en expansión que quieren destacar en redes.',
    description:
      'Diseñado para marcas que ya tienen algo de presencia digital pero desean escalar su visibilidad con contenido más frecuente, creativo y con opciones de promoción como anuncios básicos. Perfecto para tiendas físicas, e-commerce o servicios locales en crecimiento.',
    price: '$99.00',
    features: [
      {text: '5 publicaciones semanales en redes sociales (con tu estilo y logo)', icon: IconBrandMeta},
      {text: '4 videos cortos semanales tipo reel o TikTok para aumentar el alcance', icon: IconBrandTiktok},
      {text: 'Activación de campañas básicas en Google Ads', icon: IconAdFilled},
      {text: 'Asistente con IA para generar ideas y textos cuando lo necesites', icon: IconRobot}
    ],
    featured: true,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_14A5kDcsC2u39cJ8M4gEg01'
          : '',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRww4GPNJsUq7ASIMbHJkBg'
          : '',
    duration: '/month'
  },
  {
    name: 'PREMIUM',
    title: 'Para marcas que quieren dominar su nicho y atraer clientes de forma constante.',
    description:
      'Pensado para empresas consolidadas o ambiciosas, este paquete incluye todo lo necesario para posicionar tu marca como líder: contenido avanzado, campañas de Google Ads, reportes de resultados y automatización total.',
    price: '$149.00',
    features: [
      {text: '15 publicaciones semanales (textos + imágenes optimizadas por IA)', icon: IconBrandMeta},
      {text: '10 videos tipo reel o TikTok semanales con branding integrado', icon: IconBrandTiktok},
      {text: 'Campañas activas en Google Ads para atraer nuevos clientes', icon: IconAdFilled},
      {text: 'Reporte mensual de rendimiento + recomendaciones de mejora', icon: IconRobot},
      {text: 'Automatización avanzada: agenda, modifica o aprueba contenido con 1 clic', icon: IconAutomation}
    ],
    featured: false,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_28EcN58cm4Cbex3e6ogEg02'
          : '',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRwwqGPNJsUq7ASOFdZ3arj'
          : '',
    duration: '/month'
  },
  // yearly plans
  {
    name: 'BASICO',
    title: 'Para pequeños empresarios en busca de nuevas oportunidades.',
    description:
      'Ideal para quienes están empezando a construir su presencia online y necesitan un empujón con contenido profesional, sin complicarse con estrategias avanzadas. Perfecto para emprendedores individuales, negocios locales o freelancers.',
    price: '$40.83',
    features: [
      {text: '3 publicaciones semanales listas para redes (100% personalizadas)', icon: IconBrandMeta},
      {text: '1 video corto semanal tipo reel o TikTok, adaptado a tu marca', icon: IconBrandTiktok},
      {text: 'Automatización básica: contenido generado sin esfuerzo', icon: IconAutomation},      
    ],
    featured: false,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_6oUbJ10JUecL9cJd2kgEg03'
          : '',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRxBCGPNJsUq7AScLclkeJ1'
          : '',
    duration: '/year'
  },
  {
    name: 'EMPRESARIAL',
    title: 'Para negocios en expansión que quieren destacar en redes.',
    description:
      'Diseñado para marcas que ya tienen algo de presencia digital pero desean escalar su visibilidad con contenido más frecuente, creativo y con opciones de promoción como anuncios básicos. Perfecto para tiendas físicas, e-commerce o servicios locales en crecimiento.',
    price: '$82.50',
    features: [
      {text: '5 publicaciones semanales en redes sociales (con tu estilo y logo)', icon: IconBrandMeta},
      {text: '4 videos cortos semanales tipo reel o TikTok para aumentar el alcance', icon: IconBrandTiktok},
      {text: 'Activación de campañas básicas en Google Ads', icon: IconAdFilled},
      {text: 'Asistente con IA para generar ideas y textos cuando lo necesites', icon: IconRobot}
    ],
    featured: true,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_6oU7sL0JUc4D88F5zSgEg04'
          : '',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRxCAGPNJsUq7ASCAyBA6Lr'
          : '',
    duration: '/year'
  },
  {
    name: 'PREMIUM',
    title: 'Para marcas que quieren dominar su nicho y atraer clientes de forma constante.',
    description:
      'Pensado para empresas consolidadas o ambiciosas, este paquete incluye todo lo necesario para posicionar tu marca como líder: contenido avanzado, campañas de Google Ads, reportes de resultados y automatización total.',
    price: '$124.16',
    features: [
      {text: '15 publicaciones semanales (textos + imágenes optimizadas por IA)', icon: IconBrandMeta},
      {text: '10 videos tipo reel o TikTok semanales con branding integrado', icon: IconBrandTiktok},
      {text: 'Campañas activas en Google Ads para atraer nuevos clientes', icon: IconAdFilled},
      {text: 'Reporte mensual de rendimiento + recomendaciones de mejora', icon: IconRobot},
      {text: 'Automatización avanzada: agenda, modifica o aprueba contenido con 1 clic', icon: IconAutomation}
    ],
    featured: false,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_cNibJ12S25Gf1Kh6DWgEg05'
          : '',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRxCfGPNJsUq7ASwonRF3zg'
          : '',
    duration: '/year'
  },
]
