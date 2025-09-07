"use client";

import { logoutUser } from "@/app/login/actions";

export default function LogoutButton() {
  async function handleLogout() {
    try {
      await logoutUser();
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
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
