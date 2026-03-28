import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface InfiniteCarouselProps {
  products: Product[];
}

export const InfiniteCarousel = ({ products }: InfiniteCarouselProps) => {
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#120505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#120505] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div className="flex gap-6 w-max animate-carousel hover:[animation-play-state:paused]">
        {duplicatedProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className="flex-shrink-0 w-72 md:w-80">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes carousel {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-carousel {
          animation: carousel 35s linear infinite;
        }
      `}</style>
    </div>
  );
};
