import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Utloggning lyckades" },
    { status: 200 }
  );

  // Remove cookie
  response.cookies.set("auth", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
