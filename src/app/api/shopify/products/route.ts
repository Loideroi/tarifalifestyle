import { NextRequest, NextResponse } from 'next/server';
import {
  searchProducts,
  getFeaturedProducts,
  listMCPTools,
} from '@/lib/shopify/mcp-client';

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
          { error: 'Failed to fetch featured products' },
          { status: 500 }
        );
      }
      return NextResponse.json(result);
    }

    // Search products by query
    if (query) {
      const result = await searchProducts(query);
      return NextResponse.json(result);
    }

    // Default: return featured products
    const result = await getFeaturedProducts();
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }
    return NextResponse.json(result);
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
    return NextResponse.json(result);
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
