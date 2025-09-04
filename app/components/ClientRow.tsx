import { clientSchema } from "@/lib/validation/schemas";
import { useState } from "react";
import { z } from "zod";
import type { ClientCreateInput } from "./ClientForm";
import type { Client } from "./ClientList";
import { updateClient, deleteClient } from "@/app/clients/actions"; 

type ClientRowProps = {
  client: Client;
  onUpdate: (updated: Client) => void;
  onDelete?: (id: string) => void;
};

export default function ClientRow({ client, onUpdate, onDelete }: ClientRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [address, setAddress] = useState(client.address);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const parsed: ClientCreateInput = clientSchema.parse({
        name,
        email,
        address,
      });

      setPending(true);

      const updated = await updateClient(client.id, parsed);

      onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
        return;
      }
      setError("Något gick fel vid uppdatering");
    } finally {
      setPending(false);
    }
  }

  async function handleDelete() {
    setError(null);
    setPending(true);

    try {
      await deleteClient(client.id);

      if (onDelete) {
        onDelete(client.id);
      }
    } catch (err) {
      console.error(err);
      setError("Något gick fel vid radering");
    } finally {
      setPending(false);
    }
  }

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleSave}>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {error && <p className="text-red-600">{error}</p>}
          <button type="submit" disabled={pending}>
            {pending ? "Sparar..." : "Spara"}
          </button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Avbryt
          </button>
        </form>
      </li>
    );
  }

  return (
    <li>
      <span>{client.name}</span> - <span>{client.email}</span>{" "}
      {client.address ? "-" : ""} <span>{client.address}</span>
      <button
        className="edit-button ml-2 border px-2 py-1"
        onClick={() => setIsEditing(true)}
        id="edit-button"
      >
        Redigera
      </button>
      <button
        onClick={handleDelete}
        disabled={pending}
        id="delete-button"
        className="delete-button ml-2 border px-2 py-1"
      >
        {pending ? "Raderar..." : "Radera"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </li>
  );
}
