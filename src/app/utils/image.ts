/**
 * Convierte una URL de Google Drive al formato directo para usar en <img>.
 * Soporta:
 *   https://drive.google.com/file/d/FILE_ID/view?...
 *   https://drive.google.com/open?id=FILE_ID
 * Cualquier otra URL la devuelve sin cambios.
 */
/**
 * Comprime una imagen usando Canvas antes de subirla.
 * Escala a máximo 1920px y reduce calidad JPEG hasta quedar bajo 2MB.
 * Esto evita superar el límite de 4.5MB de Vercel en las funciones serverless.
 */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const MAX_DIM = 1920;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width >= height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);

        // Reducir calidad iterativamente hasta quedar bajo ~2MB en base64
        let quality = 0.85;
        let result = canvas.toDataURL('image/jpeg', quality);
        while (result.length > 2 * 1024 * 1024 * 1.37 && quality > 0.3) {
          quality = Math.round((quality - 0.1) * 10) / 10;
          result = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(result);
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function resolveImageUrl(url: string): string {
  if (!url) return url;

  // formato: /file/d/ID/view
  const matchFile = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
  if (matchFile) {
    return `https://drive.google.com/thumbnail?id=${matchFile[1]}&sz=w800`;
  }

  // formato: open?id=ID
  const matchOpen = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (matchOpen) {
    return `https://drive.google.com/thumbnail?id=${matchOpen[1]}&sz=w800`;
  }

  return url;
}
