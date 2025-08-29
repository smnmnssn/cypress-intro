import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";
import LogoutButton from "../components/LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("auth")?.value;

  if (!userId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Välkommen, {user.email}!
      </h1>
      <LogoutButton />
    </main>
  );
}
