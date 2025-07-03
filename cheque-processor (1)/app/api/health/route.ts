import { NextResponse } from "next/server"

export async function GET() {
  // Simuler une vérification de l'état de l'API
  const isHealthy = true

  if (isHealthy) {
    return NextResponse.json({
      status: "ok",
      message: "API is running",
      timestamp: new Date().toISOString(),
    })
  } else {
    return NextResponse.json(
      {
        status: "error",
        message: "API is not available",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    )
  }
}
