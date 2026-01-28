// Shopify MCP Types

export interface MCPRequest {
  jsonrpc: '2.0';
  method: string;
  id: number;
  params?: Record<string, unknown>;
}

export interface MCPResponse<T = unknown> {
  jsonrpc: '2.0';
  id: number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export interface MCPToolsListResult {
  tools: MCPTool[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  vendor: string;
  productType: string;
  tags: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: {
    url: string;
    altText: string | null;
  };
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export interface ProductSearchResult {
  products: ShopifyProduct[];
  totalCount: number;
}

export interface MCPSearchResult {
  content: Array<{
    type: 'text';
    text: string;
  }>;
}

// Product data as returned inside the MCP text content JSON
export interface MCPProduct {
  product_id: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  image_alt_text: string;
  price_range: {
    min: string;
    max: string;
    currency: string;
  };
  product_type: string;
  tags: string[];
  variants: Array<{
    variant_id: string;
    title: string;
    price: string;
    currency: string;
    image_url: string;
    available: boolean;
  }>;
}

export interface MCPParsedResponse {
  products: MCPProduct[];
  pagination: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
    currentPage: number;
    nextPage: number | null;
    maxPages: number;
    limitReached: boolean;
  };
  available_filters: Array<{
    label: string;
    values: {
      label: string[];
      input_options: Array<{
        label: string;
        input: Record<string, unknown>;
      }>;
    };
  }>;
}
