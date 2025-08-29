"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login"; 
  }

  return (
    <button
      onClick={handleLogout}
      data-cy="logout"
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Logga ut
    </button>
  );
}
