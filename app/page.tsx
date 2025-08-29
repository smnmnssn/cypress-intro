import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/prisma/db";

export default async function Home() {
  const cookieStore = cookies();
  const userId = cookieStore.get("auth")?.value;

  if (!userId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) {
    redirect("/login");
  }

  // Om användaren finns och är inloggad, redirecta till dashboard
  redirect("/dashboard");
}
