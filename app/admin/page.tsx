import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const role = (session.user as any)?.role;

  if (role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      <p className="text-zinc-600 mb-2">
        Course, cohort, delegate, and invoice management will live here.
      </p>
      <ul className="list-disc list-inside text-zinc-600 space-y-1">
        <li>Manage courses and lessons</li>
        <li>Organize cohorts and enrollments</li>
        <li>Track invoices and payments</li>
      </ul>
    </main>
  );
}
