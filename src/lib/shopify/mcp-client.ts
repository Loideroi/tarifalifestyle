import type {
  MCPRequest,
  MCPResponse,
  MCPToolsListResult,
  MCPSearchResult,
  MCPParsedResponse,
  ShopifyProduct,
} from './types';

const STORE_MCP_ENDPOINT = 'https://tarifairforce.com/api/mcp';

/**
 * Make a JSON-RPC request to the Shopify MCP endpoint
 */
export async function mcpRequest<T>(
  method: string,
  params?: Record<string, unknown>
): Promise<T> {
  const request: MCPRequest = {
    jsonrpc: '2.0',
    method,
    id: Date.now(),
    params,
  };

  const response = await fetch(STORE_MCP_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`MCP request failed: ${response.status}`);
  }

  const data: MCPResponse<T> = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (data.result === undefined) {
    throw new Error('MCP response missing result');
  }

  return data.result;
}

/**
 * List all available MCP tools
 */
export async function listMCPTools(): Promise<MCPToolsListResult> {
  return mcpRequest<MCPToolsListResult>('tools/list');
}

/**
 * Search products using the MCP search_shop_catalog tool
 */
export async function searchProducts(
  query: string,
  context?: string
): Promise<MCPSearchResult> {
  return mcpRequest<MCPSearchResult>('tools/call', {
    name: 'search_shop_catalog',
    arguments: {
      query,
      context:
        context ||
        'Customer interested in beach lifestyle and kitesurfing products',
    },
  });
}

/**
 * Parse the JSON text content from an MCP search result into structured data.
 * The MCP returns content[0].text as a JSON string with products, pagination, etc.
 */
export function parseMCPTextContent(
  result: MCPSearchResult
): MCPParsedResponse | null {
  if (!result.content || result.content.length === 0) {
    return null;
  }

  try {
    const text = result.content[0].text;
    const parsed = JSON.parse(text) as MCPParsedResponse;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Parse products from MCP search result text
 * The MCP returns product info as formatted text, this extracts structured data
 */
export function parseProductsFromMCPResult(
  result: MCPSearchResult
): ShopifyProduct[] {
  // Legacy function kept for compatibility - prefer parseMCPTextContent()
  return [];
}

/**
 * Get featured products for homepage display
 */
export async function getFeaturedProducts(): Promise<MCPSearchResult | null> {
  try {
    const result = await searchProducts(
      'featured bestseller popular',
      'Looking for featured products to display on homepage'
    );
    return result;
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return null;
  }
}

/**
 * Search products by category
 */
export async function searchProductsByCategory(
  category: string
): Promise<MCPSearchResult | null> {
  try {
    const result = await searchProducts(
      category,
      `Looking for ${category} products in the store`
    );
    return result;
  } catch (error) {
    console.error(`Failed to search products for category ${category}:`, error);
    return null;
  }
}

/**
 * Get the store URL for linking to products
 */
export function getStoreProductUrl(
  handle: string,
  utmSource = 'tarifalifestyle'
): string {
  const baseUrl = `https://tarifairforce.com/products/${handle}`;
  const params = new URLSearchParams({
    utm_source: utmSource,
    utm_medium: 'referral',
    utm_campaign: 'lifestyle',
  });
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Get the main store URL
 */
export function getStoreUrl(utmSource = 'tarifalifestyle'): string {
  const params = new URLSearchParams({
    utm_source: utmSource,
    utm_medium: 'referral',
    utm_campaign: 'lifestyle',
  });
  return `https://tarifairforce.com?${params.toString()}`;
}
