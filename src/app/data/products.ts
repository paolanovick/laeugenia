export interface Product {
  id: string;
  name: string;
  category: 'mates' | 'yerba' | 'bombillas';
  price: number;
  images: string[];
  description: string;
  featured: boolean;
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  // MATES
  {
    id: 'mate-1',
    name: 'Mate Imperial de Calabaza',
    category: 'mates',
    price: 4500,
    images: [
      'https://images.unsplash.com/photo-1671069833604-34a8b4d9a812?w=800',
      'https://images.unsplash.com/photo-1662628325105-abdc437c2903?w=800',
      'https://images.unsplash.com/photo-1642157198214-97b8124ab09d?w=800',
    ],
    description: 'Mate artesanal de calabaza curada naturalmente. Diseño tradicional con cuello de alpaca. Perfecto para los amantes del mate clásico.',
    featured: true,
    specs: [
      { label: 'Material', value: 'Calabaza curada' },
      { label: 'Cuello', value: 'Alpaca plateada' },
      { label: 'Capacidad', value: '250ml' },
      { label: 'Origen', value: 'Artesanal argentino' },
    ],
  },
  {
    id: 'mate-2',
    name: 'Mate de Madera Premium',
    category: 'mates',
    price: 5200,
    images: [
      'https://images.unsplash.com/photo-1759523710563-d8ef8cef3411?w=800',
      'https://images.unsplash.com/photo-1671069833604-34a8b4d9a812?w=800',
    ],
    description: 'Mate tallado a mano en madera de algarrobo. Diseño ergonómico con acabado natural. Incluye virola de acero inoxidable.',
    featured: true,
    specs: [
      { label: 'Material', value: 'Algarrobo' },
      { label: 'Acabado', value: 'Natural encerado' },
      { label: 'Virola', value: 'Acero inoxidable' },
      { label: 'Capacidad', value: '200ml' },
    ],
  },
  {
    id: 'mate-3',
    name: 'Mate Camionero Clásico',
    category: 'mates',
    price: 3800,
    images: [
      'https://images.unsplash.com/photo-1662628325105-abdc437c2903?w=800',
      'https://images.unsplash.com/photo-1642157198214-97b8124ab09d?w=800',
    ],
    description: 'El mate ideal para llevar a todos lados. Base ancha y estable, diseño robusto.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Calabaza reforzada' },
      { label: 'Base', value: 'Extra ancha' },
      { label: 'Capacidad', value: '300ml' },
    ],
  },
  {
    id: 'mate-4',
    name: 'Mate Torpedo Moderno',
    category: 'mates',
    price: 4100,
    images: [
      'https://images.unsplash.com/photo-1671069833604-34a8b4d9a812?w=800',
    ],
    description: 'Diseño torpedo con cuello de alpaca. Perfecto equilibrio entre tradición y modernidad.',
    featured: true,
    specs: [
      { label: 'Material', value: 'Calabaza seleccionada' },
      { label: 'Diseño', value: 'Torpedo' },
      { label: 'Cuello', value: 'Alpaca' },
    ],
  },

  // YERBA MATE & BLENDS
  {
    id: 'yerba-1',
    name: 'Blend Energía Natural',
    category: 'yerba',
    price: 2800,
    images: [
      'https://images.unsplash.com/photo-1642157198214-97b8124ab09d?w=800',
      'https://images.unsplash.com/photo-1662628325105-abdc437c2903?w=800',
    ],
    description: 'Mezcla exclusiva de yerba mate con menta, cedrón y hierbas energizantes. Ideal para comenzar el día con vitalidad.',
    featured: true,
    specs: [
      { label: 'Peso', value: '500g' },
      { label: 'Tipo', value: 'Con palo' },
      { label: 'Ingredientes', value: 'Yerba, menta, cedrón' },
      { label: 'Origen', value: 'Misiones, Argentina' },
    ],
  },
  {
    id: 'yerba-2',
    name: 'Blend Relax Nocturno',
    category: 'yerba',
    price: 3000,
    images: [
      'https://images.unsplash.com/photo-1662628325105-abdc437c2903?w=800',
      'https://images.unsplash.com/photo-1642157198214-97b8124ab09d?w=800',
    ],
    description: 'Yerba suave con tilo, valeriana y manzanilla. Sin palo. Perfecta para momentos de tranquilidad.',
    featured: true,
    specs: [
      { label: 'Peso', value: '500g' },
      { label: 'Tipo', value: 'Sin palo' },
      { label: 'Ingredientes', value: 'Yerba, tilo, valeriana, manzanilla' },
    ],
  },
  {
    id: 'yerba-3',
    name: 'Yerba Mate Orgánica Premium',
    category: 'yerba',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1662628325105-abdc437c2903?w=800',
    ],
    description: 'Yerba mate 100% orgánica certificada. Cosecha artesanal, secado natural.',
    featured: false,
    specs: [
      { label: 'Peso', value: '1kg' },
      { label: 'Certificación', value: 'Orgánica' },
      { label: 'Tipo', value: 'Con palo' },
    ],
  },
  {
    id: 'yerba-4',
    name: 'Blend Digestivo',
    category: 'yerba',
    price: 2900,
    images: [
      'https://images.unsplash.com/photo-1642157198214-97b8124ab09d?w=800',
    ],
    description: 'Yerba con boldo, poleo y jengibre. Ideal después de las comidas.',
    featured: false,
    specs: [
      { label: 'Peso', value: '500g' },
      { label: 'Ingredientes', value: 'Yerba, boldo, poleo, jengibre' },
    ],
  },

  // BOMBILLAS
  {
    id: 'bombilla-1',
    name: 'Bombilla Premium Alpaca',
    category: 'bombillas',
    price: 1800,
    images: [
      'https://images.unsplash.com/photo-1709820738311-b6dcaaaaa48c?w=800',
      'https://images.unsplash.com/photo-1617713964562-71b4bfe5f823?w=800',
    ],
    description: 'Bombilla artesanal en alpaca plateada. Pico curvado y filtro desmontable para fácil limpieza.',
    featured: true,
    specs: [
      { label: 'Material', value: 'Alpaca plateada' },
      { label: 'Largo', value: '19cm' },
      { label: 'Filtro', value: 'Desmontable' },
      { label: 'Pico', value: 'Curvado' },
    ],
  },
  {
    id: 'bombilla-2',
    name: 'Bombilla Acero Inoxidable',
    category: 'bombillas',
    price: 1500,
    images: [
      'https://images.unsplash.com/photo-1617713964562-71b4bfe5f823?w=800',
      'https://images.unsplash.com/photo-1709820738311-b6dcaaaaa48c?w=800',
    ],
    description: 'Bombilla resistente en acero inoxidable quirúrgico. Duradera y fácil de mantener.',
    featured: true,
    specs: [
      { label: 'Material', value: 'Acero inoxidable 304' },
      { label: 'Largo', value: '18cm' },
      { label: 'Filtro', value: 'Resorte' },
    ],
  },
  {
    id: 'bombilla-3',
    name: 'Bombilla Pico de Loro',
    category: 'bombillas',
    price: 2100,
    images: [
      'https://images.unsplash.com/photo-1709820738311-b6dcaaaaa48c?w=800',
    ],
    description: 'Diseño clásico pico de loro en alpaca. Elegante y funcional.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Alpaca' },
      { label: 'Diseño', value: 'Pico de loro' },
      { label: 'Largo', value: '17cm' },
    ],
  },
  {
    id: 'bombilla-4',
    name: 'Bombilla con Virola de Cuero',
    category: 'bombillas',
    price: 1900,
    images: [
      'https://images.unsplash.com/photo-1617713964562-71b4bfe5f823?w=800',
    ],
    description: 'Bombilla de alpaca con detalle de virola en cuero vacuno. Estilo gaucho.',
    featured: false,
    specs: [
      { label: 'Material', value: 'Alpaca y cuero' },
      { label: 'Detalle', value: 'Virola de cuero' },
    ],
  },
];

export const categories = [
  { id: 'mates', name: 'Mates', icon: '🧉' },
  { id: 'yerba', name: 'Yerba & Blends', icon: '🌿' },
  { id: 'bombillas', name: 'Bombillas', icon: '✨' },
];
