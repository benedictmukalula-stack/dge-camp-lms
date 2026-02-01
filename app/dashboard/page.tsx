export const dynamic = "force-dynamic";

export default function DashboardPage() {
  // Role-aware dashboard placeholder; will use NextAuth session on server later.
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="text-zinc-600">
        This dashboard will show different content for admins, trainers, and students
        once authentication and roles are wired up.
      </p>
    </main>
  );
}
