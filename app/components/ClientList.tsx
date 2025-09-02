// components/clients/ClientList.tsx
"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ClientForm, { ClientCreateInput } from "./ClientForm";

export type Client = {
  id: string;
  name: string;
  email: string;
  address: string;
}

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    async function loadClients() {
      const res = await fetch ("/api/clients");
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


  return (
    <div>
      <h1 data-cy="clients-title">Kunder</h1>

      <button
        id="create-new-button"
        onClick={() => setIsCreateOpen(true)}
        className="border px-3 py-2"
      >
        Skapa ny
      </button>

        <ol id="client-list" className="mt-4">
        {clients.map((client) => (
          <li key={client.id}>
            <span>{client.name}</span>
            <button className="edit-button ml-2 border px-2 py-1">Redigera</button>
            <button className="delete-button ml-2 border px-2 py-1">Radera</button>
          </li>
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
};
