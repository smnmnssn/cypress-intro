"use client";
import { useEffect, useState } from "react";
import PropertyRow from "../components/PropertyRow";
import Modal from "./Modal";
import PropertyForm, { PropertyCreateInput } from "./PropertyForm";

export type Property = {
  id: string;
  address: string;
  price: number;
  status: string;
};

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    async function loadProperties() {
      const res = await fetch("/api/properties");
      if (res.ok) {
        const data: Property[] = await res.json();
        setProperties(data);
      }
    }
    loadProperties();
  }, []);

  async function handleCreate(payload: PropertyCreateInput) {
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Create failed");
    }

    const created: Property = await res.json();
    setProperties((prev) => [created, ...prev]);
    setIsCreateOpen(false);
  }

  function handleUpdate(updated: Property) {
    setProperties((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  }

  function handleDelete(id: string) {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h1 data-cy="property-title">Fastigheter</h1>

      <button
        id="create-new-button"
        onClick={() => setIsCreateOpen(true)}
        className="border px-3 py-2"
        data-cy="create-new-button"
      >
        Skapa ny
      </button>

      <ol id="property-list" className="mt-4" data-cy="property-list">
        {properties.map((property) => (
          <PropertyRow
            key={property.id}
            property={property}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ol>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Ny fastighet"
      >
        <PropertyForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>
    </div>
  );
}
