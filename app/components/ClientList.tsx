// components/clients/ClientList.tsx
"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ClientForm, { ClientCreateInput } from "./ClientForm";
import ClientRow from "./ClientRow";
import Modal from "./Modal";

export type Client = {
  id: string;
  name: string;
  email: string;
  address: string;
};

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    async function loadClients() {
      const res = await fetch("/api/clients");
      if (res.ok) {
        const data: Client[] = await res.json();
        setClients(data);
      }
    }
    loadClients();
  }, []);

  async function handleCreate(payload: ClientCreateInput) {
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Create failed");
    }

    const created: Client = await res.json();
    setClients((prev) => [created, ...prev]);
    setIsCreateOpen(false);
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
