interface CoursePageProps {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export default function CourseDetailPage({ params }: CoursePageProps) {
  const { id } = params;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Course {id}</h1>
      <p className="text-zinc-600 mb-4">
        This page will show details for the selected course and allow enrollment.
      </p>
      <button
        type="button"
        className="rounded-full bg-black px-4 py-2 text-white text-sm font-medium hover:bg-zinc-800"
      >
        Enroll
      </button>
    </main>
  );
}
