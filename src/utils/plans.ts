import { IconAdFilled, IconAutomation, IconBrandMeta, IconBrandTiktok, IconRobot } from '@tabler/icons-react';

export const plansData = [
  {
    name: 'BASICO',
    title: 'Para pequeños empresarios en busca de nuevas oportunidades.',
    description:
      'Ideal para quienes están empezando a construir su presencia online y necesitan un empujón con contenido profesional, sin complicarse con estrategias avanzadas. Perfecto para emprendedores individuales, negocios locales o freelancers.',
    price: '$59.00',
    features: [
      {text: '3 publicaciones semanales listas para redes (100% personalizadas)', icon: IconBrandMeta},
      {text: '1 video corto semanal tipo reel o TikTok, adaptado a tu marca', icon: IconBrandTiktok},
      {text: 'Automatización básica: contenido generado sin esfuerzo', icon: IconAutomation},      
    ],
    featured: false,
    paymentFrequency: 'Mensual',
    button: 'Comenzar ahora',
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
  },
  {
    name: 'PREMIUM',
    title: 'Para marcas que quieren dominar su nicho y atraer clientes de forma constante.',
    description:
      'Pensado para empresas consolidadas o ambiciosas, este paquete incluye todo lo necesario para posicionar tu marca como líder: contenido avanzado, campañas de Google Ads, reportes de resultados y automatización total.',
    price: '$169.00',
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
  },
]
