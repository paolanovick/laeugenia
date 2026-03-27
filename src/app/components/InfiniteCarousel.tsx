import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface InfiniteCarouselProps {
  products: Product[];
}

export const InfiniteCarousel = ({ products }: InfiniteCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pause on hover (desktop) and touch (mobile)
    const pause = () => { if (animationId) cancelAnimationFrame(animationId); };
    const resume = () => { animationId = requestAnimationFrame(scroll); };

    scrollContainer.addEventListener('mouseenter', pause);
    scrollContainer.addEventListener('mouseleave', resume);
    scrollContainer.addEventListener('touchstart', pause, { passive: true });
    scrollContainer.addEventListener('touchend', resume, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', pause);
      scrollContainer.removeEventListener('mouseleave', resume);
      scrollContainer.removeEventListener('touchstart', pause);
      scrollContainer.removeEventListener('touchend', resume);
    };
  }, []);

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#120505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#120505] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden cursor-pointer touch-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedProducts.map((product, index) => (
          <motion.div
            key={`${product.id}-${index}`}
            className="flex-shrink-0 w-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};