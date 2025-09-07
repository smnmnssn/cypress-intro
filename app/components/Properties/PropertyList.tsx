"use client";

import { createProperty, getProperties } from "@/app/properties/actions";
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
import Modal from "../Modal";
import PropertyForm, { PropertyCreateInput } from "./PropertyForm";
import PropertyModal from "./PropertyModal";

export type Property = {
  id: string;
  address: string;
  price: number;
  status: string;
};

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isPropertyOpen, setIsPropertyOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

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

  async function handlePropertyModal() {
    try {
      setIsPropertyOpen(true);
    } catch (error) {}
  }

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
    setEditingProperty(null);
  }

  function handleDelete(id: string) {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <Button
        data-cy="create-new-button"
        onClick={() => setIsCreateOpen(true)}
        className="border px-3 py-2 mt-5 bg-green-400"
      >
        + Skapa ny fastighet
      </Button>

      <Table className="mt-6 w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead>Adress</TableHead>
            <TableHead>Pris</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody data-cy="property-list">
          {properties.map((property) => (
            <>
              <TableRow
                data-cy="property-item"
                className="cursor-pointer hover:bg-gray-100 w-full"
                /* onClick="onRowClick" ÖPPNAR MODAL*/
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProperty(property);
                  setIsPropertyOpen(true);
                }}
              >
                <TableCell className=" font-medium">
                  {property.address}
                </TableCell>
                <TableCell className="">{property.price}</TableCell>
                <TableCell className="">{property.status}</TableCell>
                <TableCell className=" space-x-2">
                  <Button
                    data-cy="edit-button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProperty(property);
                    }}
                  >
                    Redigera
                  </Button>
                  <Button
                    data-cy="delete-button"
                    className="bg-red-400"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(property.id);
                    }}
                  >
                    Ta bort
                  </Button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>

      {/* Modal för skapa */}
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

      {/* Modal för redigera */}
      {editingProperty && (
        <Modal
          isOpen={true}
          onClose={() => setEditingProperty(null)}
          title="Redigera fastighet"
        >
          <PropertyForm
            initialData={editingProperty}
            onSubmit={(payload) =>
              handleUpdate({ ...payload, id: editingProperty!.id })
            }
            onCancel={() => setEditingProperty(null)}
          />
        </Modal>
      )}
      {/* Modal för att visa fastighet */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} isOpen={isPropertyOpen} onClose={() => {
          setIsPropertyOpen(false)
          setSelectedProperty(null)
        }}
        />
      )}
      
    </div>
  );
}
