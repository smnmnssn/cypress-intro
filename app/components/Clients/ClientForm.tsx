"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { clientSchema } from "@/lib/validation/schemas";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export type ClientCreateInput = z.infer<typeof clientSchema>;

type ClientFormProps = {
  onSubmit: (payload: ClientCreateInput) => Promise<void> | void;
  onCancel?: () => void;
  showCancel?: boolean;
  initialData?: Partial<ClientCreateInput>;
};

export default function ClientForm({
  onSubmit,
  onCancel,
  showCancel = true,
  initialData = {},
}: ClientFormProps) {
  const [name, setName] = useState(initialData.name ?? "");
  const [email, setEmail] = useState(initialData.email ?? "");
  const [address, setAddress] = useState(initialData.address ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const data = clientSchema.parse({ name, email, address });

      setPending(true);
      await onSubmit(data);

      setName("");
      setEmail("");
      setAddress("");
    } catch (err) {
      if (err instanceof z.ZodError) {
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
            data-cy="input-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <label>
          E-post
          <input
            data-cy="input-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <label>
          Adress
          <input
            data-cy="input-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Något gick fel.</AlertTitle>
            <AlertDescription>
              <p className="text-red-600" data-cy="client-create-error">
                {error}
              </p>
            </AlertDescription>
          </Alert>
        )}
        <div className="flex gap-2 mt-2">
          <button
            data-cy="submit-button"
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
