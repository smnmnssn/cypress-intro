import { db } from "@/prisma/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid input", errors: result.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password } = result.data;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Fel e-post eller lösenord" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Fel e-post eller lösenord" },
        { status: 401 }
      );
    }

    // Set cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("auth", user.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
