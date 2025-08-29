// app/api/auth/register/route.ts

import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcrypt"
import { db } from "@/prisma/db" // Justera om din db.ts ligger annorlunda

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  const body = await req.json()
  const result = registerSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid input", errors: result.error.flatten() },
      { status: 400 }
    )
  }

  const { email, password } = result.data

  try {
    const existingUser = await db.user.findUnique({ where: { email } })

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: "User created", user: { id: user.id, email: user.email } },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
