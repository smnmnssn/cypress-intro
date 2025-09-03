import { propertySchema } from "@/lib/validation/schemas";
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

// GET: Fetch all properties
export async function GET() {
  try {
    const properties = await db.property.findMany({
      orderBy: { address: "asc" },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Fastighets-fetch error:", error);

    return NextResponse.json(
      { error: "Något gick fel vid hämtning av fastigheter" },
      { status: 500 }
    );
  }
}

// POST: Create new property
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = propertySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { address, price, status } = parsed.data;
    const newProperty = await db.property.create({
      data: { address, price, status },
    });

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Skapa objekt error", error);

    return NextResponse.json(
      { error: "Kunde inte skapa objekt" },
      { status: 500 }
    );
  }
}

