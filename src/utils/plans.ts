import { IconBrandInstagram, IconBrandMeta, IconBrandTiktok, IconRobot } from '@tabler/icons-react';

export const plansDataMonthly = [
  {
    name: 'BASICO',
    tokens: 4501,
    title: 'Impulso inicial para emprendedores que quieren destacar.',
    description:
      'Perfecto para quienes están dando sus primeros pasos online. Este plan te permite crear contenido visual de alto impacto, sin complicaciones técnicas. Ideal para freelancers, pequeños comercios o profesionales independientes que quieren mejorar su imagen digital con resultados rápidos y visibles.',
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
    title: 'Crecimiento constante para marcas en expansión.',
    description:
      'Diseñado para negocios que ya tienen presencia online y quieren llevarla al siguiente nivel. Incluye mayor volumen de contenido, videos adaptados a tu marca y un asistente con IA que te ayuda a generar ideas creativas en segundos. Ideal para tiendas físicas, e-commerce y negocios en etapa de crecimiento.',
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
    title: 'Dominio total de tu nicho con contenido automatizado y de alto rendimiento.',
    description:
      'El paquete definitivo para empresas consolidadas que desean posicionarse como líderes de su sector. Obtén contenido profesional a escala, campañas optimizadas, y un flujo de ideas constante gracias a la inteligencia artificial. Automatiza tu estrategia de contenido con herramientas de nivel empresarial.',
    price: '$199.00',
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
]
 
 // yearly plans
export const plansDataYearly = [
  {
    name: 'BASICO',
    tokens: 54012,
    title: 'Impulso inicial para emprendedores que quieren destacar.',
    description:
      'Perfecto para quienes están dando sus primeros pasos online. Este plan te permite crear contenido visual de alto impacto, sin complicaciones técnicas. Ideal para freelancers, pequeños comercios o profesionales independientes que quieren mejorar su imagen digital con resultados rápidos y visibles.',
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
    title: 'Crecimiento constante para marcas en expansión.',
    description:
      'Diseñado para negocios que ya tienen presencia online y quieren llevarla al siguiente nivel. Incluye mayor volumen de contenido, videos adaptados a tu marca y un asistente con IA que te ayuda a generar ideas creativas en segundos. Ideal para tiendas físicas, e-commerce y negocios en etapa de crecimiento.',
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
    title: 'Dominio total de tu nicho con contenido automatizado y de alto rendimiento.',
    description:
      'El paquete definitivo para empresas consolidadas que desean posicionarse como líderes de su sector. Obtén contenido profesional a escala, campañas optimizadas, y un flujo de ideas constante gracias a la inteligencia artificial. Automatiza tu estrategia de contenido con herramientas de nivel empresarial.',
    price: '$165.83',
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
  }
]