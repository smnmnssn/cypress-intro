"use client";

import ClientList from "./ClientList";

export default function ClientsPage() {
  return (
    <div className="p-4">
      <ClientsHeader />
      <ClientList />
    </div>
  );
}

function ClientsHeader() {
  return (
    <header className="mb-4">
      <h1 className="text-2xl font-bold">Kundhantering</h1>
      <p className="text-gray-600">Hantera, skapa och uppdatera kunder</p>
    </header>
  );
}
