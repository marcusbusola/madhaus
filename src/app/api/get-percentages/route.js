import { NextResponse } from 'next/server';
import { getIssuePercentages } from '@/app/lib/db';

// Simple in-memory cache
let percentagesCache = null;
let cacheTimestamp = null;
const CACHE_TTL = 60000; // 1 minute

export async function GET() {
  try {
    const now = Date.now();

    // Return cached data if fresh
    if (percentagesCache && cacheTimestamp && (now - cacheTimestamp < CACHE_TTL)) {
      return NextResponse.json({ percentages: percentagesCache, cached: true });
    }

    // Fetch fresh data
    const percentages = await getIssuePercentages();

    // Update cache
    percentagesCache = percentages;
    cacheTimestamp = now;

    return NextResponse.json({ percentages, cached: false });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
