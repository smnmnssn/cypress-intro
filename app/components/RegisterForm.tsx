"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email({ message: "Ogiltig e-postadress" }),
  password: z.string().min(6, { message: "Minst 6 tecken" }),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Lösenorden matchar inte",
  path: ["confirmPassword"],
});

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = { email, password, confirmPassword };
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError(
        fieldErrors.email?.[0] ||
        fieldErrors.password?.[0] ||
        fieldErrors.confirmPassword?.[0] ||
        "Felaktig inmatning"
      );
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Registreringen misslyckades");
      }
    } catch {
      setError("Serverfel. Försök igen senare.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Skapa konto</h2>

      {error && <p className="text-red-600">{error}</p>}

      <input
      name="email"
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
      name="password"
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
      name="confirmPassword"
        type="password"
        placeholder="Bekräfta lösenord"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        data-cy="register-submit"
      >
        Registrera
      </button>
    </form>
  );
}
