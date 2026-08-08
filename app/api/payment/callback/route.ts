import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Redirect the user to https://uaterp.gbru.in/app using 303 See Other, forcing browser to do a GET request
    return NextResponse.redirect('https://uaterp.gbru.in/app', 303);
  } catch (error) {
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Fallback GET support
export async function GET(request: Request) {
  return NextResponse.redirect('https://uaterp.gbru.in/app', 302);
}
