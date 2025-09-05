import { Button } from "@/components/ui/button";
import { db } from "@/prisma/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
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
    <main className="flex flex-col items-center p-6">
      {/* Logout */}
      <div className="flex w-full justify-end mb-4">
        <LogoutButton />
      </div>

      {/* Welcome centered */}
      <h1 className="text-6xl font-semibold text-center mb-12">
        {<p>Välkommen, {user.email}!</p>}{" "}
      </h1>

      {/* Cards container */}
      <div className="flex gap-6">
        <Link href="/clients" className="h-25 w-40 bg-gray-100">
          <Button
            variant="outline"
            className="w-full h-full text-xl font-semibold cursor-pointer hover:bg-gray-200"
          >
            Kunder
          </Button>
        </Link>

        <Link href="/properties" className="h-25 w-40 bg-gray-100">
          <Button
            variant="outline"
            className="w-full h-full text-xl font-semibold cursor-pointer hover:bg-gray-200"
          >
            Fastigheter
          </Button>
        </Link>
      </div>
    </main>
  );
}
