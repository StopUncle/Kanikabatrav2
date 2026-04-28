import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import LessonPlayer from "@/components/course/LessonPlayer";

interface PageProps {
  params: Promise<{ slug: string; moduleSlug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, moduleSlug, lessonSlug } = await params;
  const lesson = await prisma.courseLesson.findFirst({
    where: {
      slug: lessonSlug,
      module: { slug: moduleSlug, course: { slug } },
    },
    select: { title: true, module: { select: { course: { select: { title: true } } } } },
  });
  if (!lesson) return { title: "Lesson | Classroom" };
  return {
    title: `${lesson.title} | ${lesson.module.course.title}`,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, moduleSlug, lessonSlug } = await params;
  await requireServerAuth(
    `/consilium/classroom/${slug}/${moduleSlug}/${lessonSlug}`,
  );

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { sortOrder: "asc" },
        include: {
          lessons: {
            orderBy: { sortOrder: "asc" },
          },
        },
      },
    },
  });

  if (!course || !course.isActive) notFound();

  const allLessons = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ module: m, lesson: l })),
  );
  const currentIndex = allLessons.findIndex(
    (entry) =>
      entry.module.slug === moduleSlug && entry.lesson.slug === lessonSlug,
  );
  if (currentIndex === -1) notFound();

  const current = allLessons[currentIndex];
  const next = allLessons[currentIndex + 1] ?? null;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-10">
      <Link
        href={`/consilium/classroom/${course.slug}`}
        className="inline-flex items-center gap-2 text-sm text-text-gray hover:text-accent-gold transition-colors mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        {course.title}
      </Link>

      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-text-gray/60 mb-1.5">
          {current.module.title}
        </p>
        <h1 className="text-xl sm:text-2xl font-light text-text-light tracking-wide">
          {current.lesson.title}
        </h1>
      </div>

      <div className="mb-6">
        <LessonPlayer
          videoUrl={current.lesson.videoUrl}
          title={current.lesson.title}
          duration={current.lesson.duration ?? undefined}
        />
      </div>

      {current.lesson.description && (
        <p className="text-sm text-text-gray leading-relaxed max-w-3xl mb-8">
          {current.lesson.description}
        </p>
      )}

      <div className="flex items-center justify-end pt-6 border-t border-white/[0.06]">
        {next ? (
          <Link
            href={`/consilium/classroom/${course.slug}/${next.module.slug}/${next.lesson.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200"
          >
            Next: {next.lesson.title}
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <span className="text-xs text-text-gray/60 italic">
            End of course.
          </span>
        )}
      </div>
    </div>
  );
}
