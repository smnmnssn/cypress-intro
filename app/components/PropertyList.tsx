"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import PropertyForm, { PropertyCreateInput } from "./PropertyForm";
import PropertyRow from "./PropertyRow";
import Modal from "./Modal";
import {
  getProperties,
  createProperty,
} from "@/app/properties/actions";

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
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Kunde inte hämta fastigheter:", error);
      }
    }
    loadProperties();
  }, []);

  async function handleCreate(payload: PropertyCreateInput) {
    try {
      const created = await createProperty(payload);
      setProperties((prev) => [created, ...prev]);
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Kunde inte skapa fastighet:", error);
      throw error;
    }
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
      <h1 data-cy="property-title" className="text-6xl">
        Fastigheter
      </h1>

      <Button
        data-cy="create-new-button"
        onClick={() => setIsCreateOpen(true)}
        className="border px-3 py-2 mt-5 font-bold bg-blue-600"
      >
        + Skapa ny fastighet
      </Button>

      <ol data-cy="property-list" className="mt-4 mb-5 font-bold">
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
