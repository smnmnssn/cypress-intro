"use client";

import PropertyList from "./PropertyList";

export default function PropertiesPage() {
  return (
    <div className="p-4">
      <PropertiesHeader />
      <PropertyList />
    </div>
  );
}

function PropertiesHeader() {
  return (
    <header className="mb-4">
      <h1 data-cy="property-title" className="text-2xl font-bold">
        Fastighetshantering
      </h1>
      <p className="text-gray-600">Hantera, skapa och uppdatera fastigheter</p>
    </header>
  );
}
