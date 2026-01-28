import { createClient, type QueryParams } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

// Check if Sanity is configured
export const isSanityConfigured = Boolean(projectId);

// Create client only if configured
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Use CDN for production
    })
  : null;

// Preview client (no CDN, with token)
export const previewClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

/**
 * Fetch data from Sanity with proper error handling
 */
export async function sanityFetch<T>(
  query: string,
  params?: QueryParams
): Promise<T | null> {
  if (!client) {
    console.warn(
      'Sanity client not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local'
    );
    return null;
  }

  try {
    if (params) {
      return await client.fetch<T>(query, params);
    }
    return await client.fetch<T>(query);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}

/**
 * Fetch preview data from Sanity (bypasses CDN)
 */
export async function sanityPreviewFetch<T>(
  query: string,
  params?: QueryParams
): Promise<T | null> {
  if (!previewClient) {
    console.warn('Sanity preview client not configured');
    return null;
  }

  try {
    if (params) {
      return await previewClient.fetch<T>(query, params);
    }
    return await previewClient.fetch<T>(query);
  } catch (error) {
    console.error('Sanity preview fetch error:', error);
    return null;
  }
}

export { projectId, dataset, apiVersion };
