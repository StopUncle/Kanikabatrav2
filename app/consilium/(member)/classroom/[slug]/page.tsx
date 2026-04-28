import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, PlayCircle, Lock } from "lucide-react";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    select: { title: true },
  });
  return {
    title: course ? `${course.title} | Classroom` : "Classroom",
  };
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return "";
  const mins = Math.round(seconds / 60);
  return `${mins} min`;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const userId = await requireServerAuth(`/consilium/classroom/${slug}`);

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
      enrollments: {
        where: { userId },
        include: {
          progress: { select: { lessonId: true, isCompleted: true } },
        },
      },
    },
  });

  if (!course || !course.isActive) {
    notFound();
  }

  const completedIds = new Set(
    course.enrollments[0]?.progress
      .filter((p) => p.isCompleted)
      .map((p) => p.lessonId) ?? [],
  );

  const totalLessons = course.modules.reduce(
    (sum, m) => sum + m.lessons.length,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
      <Link
        href="/consilium/classroom"
        className="inline-flex items-center gap-2 text-sm text-text-gray hover:text-accent-gold transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        All courses
      </Link>

      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase gradient-text-gold mb-3">
          {course.title}
        </h1>
        <div className="w-12 h-px bg-warm-gold/40 mb-4" />
        {course.description && (
          <p className="text-text-gray text-sm sm:text-base leading-relaxed max-w-2xl">
            {course.description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-4 text-xs text-text-gray/70">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            {course.modules.length} {course.modules.length === 1 ? "module" : "modules"}
          </span>
          <span className="flex items-center gap-1.5">
            <PlayCircle className="w-3.5 h-3.5" />
            {totalLessons} {totalLessons === 1 ? "lesson" : "lessons"}
          </span>
        </div>
      </div>

      {course.modules.length === 0 ? (
        <div className="text-center py-16 text-text-gray/60 text-sm">
          No modules yet.
        </div>
      ) : (
        <div className="space-y-6">
          {course.modules.map((mod) => (
            <div
              key={mod.id}
              className="bg-deep-black/40 backdrop-blur-sm border border-accent-gold/10 rounded-xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-white/5">
                <h2 className="text-base font-light text-text-light tracking-wide">
                  {mod.title}
                </h2>
                {mod.description && (
                  <p className="text-xs text-text-gray/70 mt-1">
                    {mod.description}
                  </p>
                )}
              </div>

              {mod.lessons.length === 0 ? (
                <div className="px-5 py-6 text-text-gray/50 text-xs italic">
                  No lessons yet.
                </div>
              ) : (
                <ul>
                  {mod.lessons.map((lesson) => {
                    const isComplete = completedIds.has(lesson.id);
                    const playable = !!lesson.videoUrl;
                    const href = `/consilium/classroom/${course.slug}/${mod.slug}/${lesson.slug}`;
                    return (
                      <li
                        key={lesson.id}
                        className="border-t border-white/[0.04] first:border-t-0"
                      >
                        <Link
                          href={href}
                          className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors group"
                        >
                          {playable ? (
                            <PlayCircle
                              className={`w-4 h-4 flex-shrink-0 ${
                                isComplete
                                  ? "text-emerald-400"
                                  : "text-accent-gold/70 group-hover:text-accent-gold"
                              }`}
                            />
                          ) : (
                            <Lock className="w-4 h-4 flex-shrink-0 text-text-gray/40" />
                          )}
                          <span className="flex-1 text-sm font-light text-text-light/90 group-hover:text-text-light">
                            {lesson.title}
                          </span>
                          {lesson.duration ? (
                            <span className="text-xs text-text-gray/60">
                              {formatDuration(lesson.duration)}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
