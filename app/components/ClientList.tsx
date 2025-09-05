"use client";

import { createClient, getClients } from "@/app/clients/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import ClientForm, { ClientCreateInput } from "./ClientForm";
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
  const [editingClient, setEditingClient] = useState<Client | null>(null);

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

  async function handleCreate(payload: ClientCreateInput) {
    try {
      const created = await createClient(payload);
      setClients((prev) => [created, ...prev]);
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Kunde inte skapa klient:", error);
      throw error;
    }
  }

  function handleUpdate(updated: Client) {
    setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingClient(null);
  }

  function handleDelete(id: string) {
    setClients((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="p-4">
      <header className="mb-4">
        <h1 data-cy="clients-title" className="text-2xl font-bold">
          Kundhantering
        </h1>
        <p className="text-gray-600">Hantera, skapa och uppdatera kunder</p>
      </header>
      <Button
        id="create-new-button"
        onClick={() => setIsCreateOpen(true)}
        className="border px-3 py-2 mt-5 bg-green-400"
      >
        + Skapa ny kund
      </Button>

      {/* Tabell med kunder */}
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Namn</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Adress</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody id="client-list">
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  id="edit-button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingClient(client)}
                >
                  Redigera
                </Button>
                <Button
                  id="delete-button"
                  variant="outline"
                  size="sm"
                  className="bg-red-400"
                  onClick={() => handleDelete(client.id)}
                >
                  Ta bort
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Skapa ny kund */}
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

      {/* Redigera kund */}
      {editingClient && (
        <Modal
          isOpen={true}
          onClose={() => setEditingClient(null)}
          title="Redigera kund"
        >
          <ClientForm
            initialData={editingClient}
            onSubmit={(payload) =>
              handleUpdate({ ...payload, id: editingClient!.id })
            }
            onCancel={() => setEditingClient(null)}
          />
        </Modal>
      )}
    </div>
  );
}
