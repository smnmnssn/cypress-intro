// app/api/clients/route.ts
import { clientSchema } from "@/lib/validation/registerSchema";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

// PUT: Update existing client
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    const validatedData = clientSchema.parse(body);
    const updatedClient = await db.client.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedClient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Kunde inte uppdatera kunduppgifter", details: error },
      { status: 400 }
    );
  }
}

// DELETE: Erase existing client from list
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await db.client.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Kund raderad" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Kunde inte radera klient", details: error },
      { status: 400 }
    );
  }
}
