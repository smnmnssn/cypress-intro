import { deleteProperty, updateProperty } from "@/app/properties/actions";
import { propertySchema } from "@/lib/validation/schemas";
import { useState } from "react";
import { z } from "zod";
import type { PropertyCreateInput } from "./PropertyForm";
import type { Property } from "./PropertyList";

type PropertyRowProps = {
  property: Property;
  onUpdate: (updated: Property) => void;
  onDelete?: (id: string) => void;
};

export default function PropertyRow({
  property,
  onUpdate,
  onDelete,
}: PropertyRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(property.address);
  const [price, setPrice] = useState(property.price.toString());
  const [status, setStatus] = useState(property.status);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const parsed: PropertyCreateInput = propertySchema.parse({
        address,
        price: Number(price),
        status,
      });

      setPending(true);

      const updated = await updateProperty(property.id, parsed);

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
      await deleteProperty(property.id);

      if (onDelete) {
        onDelete(property.id);
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
            data-cy="input-adress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            data-cy="input-pris"
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            data-cy="input-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          {error && <p className="text-red-600">{error}</p>}
          <button data-cy="submit-button" type="submit" disabled={pending}>
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
    <li data-cy="property-item">
      <span data-cy="input-adress">{property.address}</span>
      <span data-cy="input-pris">{property.price} kr - </span>
      <span data-cy="input-status">{property.status}</span>
      <button
        className="edit-button ml-2 border px-2 py-1"
        onClick={() => setIsEditing(true)}
        data-cy="edit-button"
      >
        Redigera
      </button>
      <button
        onClick={handleDelete}
        disabled={pending}
        data-cy="delete-button"
        className="delete-button ml-2 border px-2 py-1"
      >
        {pending ? "Raderar..." : "Radera"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </li>
  );
}
