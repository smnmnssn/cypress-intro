"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Välkommen till Mäklarappen</h1>
      <p className="mb-6 text-gray-600 text-center max-w-md">
        Hantera kunder, objekt och pappersarbete smidigt – allt på ett ställe.
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Logga in
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400">
            Registrera dig
          </button>
        </Link>
      </div>
    </main>
  );
}
