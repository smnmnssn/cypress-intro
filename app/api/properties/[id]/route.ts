import { propertySchema } from "@/lib/validation/schemas";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

// GET specific property
export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
  try {
    const property = db.property.findUnique({ where: { id: params.id }});

    if (!property) {
      return NextResponse.json({ error: "Fastighetern hittades inte" }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Fastighets-fetch error:", error);
    return NextResponse.json({ error: "Fel vid hämtning" }, { status: 500 });
  }
}

// PUT: Update existing property
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsed = propertySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json( { error: parsed.error.flatten().fieldErrors }, { status: 400});
    }

    const { address, price, status } = parsed.data;
    const updated = await db.property.update({
      where: { id: params.id },
      data: { address, price, status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Uppdatering error:", error);
    return NextResponse.json({ error: "Kunde inte uppdatera objekt" }, { status: 500 });
  }
}

// DELETE: Erase existing client from list
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.property.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Fastigheten raderades" });
  } catch (error) {
    console.error("Radering error:", error);
    return NextResponse.json({ error: "Kunde inte radera objekt" }, { status: 500 });
  }
}