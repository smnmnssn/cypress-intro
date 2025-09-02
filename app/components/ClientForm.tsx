"use client";

import { clientSchema } from "@/lib/validation/schemas";
import { useState } from "react";
import { z } from "zod";

export type ClientCreateInput = z.infer<typeof clientSchema>;

type ClientFormProps = {
  onSubmit: (payload: ClientCreateInput) => Promise<void> | void;
  onCancel?: () => void;
  showCancel?: boolean;
  initial?: Partial<ClientCreateInput>;
};

export default function ClientForm({
  onSubmit,
  onCancel,
  showCancel = true,
  initial = {},
}: ClientFormProps) {
  const [name, setName] = useState(initial.name ?? "");
  const [email, setEmail] = useState(initial.email ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      // Validera med Zod
      const data = clientSchema.parse({ name, email });

      setPending(true);
      await onSubmit(data);

      // ev. rensa fälten efter lyckad submit
      setName("");
      setEmail("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Visa första valideringsfelet
        setError(err.issues[0].message);
        return;
      }
      setError("Något gick fel. Försök igen.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} data-cy="client-create-form">
      <div className="flex flex-col gap-2">
        <label>
          Namn
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <label>
          E-post
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        {error && (
          <p className="text-red-600" data-cy="client-create-error">
            {error}
          </p>
        )}

        <div className="flex gap-2 mt-2">
          <button type="submit" disabled={pending} className="border px-3 py-2">
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
