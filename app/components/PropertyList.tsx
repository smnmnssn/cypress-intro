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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { useEffect, useState } from "react";
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
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

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

        <Accordion type="single" collapsible asChild>
          <TableBody data-cy="property-list">
            {properties.map((property) => (
              <AccordionItem key={property.id} value={property.id.toString()}>
                <AccordionTrigger asChild>
                  <TableRow
                    data-cy="property-item"
                    className="cursor-pointer hover:bg-gray-100 w-full"
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
                </AccordionTrigger>

                <AccordionContent asChild>
                  <TableRow>
                    <TableCell colSpan={4} className="bg-gray-50 p-4">
                      <div className="flex gap-4">
                        <img
                          /* src={property.imageUrl} */
                          alt={property.address}
                          className="w-32 h-24 object-cover rounded"
                        />
                        <div>
                          <p>
                            <strong>Beskrivning:</strong>{" "}
                            {/* {property.description} */}
                          </p>
                          <p>
                            <strong>Rum:</strong> {/* {property.rooms} */}
                          </p>
                          <p>
                            <strong>Byggår:</strong> {/* {property.year} */}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </AccordionContent>
              </AccordionItem>
            ))}
          </TableBody>
        </Accordion>
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
    </div>
  );
}
