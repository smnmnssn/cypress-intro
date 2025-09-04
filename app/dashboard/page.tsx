import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/prisma/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientList from "../components/ClientList";
import LogoutButton from "../components/LogoutButton";
import PropertyList from "../components/PropertyList";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("auth")?.value;

  /*if (!userId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    redirect("/login");
  } */

  return (
    <main className="p-6">
      <h1 className="text-6xl font-semibold mb-4">Välkommen, !</h1>
      <LogoutButton />
      <ClientList />
      <PropertyList />
    </main>
  );
}
