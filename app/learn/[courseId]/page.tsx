interface LearnPageProps {
  params: { courseId: string };
}

export const dynamic = "force-dynamic";

export default function LearnPage({ params }: LearnPageProps) {
  const { courseId } = params;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Learn: Course {courseId}</h1>
      <p className="text-zinc-600 mb-4">
        This lesson player will show video/content and track progress.
      </p>
      <div className="rounded-lg border border-zinc-200 p-4 text-zinc-600">
        Lesson content goes here.
      </div>
    </main>
  );
}
