import type { ClientCreateInput } from "../components/Clients/ClientForm";
import type { Client } from "../components/Clients/ClientList";

// Fetch all clientts
export async function getClients(): Promise<Client[]> {
  const res = await fetch("/api/clients", { method: "GET" });

  if (!res.ok) {
    throw new Error("Kunde inte hämta kunder");
  }

  return res.json();
}

// Create new client
export async function createClient(
  payload: ClientCreateInput
): Promise<Client> {
  const res = await fetch("/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Kunde inte skapa kund");
  }

  return res.json();
}

// Update existing client
export async function updateClient(
  id: string,
  payload: ClientCreateInput
): Promise<Client> {
  const res = await fetch(`/api/clients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Kunde inte uppdatera kund");
  }

  return res.json();
}

// Delete client
export async function deleteClient(id: string): Promise<void> {
  const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Kunde inte radera kund");
  }
}
