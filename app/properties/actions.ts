import type { PropertyCreateInput } from "../components/PropertyForm";
import type { Property } from "../components/PropertyList";

// Fetch all properties/objects
export async function getProperties(): Promise<Property[]> {
  const res = await fetch("/api/properties", { method: "GET" });

  if (!res.ok) {
    throw new Error("Kunde inte hämta fastigheter");
  }

  return res.json();
}

// Create new property/object
export async function createProperty(payload: PropertyCreateInput): Promise<Property> {
  const res = await fetch("/api/properties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Kunde inte skapa fastighet");
  }

  return res.json();
}

// Update property/object
export async function updateProperty(id: string, payload: PropertyCreateInput): Promise<Property> {
  const res = await fetch(`/api/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Kunde inte uppdatera fastighet");
  }

  return res.json();
}

// Delete property/object
export async function deleteProperty(id: string): Promise<void> {
  const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Kunde inte radera fastighet");
  }
}
