import { NextResponse } from "next/server";

export async function GET() {
  const apiBaseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  if (!apiBaseUrl || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "API credentials are not configured in environment variables." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/api/method/shoption_api.erp_api.category_api.get_categories`,
      {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "X-API-SECRET": apiSecret,
          "Content-Type": "application/json",
        },
        cache: "no-store", // Ensure dynamic fetching
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch from ERP API: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("CATEGORIES FETCH ERROR:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while fetching categories." },
      { status: 500 }
    );
  }
}
