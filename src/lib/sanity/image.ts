import imageUrlBuilder from '@sanity/image-url';
import { client, projectId, dataset } from './client';

// Define SanityImageSource type inline since the import path varies across versions
type SanityImageSource = Parameters<typeof imageUrlBuilder.prototype.image>[0];

// Create image builder
const builder =
  client && projectId
    ? imageUrlBuilder(client)
    : imageUrlBuilder({ projectId: projectId || '', dataset });

/**
 * Generate optimized image URL from Sanity image reference
 */
export function urlForImage(source: SanityImageSource) {
  if (!source) {
    return null;
  }
  return builder.image(source);
}

/**
 * Get image URL with specific dimensions
 */
export function getImageUrl(
  source: SanityImageSource,
  width?: number,
  height?: number
): string | null {
  if (!source) {
    return null;
  }

  let imageBuilder = builder.image(source);

  if (width) {
    imageBuilder = imageBuilder.width(width);
  }

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  return imageBuilder.url();
}

/**
 * Get responsive image URLs for srcSet
 */
export function getResponsiveImageUrls(
  source: SanityImageSource,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536]
): string {
  if (!source) {
    return '';
  }

  return widths
    .map((width) => {
      const url = builder.image(source).width(width).url();
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Get blurred placeholder data URL for image
 * Uses Sanity's LQIP (Low Quality Image Placeholder)
 */
export function getImageBlurUrl(source: SanityImageSource): string | null {
  if (!source) {
    return null;
  }

  return builder.image(source).width(20).quality(20).blur(10).url();
}

/**
 * Get cropped image URL
 */
export function getCroppedImageUrl(
  source: SanityImageSource,
  width: number,
  height: number,
  fit: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min' = 'crop'
): string | null {
  if (!source) {
    return null;
  }

  return builder.image(source).width(width).height(height).fit(fit).url();
}

/**
 * Get image with specific format
 */
export function getImageWithFormat(
  source: SanityImageSource,
  format: 'jpg' | 'png' | 'webp' = 'webp'
): string | null {
  if (!source) {
    return null;
  }

  return builder.image(source).format(format).url();
}
