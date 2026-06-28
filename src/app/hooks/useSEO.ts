import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product';
  price?: number;
}

const BASE_URL = 'https://laeugenia.vercel.app';
const DEFAULT_IMAGE = `${BASE_URL}/og.png`;
const SITE_NAME = 'La Eugenia & Flia.';

function setMeta(selector: string, content: string) {
  const el = document.querySelector(selector) as HTMLMetaElement | null;
  if (el) el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSEO({ title, description, image, url, type = 'website', price }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const resolvedImage = image || DEFAULT_IMAGE;
    const resolvedUrl = url ? `${BASE_URL}${url}` : BASE_URL;
    const resolvedDesc =
      description ||
      'Mates artesanales, yerbas, bombillas y accesorios materos. Envíos a todo el país.';

    // Título de la pestaña
    document.title = fullTitle;

    // Meta básicos
    setMeta('meta[name="description"]', resolvedDesc);

    // Canonical
    setLink('canonical', resolvedUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', resolvedDesc);
    setMeta('meta[property="og:image"]', resolvedImage);
    setMeta('meta[property="og:image:alt"]', fullTitle);
    setMeta('meta[property="og:url"]', resolvedUrl);
    setMeta('meta[property="og:type"]', type === 'product' ? 'product' : 'website');

    // Twitter
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', resolvedDesc);
    setMeta('meta[name="twitter:image"]', resolvedImage);
    setMeta('meta[name="twitter:image:alt"]', fullTitle);

    // Precio para og:product (si aplica)
    if (type === 'product' && price !== undefined) {
      setMeta('meta[property="product:price:amount"]', price.toString());
      setMeta('meta[property="product:price:currency"]', 'ARS');
    }

    // Restaurar valores base al desmontar
    return () => {
      document.title = `${SITE_NAME} | Mates, Yerbas y Bombillas Artesanales`;
      setMeta('meta[name="description"]', 'Tienda online de mates artesanales, yerbas, bombillas y accesorios materos. Calidad artesanal con envíos a todo el país.');
      setLink('canonical', BASE_URL + '/');
      setMeta('meta[property="og:title"]', `${SITE_NAME} | Mates Artesanales`);
      setMeta('meta[property="og:description"]', 'Mates artesanales, yerbas, bombillas y accesorios. Envíos a todo el país.');
      setMeta('meta[property="og:image"]', DEFAULT_IMAGE);
      setMeta('meta[property="og:image:alt"]', `${SITE_NAME} - Mates artesanales argentinos`);
      setMeta('meta[property="og:url"]', BASE_URL + '/');
      setMeta('meta[property="og:type"]', 'website');
      setMeta('meta[name="twitter:title"]', `${SITE_NAME} | Mates Artesanales`);
      setMeta('meta[name="twitter:description"]', 'Mates artesanales, yerbas, bombillas y accesorios. Envíos a todo el país.');
      setMeta('meta[name="twitter:image"]', DEFAULT_IMAGE);
      setMeta('meta[name="twitter:image:alt"]', `${SITE_NAME} - Mates artesanales argentinos`);
    };
  }, [title, description, image, url, type, price]);
}
