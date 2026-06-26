export const PORTRAIT_PHOTO = 'IMG-20241229-WA0067.webp';

export function imagePath(photo: string, thumb = false): string {
  const folder = thumb ? '/assets/images/thumbs/' : '/assets/images/';
  return folder + encodeURIComponent(photo);
}

export const portraitThumb = imagePath(PORTRAIT_PHOTO, true);
export const portraitFull = imagePath(PORTRAIT_PHOTO, false);
