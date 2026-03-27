# 🧉 MateCultura - Guía de Uso

## 🚀 Inicio Rápido

La aplicación está completamente implementada y lista para usar. Todos los componentes están funcionando con datos mock y efectos visuales creativos.

## 📱 Navegación Principal

### 1. Página de Inicio (Home)
**Ruta:** `/`

**Secciones:**
- **Hero Section**: Banner principal con título animado y efectos de partículas flotantes
- **Carrusel Infinito**: Productos destacados que rotan automáticamente (se pausa al hacer hover)
- **Categorías**: Tres secciones con carruseles manuales:
  - 🧉 Mates
  - 🌿 Yerba & Blends
  - ✨ Bombillas
- **CTA WhatsApp**: Botón de contacto directo

**Características especiales:**
- Animaciones de entrada para todos los elementos
- Iconos animados en categorías
- Gradientes animados en el título
- Partículas de mates flotando en el fondo

### 2. Detalle de Producto
**Ruta:** `/product/:id`

**Funcionalidades:**
- Galería de imágenes con navegación
- Miniaturas clickeables
- Selector de cantidad
- Especificaciones del producto
- Rating de 5 estrellas
- Dos botones de acción:
  - **Agregar al Carrito**: Añade el producto con la cantidad seleccionada
  - **Comprar por WhatsApp**: Abre WhatsApp con mensaje pre-formateado
- Productos relacionados al final

**Características especiales:**
- Transiciones suaves entre imágenes
- Badge "Destacado" en productos featured
- Iconos de garantía, envío y seguridad

### 3. Vista de Categoría
**Ruta:** `/category/:categoryId`

**Categorías disponibles:**
- `mates` - Mates artesanales
- `yerba` - Yerba & Blends
- `bombillas` - Bombillas premium

**Características:**
- Grid responsivo de productos
- Header con icono animado de la categoría
- Descripción personalizada por categoría
- Todas las tarjetas de producto con efectos hover

### 4. Carrito de Compras
**Ruta:** `/cart`

**Funcionalidades:**
- Lista de productos agregados
- Controles de cantidad (+/-)
- Eliminar productos individualmente
- Vaciar carrito completo
- Resumen de compra sticky
- Botón de checkout por WhatsApp
- Mensajes informativos (envío gratis, garantía, etc.)

**Estado vacío:**
- Mensaje amigable cuando no hay productos
- Botón para volver a la tienda

**Características especiales:**
- Persistencia en localStorage
- Cálculos en tiempo real
- Animaciones de entrada escalonadas

### 5. Página 404
**Ruta:** Cualquier ruta no definida

**Características:**
- Diseño coherente con el resto de la app
- Animación del emoji de mate
- Botón para volver al inicio

## 🎨 Componentes Principales

### Navbar
**Ubicación:** Fijo en la parte superior

**Elementos:**
- **Botón de menú (izquierda)**: Abre el sidebar con categorías
- **Logo central**: "MateCultura" con emoji animado
- **Carrito (derecha)**: Badge con contador de productos

**Características:**
- Fondo semi-transparente con blur
- Animación de entrada desde arriba
- Contador del carrito animado

### Sidebar
**Activación:** Click en el botón de menú

**Contenido:**
- Logo y tagline
- Enlace a inicio
- Enlaces a las 3 categorías
- Footer con copyright

**Características:**
- Deslizamiento desde la izquierda
- Overlay oscuro en el fondo
- Animaciones de entrada para cada enlace
- Cierre al hacer click fuera o en la X

### Footer
**Ubicación:** Final de cada página

**Columnas:**
1. **Logo & Descripción**: Información de la marca
2. **Redes Sociales**: 
   - Instagram
   - Facebook
   - Twitter
   - Email
3. **Información Legal**:
   - Términos y Condiciones
   - Política de Privacidad
   - Envíos y Devoluciones
   - Contacto

**Características:**
- Animaciones al hacer scroll
- Enlaces con hover effects
- Copyright con corazón animado

### ProductCard
**Uso:** Componente reutilizable para mostrar productos

**Elementos:**
- Imagen del producto
- Badge de "Destacado" (si aplica)
- Nombre y descripción
- Precio con "Envío gratis"
- Icono de categoría animado
- Acciones rápidas en hover:
  - Botón "Agregar" al carrito
  - Botón de vista rápida

**Efectos:**
- Elevación en hover (y: -8px)
- Efecto de brillo (shine effect)
- Overlay gradient en la imagen
- Icono con animación de rotación

### InfiniteCarousel
**Uso:** Carrusel automático de productos destacados

**Características:**
- Scroll automático continuo
- Productos duplicados para loop infinito
- Se pausa al hacer hover
- Gradientes en los extremos para efecto fade

### CategoryCarousel
**Uso:** Carrusel manual por categoría

**Características:**
- Botones de navegación izquierda/derecha
- Aparecen solo en hover
- Scroll suave
- Gradientes laterales

## 🛒 Sistema de Carrito

### Contexto del Carrito
**Archivo:** `/src/app/contexts/CartContext.tsx`

**Funciones disponibles:**
```typescript
addToCart(product: Product): void
removeFromCart(productId: string): void
updateQuantity(productId: string, quantity: number): void
clearCart(): void
getCartTotal(): number
getCartCount(): number
```

**Persistencia:**
- Se guarda en `localStorage` con la clave `mateCart`
- Se carga automáticamente al iniciar la app
- Se actualiza con cada cambio

### Flujo de Compra

1. **Navegar productos**: Home o categorías
2. **Ver detalle**: Click en cualquier producto
3. **Agregar al carrito**: 
   - Desde la tarjeta (botón rápido)
   - Desde el detalle (con selector de cantidad)
4. **Ir al carrito**: Click en el icono del carrito
5. **Ajustar cantidades**: Usar +/- en cada producto
6. **Finalizar**: Click en "Finalizar por WhatsApp"
7. **WhatsApp**: Se abre con mensaje pre-formateado

## 💬 Integración WhatsApp

### Configuración del Número
**Ubicación en el código:**
- `/src/app/pages/ProductDetail.tsx` (línea 61)
- `/src/app/pages/Cart.tsx` (línea 25)
- `/src/app/pages/Home.tsx` (línea 190)

**Formato actual:**
```javascript
https://wa.me/5491234567890
```

**Para cambiar:**
1. Reemplazar `5491234567890` con tu número
2. Formato: código de país + código de área + número (sin espacios, sin 0, sin 15)

**Ejemplo para Argentina:**
- Número: (011) 1234-5678
- WhatsApp: `5491112345678`

### Mensajes Automáticos

**Desde el carrito:**
```
Hola! Quiero realizar el siguiente pedido:

• Mate Imperial de Calabaza x2 - $9,000
• Blend Energía Natural x1 - $2,800

Total: $11,800
```

**Desde detalle de producto:**
```
Hola! Me interesa comprar:
Mate Imperial de Calabaza
Cantidad: 2
Precio: $9,000
```

**CTA general:**
```
Hola! Quiero consultar por productos
```

## 🎨 Paleta de Colores

### Colores Principales
```css
Verde Oscuro: #2F4F2F
Verde Medio: #4A7C59
Verde Muy Oscuro: #1a2e1a
Dorado/Bronce: #D4A574
Blanco: #FFFFFF
```

### Gradientes Usados
```css
/* Navbar y Footer */
from-[#2F4F2F] via-[#4A7C59] to-[#2F4F2F]

/* Fondos */
from-[#1a2e1a] via-[#2F4F2F] to-[#1a2e1a]

/* Título animado */
from-[#D4A574] via-[#f0d9b5] to-[#D4A574]

/* Tarjetas */
from-white/10 to-white/5
```

## 📊 Datos de Productos

### Estructura de Producto
```typescript
interface Product {
  id: string;
  name: string;
  category: 'mates' | 'yerba' | 'bombillas';
  price: number;
  images: string[];
  description: string;
  featured: boolean;
  specs: { label: string; value: string }[];
}
```

### Productos Disponibles
**Total: 12 productos**
- 4 Mates
- 4 Yerba & Blends
- 4 Bombillas

### Productos Destacados
- Mate Imperial de Calabaza
- Mate de Madera Premium
- Mate Torpedo Moderno
- Blend Energía Natural
- Blend Relax Nocturno
- Bombilla Premium Alpaca
- Bombilla Acero Inoxidable

### Agregar Nuevos Productos
**Archivo:** `/src/app/data/products.ts`

**Pasos:**
1. Agregar nuevo objeto al array `products`
2. Usar imágenes de Unsplash o URLs propias
3. Asignar categoría correcta
4. Marcar como `featured: true` si quieres que aparezca en el carrusel infinito
5. Agregar especificaciones relevantes

**Ejemplo:**
```typescript
{
  id: 'mate-5',
  name: 'Mate Personalizado',
  category: 'mates',
  price: 6000,
  images: [
    'https://images.unsplash.com/photo-...',
  ],
  description: 'Mate único con grabado personalizado...',
  featured: true,
  specs: [
    { label: 'Material', value: 'Calabaza premium' },
    { label: 'Personalización', value: 'Incluida' },
  ],
}
```

## 🎭 Efectos Visuales

### Animaciones con Motion

**Fade In:**
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
```

**Slide In:**
```typescript
initial={{ x: -100 }}
animate={{ x: 0 }}
```

**Scale:**
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

**Float (repetitivo):**
```typescript
animate={{ y: [0, -20, 0] }}
transition={{ repeat: Infinity, duration: 3 }}
```

### CSS Personalizado

**Gradientes Animados:**
```css
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 15s ease infinite;
}
```

**Ocultar Scrollbar:**
```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

## 📱 Responsive Design

### Breakpoints de Tailwind
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Adaptaciones por Dispositivo

**Mobile (< 640px):**
- Grid de 1 columna
- Texto reducido
- Carruseles con scroll touch
- Footer apilado

**Tablet (640px - 1024px):**
- Grid de 2-3 columnas
- Navbar completo
- Carruseles con botones

**Desktop (> 1024px):**
- Grid de 4 columnas
- Efectos hover completos
- Sidebar animado
- Footer en 3 columnas

## 🔧 Personalización Rápida

### Cambiar Nombre de Marca
**Archivos a modificar:**
- `/src/app/components/Navbar.tsx` (líneas 39-41, 94-96)
- `/src/app/components/Footer.tsx` (líneas 20-22)

### Cambiar Colores
**Archivo:** `/src/styles/index.css`
- Buscar y reemplazar los valores hex de los colores
- Mantener la coherencia en todos los archivos

### Modificar Número de WhatsApp
Ver sección "Integración WhatsApp" arriba

### Cambiar Imágenes
**Opción 1:** Usar Unsplash (actual)
**Opción 2:** Reemplazar URLs con imágenes propias
**Opción 3:** Usar el componente `ImageWithFallback` para nuevas imágenes

## 🐛 Solución de Problemas

### El carrito no persiste
- Verificar que localStorage esté habilitado
- Revisar la consola del navegador
- Limpiar localStorage: `localStorage.clear()`

### Las animaciones no funcionan
- Verificar que motion esté instalado
- Revisar la consola por errores
- Comprobar que los componentes usen `motion.div` correctamente

### Las imágenes no cargan
- Verificar conectividad a internet
- Las imágenes de Unsplash requieren conexión
- Considerar usar imágenes locales para producción

### El carrusel infinito se detiene
- Normal si se hace hover
- Se reanuda al quitar el cursor
- Verificar que no haya errores en consola

## 📚 Recursos Adicionales

### Documentación de Tecnologías
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion (Framer Motion)](https://motion.dev/)
- [Lucide Icons](https://lucide.dev/)

### Próximos Pasos Sugeridos
1. Reemplazar imágenes de Unsplash con fotos propias
2. Configurar número de WhatsApp real
3. Agregar más productos
4. Personalizar textos y descripciones
5. Considerar integrar backend (opcional)
6. Agregar Google Analytics
7. Optimizar SEO
8. Configurar dominio propio

---

**¿Necesitas ayuda?** 
- Revisa el código fuente
- Consulta la documentación de las librerías
- Experimenta con los componentes

**¡Éxitos con tu tienda MateCultura!** 🧉
