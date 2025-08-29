import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth");

  if (!authCookie) {
    redirect("/login");
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Välkommen, Test User!</h1>
      <form action="/api/auth/logout" method="POST">
        <button
          data-cy="logout"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logga ut
        </button>
      </form>
    </main>
  );
}
