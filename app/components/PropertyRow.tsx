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

      const res = await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const updated: Property = await res.json();
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
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

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
      <li data-cy="property-item">
        <form onSubmit={handleSave}>
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            data-cy="input-adress"
          />
          <input
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            data-cy="input-pris"
          />
          <input
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            data-cy="input-status"
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            data-cy="submit-button"
            className="ml-2 border px-2 py-1"
          >
            {pending ? "Sparar..." : "Spara"}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-2 border px-2 py-1"
          >
            Avbryt
          </button>
        </form>
      </li>
    );
  }

  return (
    <li data-cy="property-item">
      <span>{property.address}</span> -{" "}
      <span>{property.price.toLocaleString("sv-SE")} kr</span> -{" "}
      <span>{property.status}</span>
      <button
        className="edit-button ml-2 border px-2 py-1"
        onClick={() => setIsEditing(true)}
        id="edit-button"
        data-cy="edit-button"
      >
        Redigera
      </button>
      <button
        onClick={handleDelete}
        disabled={pending}
        id="delete-button"
        data-cy="delete-button"
        className="delete-button ml-2 border px-2 py-1"
      >
        {pending ? "Raderar..." : "Radera"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </li>
  );
}
