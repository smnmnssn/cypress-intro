// components/clients/ClientList.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ClientForm, { ClientCreateInput } from "./ClientForm";
import ClientRow from "./ClientRow";
import Modal from "./Modal";
import { getClients, createClient } from "@/app/clients/actions"; 

export type Client = {
  id: string;
  name: string;
  email: string;
  address: string;
};

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // 👇 hämta klienter via action
  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error("Kunde inte hämta klienter:", error);
      }
    }
    loadClients();
  }, []);

  // 👇 skapa ny klient via action
  async function handleCreate(payload: ClientCreateInput) {
    try {
      const created = await createClient(payload);
      setClients((prev) => [created, ...prev]);
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Kunde inte skapa klient:", error);
      throw error; // låt formuläret fånga och visa felet
    }
  }

  function handleUpdate(updated: Client) {
    setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }

  function handleDelete(id: string) {
    setClients((prev) => prev.filter((cc) => cc.id !== id));
  }

  return (
    <div>
      <h1 data-cy="clients-title" className="text-6xl">
        Kunder
      </h1>

      <Button
        id="create-new-button"
        onClick={() => setIsCreateOpen(true)}
        className="border px-3 py-2 mt-5 font-bold bg-green-600"
      >
        + Skapa ny
      </Button>

      <ol id="client-list" className="mt-4 mb-5 font-bold">
        {clients.map((client) => (
          <ClientRow
            key={client.id}
            client={client}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ol>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Ny kund"
      >
        <ClientForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>
    </div>
  );
}
