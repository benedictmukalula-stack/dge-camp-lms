import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const role = (session.user as any)?.role ?? "student";

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="text-zinc-600 mb-4">
        Signed in as {session.user?.email} ({role || "no role"}).
      </p>
      <p className="text-zinc-600">
        This dashboard will show different content for admins, trainers, and students
        based on their assigned roles.
      </p>
    </main>
  );
}
