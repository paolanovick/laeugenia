import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';

type FlightRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type CartFlight = {
  id: number;
  imageSrc: string;
  imageAlt: string;
  from: FlightRect;
  to: FlightRect;
};

type FlyToCartOptions = {
  imageSrc: string;
  imageAlt?: string;
  sourceElement?: HTMLElement | null;
  fallbackElement?: HTMLElement | null;
  sourceRect?: DOMRect | null;
  fallbackRect?: DOMRect | null;
};

type SourceSelection = {
  rect: DOMRect;
  compact: boolean;
};

type CartAnimationContextType = {
  registerCartTarget: (node: HTMLElement | null) => void;
  flyToCart: (options: FlyToCartOptions) => Promise<void>;
};

const CartAnimationContext = createContext<CartAnimationContextType | undefined>(
  undefined
);

const getReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const isSmallViewport = () => window.innerWidth < 640;

const isRectVisible = (rect?: DOMRect | null) =>
  !!rect &&
  rect.width > 0 &&
  rect.height > 0 &&
  rect.bottom > 0 &&
  rect.right > 0 &&
  rect.top < window.innerHeight &&
  rect.left < window.innerWidth;

const getSourceSelection = (options: FlyToCartOptions): SourceSelection | null => {
  const primaryRect =
    options.sourceRect ?? options.sourceElement?.getBoundingClientRect();
  const fallbackRect =
    options.fallbackRect ?? options.fallbackElement?.getBoundingClientRect();
  const primaryVisible = isRectVisible(primaryRect);
  const fallbackVisible = isRectVisible(fallbackRect);

  if (fallbackRect && fallbackVisible && (!primaryVisible || isSmallViewport())) {
    return { rect: fallbackRect, compact: true };
  }

  if (primaryRect && primaryVisible) return { rect: primaryRect, compact: false };
  if (fallbackRect) return { rect: fallbackRect, compact: true };
  if (primaryRect) return { rect: primaryRect, compact: false };

  return null;
};

const normalizeSourceRect = (
  rect: DOMRect,
  compact = false
): FlightRect | null => {
  if (rect.width <= 0 || rect.height <= 0) return null;

  if (compact) {
    const size = clamp(Math.max(rect.height * 1.45, 78), 72, 104);
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return {
      left: clamp(centerX - size / 2, 12, window.innerWidth - size - 12),
      top: clamp(centerY - size / 2, 12, window.innerHeight - size - 12),
      width: size,
      height: size,
    };
  }

  const maxSize = 180;
  const scale = Math.min(1, maxSize / Math.max(rect.width, rect.height));
  const width = Math.max(46, rect.width * scale);
  const height = Math.max(46, rect.height * scale);
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const left = centerX - width / 2;
  const top = centerY - height / 2;

  return {
    left: clamp(left, 12, window.innerWidth - width - 12),
    top: clamp(top, 12, window.innerHeight - height - 12),
    width,
    height,
  };
};

const getTargetRect = (rect: DOMRect): FlightRect => {
  const size = Math.min(34, Math.max(24, Math.min(rect.width, rect.height)));
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return {
    left: centerX - size / 2,
    top: centerY - size / 2,
    width: size,
    height: size,
  };
};

const getFlightArcTop = (from: FlightRect, to: FlightRect) => {
  const midpointTop = (from.top + to.top) / 2;
  const verticalDistance = Math.abs(from.top - to.top);
  const lift = clamp(verticalDistance * 0.22, 28, 90);

  return clamp(midpointTop - lift, 24, window.innerHeight - from.height - 24);
};

export const CartAnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cartTargetRef = useRef<HTMLElement | null>(null);
  const nextFlightId = useRef(1);
  const resolvers = useRef(new Map<number, () => void>());
  const [flights, setFlights] = useState<CartFlight[]>([]);

  const registerCartTarget = useCallback((node: HTMLElement | null) => {
    cartTargetRef.current = node;
  }, []);

  const finishFlight = useCallback((id: number) => {
    setFlights((current) => current.filter((flight) => flight.id !== id));
    const resolve = resolvers.current.get(id);
    resolvers.current.delete(id);
    resolve?.();
  }, []);

  const flyToCart = useCallback(
    (options: FlyToCartOptions) => {
      const source = getSourceSelection(options);
      const targetRect = cartTargetRef.current?.getBoundingClientRect();

      if (!source || !targetRect) {
        return Promise.resolve();
      }

      const from = normalizeSourceRect(source.rect, source.compact);
      if (!from) return Promise.resolve();

      const id = nextFlightId.current++;
      const flight: CartFlight = {
        id,
        imageSrc: options.imageSrc,
        imageAlt: options.imageAlt ?? '',
        from,
        to: getTargetRect(targetRect),
      };

      return new Promise<void>((resolve) => {
        resolvers.current.set(id, resolve);
        setFlights((current) => [...current, flight]);
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      registerCartTarget,
      flyToCart,
    }),
    [flyToCart, registerCartTarget]
  );

  return (
    <CartAnimationContext.Provider value={value}>
      {children}
      <div className="fixed inset-0 pointer-events-none z-[9999] [perspective:900px]">
        <AnimatePresence>
          {flights.map((flight) => {
            const midLeft = (flight.from.left + flight.to.left) / 2;
            const arcTop = getFlightArcTop(flight.from, flight.to);
            const reducedMotion = getReducedMotion();

            return (
              <motion.div
                key={flight.id}
                initial={{
                  left: flight.from.left,
                  top: flight.from.top,
                  width: flight.from.width,
                  height: flight.from.height,
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  rotateX: 0,
                  rotateY: 0,
                }}
                animate={{
                  left: [flight.from.left, midLeft, flight.to.left],
                  top: [flight.from.top, arcTop, flight.to.top],
                  width: [flight.from.width, flight.from.width * 0.7, flight.to.width],
                  height: [
                    flight.from.height,
                    flight.from.height * 0.7,
                    flight.to.height,
                  ],
                  opacity: [1, 1, 0.92, 0],
                  scale: [1, 1.12, 0.32],
                  rotate: [0, -8, 12, 0],
                  rotateX: [0, 16, 0],
                  rotateY: [0, -18, 0],
                }}
                transition={{
                  duration: reducedMotion ? 0.42 : 0.78,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.55, 1],
                }}
                onAnimationComplete={() => finishFlight(flight.id)}
                className="fixed overflow-hidden rounded-xl border border-[#F5C080]/70 bg-[#1a0a0a] shadow-2xl"
                style={{
                  boxShadow: '0 18px 42px rgba(245, 192, 128, 0.25)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={flight.imageSrc}
                  alt={flight.imageAlt}
                  className="h-full w-full object-contain p-2"
                  draggable={false}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </CartAnimationContext.Provider>
  );
};

export const useCartAnimation = () => {
  const context = useContext(CartAnimationContext);
  if (!context) {
    throw new Error('useCartAnimation must be used within a CartAnimationProvider');
  }
  return context;
};
