/**
 * Convierte una URL de Google Drive al formato directo para usar en <img>.
 * Soporta:
 *   https://drive.google.com/file/d/FILE_ID/view?...
 *   https://drive.google.com/open?id=FILE_ID
 * Cualquier otra URL la devuelve sin cambios.
 */
export function resolveImageUrl(url: string): string {
  if (!url) return url;

  // formato: /file/d/ID/view
  const matchFile = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
  if (matchFile) {
    return `https://lh3.googleusercontent.com/d/${matchFile[1]}`;
  }

  // formato: open?id=ID
  const matchOpen = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (matchOpen) {
    return `https://lh3.googleusercontent.com/d/${matchOpen[1]}`;
  }

  return url;
}
