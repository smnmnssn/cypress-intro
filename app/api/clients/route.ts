// app/api/clients/route.ts
import { clientSchema } from "@/lib/validation/schemas";
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

// GET: Fetch all clients
export async function GET() {
  try {
    const clients = await db.client.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Kund-fetch error:", error);

    return NextResponse.json(
      { error: "Något gick fel vid hämtning av kunder" },
      { status: 500 }
    );
  }
}

// POST: Create new client
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = clientSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email } = parsed.data;
    const newClient = await db.client.create({
      data: { name, email },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("Skapa kund error", error);

    return NextResponse.json(
      { error: "Kunde inte skapa kund" },
      { status: 500 }
    );
  }
}
