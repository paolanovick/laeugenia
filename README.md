# 🧉 MateCultura - E-commerce de Mates Argentinos

Aplicación de comercio electrónico moderna y totalmente responsive para la venta de mates artesanales, yerba mate y bombillas, con integración directa a WhatsApp para finalizar compras.

## ✨ Características Principales

### 🎨 Diseño y UX
- **Interfaz Moderna**: Diseño innovador con efectos disruptivos y animaciones suaves
- **100% Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **Tema Verde Natural**: Paleta de colores inspirada en la yerba mate y la tradición argentina
- **Efectos Visuales**: Animaciones con Motion (Framer Motion), transiciones fluidas y efectos hover creativos

### 🛒 Funcionalidades de E-commerce
- **Carrito de Compras**: Sistema completo con persistencia en localStorage
- **Contador de Productos**: Badge animado que muestra la cantidad de items en el carrito
- **Gestión de Cantidades**: Incrementar, decrementar y eliminar productos del carrito
- **Cálculo de Totales**: Precio total actualizado en tiempo real

### 📱 Navegación
- **Menú Lateral Animado**: Sidebar que se desliza desde la izquierda con categorías
- **3 Categorías Principales**:
  - 🧉 Mates (Calabaza, madera, camionero, torpedo)
  - 🌿 Yerba & Blends (Energía, relax, orgánica, digestiva)
  - ✨ Bombillas (Alpaca, acero inoxidable, diseños especiales)

### 🎠 Carruseles
- **Carrusel Infinito**: Rotación automática de productos destacados en la home
- **Carruseles Manuales**: Por categoría con controles de navegación

### 📄 Páginas
- **Home**: Hero section, productos destacados y secciones por categoría
- **Detalle de Producto**: Galería de imágenes, especificaciones completas, selector de cantidad
- **Categorías**: Vista de productos filtrados por categoría
- **Carrito**: Resumen de compra y gestión de productos
- **404**: Página de error personalizada

### 💬 Integración WhatsApp
- **Compra Directa**: Botón para contactar por WhatsApp desde el carrito
- **Mensajes Preformateados**: El mensaje incluye productos, cantidades y total
- **CTA en Home**: Llamado a la acción para consultas generales

### 🎯 Efectos Especiales
- **Tarjetas de Producto**: Estilo MercadoLibre/Amazon con efectos hover
- **Badge "Destacado"**: Animación de entrada en productos featured
- **Partículas Flotantes**: Mates animados en el background del hero
- **Gradient Animados**: Fondos con gradientes dinámicos
- **Shine Effect**: Efecto de brillo en hover sobre productos

## 🛠️ Tecnologías

### Core
- **React 18.3.1**: Framework principal
- **TypeScript**: Tipado estático
- **Vite 6.3.5**: Build tool ultrarrápido

### Routing & State
- **React Router 7.13.0**: Navegación con Data Mode pattern
- **Context API**: Manejo de estado del carrito
- **localStorage**: Persistencia del carrito

### UI & Styling
- **Tailwind CSS 4.1.12**: Framework de CSS utility-first
- **Motion (Framer Motion) 12.23.24**: Animaciones y transiciones
- **Lucide React**: Iconos modernos
- **React Slick**: Carruseles

### Notificaciones
- **Sonner**: Toasts elegantes para feedback al usuario

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── CategoryCarousel.tsx      # Carrusel manual por categoría
│   │   ├── InfiniteCarousel.tsx      # Carrusel infinito automático
│   │   ├── ProductCard.tsx           # Tarjeta de producto
│   │   ├── Navbar.tsx                # Barra de navegación + Sidebar
│   │   ├── Footer.tsx                # Pie de página
│   │   └── ui/                       # Componentes UI reutilizables
│   ├── contexts/
│   │   └── CartContext.tsx           # Contexto global del carrito
│   ├── data/
│   │   └── products.ts               # Datos de productos y categorías
│   ├── pages/
│   │   ├── Home.tsx                  # Página principal
│   │   ├── ProductDetail.tsx         # Detalle de producto
│   │   ├── Cart.tsx                  # Carrito de compras
│   │   ├── Category.tsx              # Vista de categoría
│   │   └── NotFound.tsx              # Página 404
│   ├── App.tsx                       # Componente raíz
│   ├── Layout.tsx                    # Layout principal
│   └── routes.ts                     # Configuración de rutas
└── styles/
    ├── index.css                     # Estilos globales
    ├── theme.css                     # Tema y variables
    └── tailwind.css                  # Configuración de Tailwind
```

## 🎨 Paleta de Colores

- **Verde Oscuro**: `#2F4F2F` - Color principal
- **Verde Medio**: `#4A7C59` - Acentos
- **Verde Muy Oscuro**: `#1a2e1a` - Fondos
- **Dorado**: `#D4A574` - Highlights y CTAs
- **Blanco**: Textos y detalles

## 🚀 Características Técnicas

### Optimizaciones
- **Lazy Loading**: Imágenes de productos optimizadas
- **Persistencia**: Carrito guardado en localStorage
- **Animaciones Optimizadas**: Uso de `transform` y `opacity` para mejor performance
- **Responsive Images**: Imágenes de Unsplash optimizadas
- **Code Splitting**: React Router con componentes separados

### Accesibilidad
- **Contraste Adecuado**: Textos legibles sobre fondos oscuros
- **Hover States**: Feedback visual en todos los elementos interactivos
- **Focus States**: Indicadores de foco para navegación por teclado
- **Semantic HTML**: Estructura semántica correcta

## 📱 Responsividad

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Adaptaciones
- Grid responsivo de productos (1, 2, 3, 4 columnas)
- Carruseles adaptables al tamaño de pantalla
- Menú lateral optimizado para móvil
- Footer apilado en móvil, grid en desktop

## 💡 Funcionalidades del Carrito

### Operaciones
- ✅ Agregar productos
- ✅ Incrementar cantidad
- ✅ Decrementar cantidad
- ✅ Eliminar productos
- ✅ Vaciar carrito completo
- ✅ Calcular total
- ✅ Contador de items

### Persistencia
El carrito se guarda automáticamente en `localStorage` con la clave `mateCart`, permitiendo que los productos permanezcan incluso después de cerrar el navegador.

## 🔗 Integración WhatsApp

### Número Configurado
`+549 1234567890` (modificar en los archivos según necesidad)

### Mensajes
Los mensajes se generan automáticamente con formato:
- Lista de productos con cantidades
- Precio individual y subtotal
- Total general

## 🎭 Efectos Visuales

### Animaciones Implementadas
- **Fade In**: Elementos aparecen suavemente
- **Slide In**: Sidebar deslizante
- **Scale**: Botones y tarjetas con efecto de escala
- **Rotate**: Iconos animados
- **Float**: Elementos flotantes en el hero
- **Shine**: Efecto de brillo en hover
- **Gradient Shift**: Fondos con gradientes animados

### Motion Variants
- Entrada de componentes con delay escalonado
- Transiciones spring para efectos naturales
- Hover y tap states en elementos interactivos

## 📦 Productos Incluidos

### Mates (4 productos)
- Mate Imperial de Calabaza
- Mate de Madera Premium
- Mate Camionero Clásico
- Mate Torpedo Moderno

### Yerba & Blends (4 productos)
- Blend Energía Natural
- Blend Relax Nocturno
- Yerba Mate Orgánica Premium
- Blend Digestivo

### Bombillas (4 productos)
- Bombilla Premium Alpaca
- Bombilla Acero Inoxidable
- Bombilla Pico de Loro
- Bombilla con Virola de Cuero

## 🎯 Próximas Mejoras Sugeridas

- [ ] Filtros y búsqueda de productos
- [ ] Sistema de favoritos
- [ ] Reviews y calificaciones
- [ ] Galería de clientes (fotos de mates)
- [ ] Blog con tips sobre mate
- [ ] Newsletter subscription
- [ ] Descuentos y cupones
- [ ] Comparador de productos
- [ ] Wishlist compartible

## 📝 Notas de Desarrollo

- Las imágenes provienen de Unsplash y son placeholder
- El número de WhatsApp debe configurarse según necesidad
- Los precios son en pesos argentinos (ARS)
- El sistema está preparado para integrar backend si se necesita

---

**Desarrollado con ❤️ en Argentina**

*MateCultura - Tradición en cada mate*
