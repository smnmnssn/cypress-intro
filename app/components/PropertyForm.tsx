"use client";

import { useState } from "react";
import { z } from "zod";
import { propertySchema } from "@/lib/validation/schemas";

export type PropertyCreateInput = z.infer<typeof propertySchema>;

type PropertyFormProps = {
  onSubmit: (payload: PropertyCreateInput) => Promise<void> | void;
  onCancel?: () => void;
  showCancel?: boolean;
  initial?: Partial<PropertyCreateInput>;
};

export default function PropertyForm({
  onSubmit,
  onCancel,
  showCancel = true,
  initial = {},
}: PropertyFormProps) {
  const [address, setAddress] = useState(initial.address ?? "");
  const [price, setPrice] = useState(initial.price?.toString() ?? "");
  const [status, setStatus] = useState(initial.status ?? "");
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    try {
      const data = propertySchema.parse({
        address,
        price,
        status,
      });

      setPending(true);
      await onSubmit(data);

      if (!initial.address) {
        setAddress("");
        setPrice("");
        setStatus("");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.issues.map((issue) => issue.message));
        return;
      }
      setErrors(["Något gick fel. Försök igen."]);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} data-cy="property-create-form">
      <div className="flex flex-col gap-2">
        <label>
          Adress
          <input
            data-cy="input-adress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <label>
          Pris
          <input
            data-cy="input-pris"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <label>
          Status
          <input
            data-cy="input-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        {errors.length > 0 && (
          <ul>
            {errors.map((msg, i) => (
              <li key={i} className="text-red-600" data-cy="error-message">
                {msg}
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-2 mt-2">
          <button
            data-cy="submit-button"
            type="submit"
            disabled={pending}
            className="border px-3 py-2"
          >
            {pending ? "Sparar..." : "Spara"}
          </button>
          {showCancel && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="border px-3 py-2"
            >
              Avbryt
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
