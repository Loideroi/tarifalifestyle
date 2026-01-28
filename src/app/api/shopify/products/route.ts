import { NextRequest, NextResponse } from 'next/server';
import {
  searchProducts,
  getFeaturedProducts,
  listMCPTools,
  parseMCPTextContent,
} from '@/lib/shopify/mcp-client';
import type { MCPSearchResult } from '@/lib/shopify/types';

/**
 * Parse an MCP result and return structured product data.
 * Falls back to an empty products array if parsing fails.
 */
function toProductResponse(result: MCPSearchResult) {
  const parsed = parseMCPTextContent(result);
  if (parsed) {
    return parsed;
  }
  return { products: [], pagination: null, available_filters: [] };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const action = searchParams.get('action');

  try {
    // List available MCP tools
    if (action === 'tools') {
      const tools = await listMCPTools();
      return NextResponse.json(tools);
    }

    // Get featured products for homepage
    if (action === 'featured') {
      const result = await getFeaturedProducts();
      if (!result) {
        return NextResponse.json(
          { products: [], pagination: null, available_filters: [] }
        );
      }
      return NextResponse.json(toProductResponse(result));
    }

    // Search products by query
    if (query) {
      const result = await searchProducts(query);
      return NextResponse.json(toProductResponse(result));
    }

    // Default: return featured products
    const result = await getFeaturedProducts();
    if (!result) {
      return NextResponse.json(
        { products: [], pagination: null, available_filters: [] }
      );
    }
    return NextResponse.json(toProductResponse(result));
  } catch (error) {
    console.error('Shopify API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, context } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const result = await searchProducts(query, context);
    return NextResponse.json(toProductResponse(result));
  } catch (error) {
    console.error('Shopify API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to search products',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
