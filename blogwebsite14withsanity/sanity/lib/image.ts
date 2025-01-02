import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

// Import environment variables for Sanity configuration
import { dataset, projectId } from '../env';

// Ensure the projectId and dataset are correctly set
if (!projectId || !dataset) {
  console.error('Sanity projectId or dataset is not configured properly.');
}

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

// Fallback image URL (placeholder)
const fallbackImage = 'https://via.placeholder.com/150';

/**
 * Generates a URL for a given Sanity image source.
 *
 * @param source - The Sanity image object
 * @returns The URL of the image or a fallback URL if source is invalid
 */
export const urlForImage = (source: Image) => {
  if (!source) {
    console.warn('Image source is invalid or undefined.');
    return fallbackImage; // Return fallback URL
  }

  try {
    return imageBuilder?.image(source).auto('format').fit('max').url() || fallbackImage;
  } catch (error) {
    console.error('Error generating image URL:', error);
    return fallbackImage; // Return fallback URL in case of error
  }
};

// Debugging: Log the builder configuration during development
if (process.env.NODE_ENV === 'development') {
  console.log('Sanity Image Builder Config:', {
    projectId,
    dataset,
  });
}
