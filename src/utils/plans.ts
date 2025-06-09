import { IconBrandInstagram, IconBrandMeta, IconBrandTiktok, IconRobot } from '@tabler/icons-react';

export const plansData = [
  {
    name: 'BASICO',
    tokens: 4501,
    title: 'Para pequeños empresarios en busca de nuevas oportunidades.',
    description:
      'Ideal para quienes están empezando a construir su presencia online y necesitan un empujón con contenido profesional, sin complicarse con estrategias avanzadas. Perfecto para emprendedores individuales, negocios locales o freelancers.',
    price: '$49.00',
    features: [
      {text: 'Posibilidad de generar 70 imagenes (100% personalizadas)', icon: IconBrandMeta},
      {text: 'Posibilidad de generar 3 videos de 5 segundos (Veo 3) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandTiktok},
      {text: 'Posibilidad de generar 4 videos de 6 segundos (Nova Reel) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandInstagram},
    ],
    featured: false,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_3cI5kDaku3y7gFbbYggEg00'
          : 'https://buy.stripe.com/28EcN58cm4Cbex3e6ogEg02',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRwuPGPNJsUq7ASUIeO6HwE'
          : 'price_1RVbRrGPNJsUq7ASQXbL5kLj',
    duration: '/month'
  },
  {
    name: 'EMPRESARIAL',
    tokens: 12001,
    title: 'Para negocios en expansión que quieren destacar en redes.',
    description:
      'Diseñado para marcas que ya tienen algo de presencia digital pero desean escalar su visibilidad con contenido más frecuente, creativo y con opciones de promoción como anuncios básicos. Perfecto para tiendas físicas, e-commerce o servicios locales en crecimiento.',
    price: '$99.00',
    features: [
      {text: 'Posibilidad de generar 175 imagenes (100% personalizadas)', icon: IconBrandMeta},
      {text: 'Posibilidad de generar 7 videos de 5 segundos (Veo 3) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandTiktok},
      {text: 'Posibilidad de generar 10 videos de 6 segundos (Nova Reel) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandInstagram},
      {text: 'Asistente con IA para generar ideas y textos cuando lo necesites', icon: IconRobot}
    ],
    featured: true,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_14A5kDcsC2u39cJ8M4gEg01'
          : 'https://buy.stripe.com/6oU7sL0JUc4D88F5zSgEg04',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRww4GPNJsUq7ASIMbHJkBg'
          : 'price_1RVbScGPNJsUq7AST3bPpgm3',
    duration: '/month'
  },
  {
    name: 'PREMIUM',
    tokens: 20001,
    title: 'Para marcas que quieren dominar su nicho y atraer clientes de forma constante.',
    description:
      'Pensado para empresas consolidadas o ambiciosas, este paquete incluye todo lo necesario para posicionar tu marca como líder: contenido avanzado, campañas de Google Ads, reportes de resultados y automatización total.',
    price: '$149.00',
    features: [
      {text: 'Posibilidad de generar 288 imagenes (100% personalizadas)', icon: IconBrandMeta},
      {text: 'Posibilidad de generar 14 videos de 5 segundos (Veo 3) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandTiktok},
      {text: 'Posibilidad de generar 19 videos de 6 segundos (Nova Reel) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandInstagram},
      {text: 'Asistente con IA para generar ideas y textos cuando lo necesites', icon: IconRobot}
    ],
    featured: false,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_28EcN58cm4Cbex3e6ogEg02'
          : 'https://buy.stripe.com/5kQcN5eAKgkTcoV3rKgEg08',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRwwqGPNJsUq7ASOFdZ3arj'
          : 'price_1RXtL2GPNJsUq7ASYuKjuprm',
    duration: '/month'
  },
  // yearly plans
  {
    name: 'BASICO',
    tokens: 54012,
    title: 'Para pequeños empresarios en busca de nuevas oportunidades.',
    description:
      'Ideal para quienes están empezando a construir su presencia online y necesitan un empujón con contenido profesional, sin complicarse con estrategias avanzadas. Perfecto para emprendedores individuales, negocios locales o freelancers.',
    price: '$40.83',
    features: [
      {text: 'Posibilidad de generar 840 imagenes (100% personalizadas)', icon: IconBrandMeta},
      {text: 'Posibilidad de generar 36 videos de 5 segundos (Veo 3) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandTiktok},
      {text: 'Posibilidad de generar 48 videos de 6 segundos (Nova Reel) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandInstagram},
    ],
    featured: false,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_6oUbJ10JUecL9cJd2kgEg03'
          : 'https://buy.stripe.com/6oUbJ10JUecL9cJd2kgEg03',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRxBCGPNJsUq7AScLclkeJ1'
          : 'price_1RVbWKGPNJsUq7ASwi0NWDTA',
    duration: '/year'
  },
  {
    name: 'EMPRESARIAL',
    tokens: 144012,
    title: 'Para negocios en expansión que quieren destacar en redes.',
    description:
      'Diseñado para marcas que ya tienen algo de presencia digital pero desean escalar su visibilidad con contenido más frecuente, creativo y con opciones de promoción como anuncios básicos. Perfecto para tiendas físicas, e-commerce o servicios locales en crecimiento.',
    price: '$82.50',
    features: [
      {text: 'Posibilidad de generar 2100 imagenes (100% personalizadas)', icon: IconBrandMeta},
      {text: 'Posibilidad de generar 84 videos de 5 segundos (Veo 3) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandTiktok},
      {text: 'Posibilidad de generar 120 videos de 6 segundos (Nova Reel) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandInstagram},
      {text: 'Asistente con IA para generar ideas y textos cuando lo necesites', icon: IconRobot}
    ],
    featured: true,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_6oU7sL0JUc4D88F5zSgEg04'
          : 'https://buy.stripe.com/cNibJ12S25Gf1Kh6DWgEg05',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRxCAGPNJsUq7ASCAyBA6Lr'
          : 'price_1RVbX5GPNJsUq7ASb2Nt3hjo',
    duration: '/year'
  },
  {
    name: 'PREMIUM',
    tokens: 240012,
    title: 'Para marcas que quieren dominar su nicho y atraer clientes de forma constante.',
    description:
      'Pensado para empresas consolidadas o ambiciosas, este paquete incluye todo lo necesario para posicionar tu marca como líder: contenido avanzado, campañas de Google Ads, reportes de resultados y automatización total.',
    price: '$124.16',
    features: [
      {text: 'Posibilidad de generar 3456 imagenes (100% personalizadas)', icon: IconBrandMeta},
      {text: 'Posibilidad de generar 168 videos de 5 segundos (Veo 3) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandTiktok},
      {text: 'Posibilidad de generar 228 videos de 6 segundos (Nova Reel) tipo reel o TikTok, adaptado a tu marca', icon: IconBrandInstagram},
      {text: 'Asistente con IA para generar ideas y textos cuando lo necesites', icon: IconRobot}
    ],
    featured: false,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
    link:
        process.env.NODE_ENV === 'development'
          ? 'https://buy.stripe.com/test_cNibJ12S25Gf1Kh6DWgEg05'
          : 'https://buy.stripe.com/aFa4gzaku8SrfB75zSgEg09',
    priceId:
        process.env.NODE_ENV === 'development'
          ? 'price_1RRxCfGPNJsUq7ASwonRF3zg'
          : 'price_1RXtMOGPNJsUq7ASgzfra8pl',
    duration: '/year'
  },
]
