import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { checkMembership } from "@/lib/community/membership";
import { prisma } from "@/lib/prisma";
import CourseCard from "@/components/inner-circle/CourseCard";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Classroom | The Inner Circle",
  description: "Course library for Inner Circle members",
};

export default async function ClassroomPage() {
  const userId = await requireServerAuth("/inner-circle/classroom");

  const { isMember, redirectUrl } = await checkMembership(userId);
  if (!isMember) redirect(redirectUrl || "/inner-circle");

  const courses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      modules: {
        orderBy: { sortOrder: "asc" },
        include: {
          lessons: {
            orderBy: { sortOrder: "asc" },
            select: { id: true },
          },
        },
      },
      enrollments: {
        where: { userId: userId },
        include: {
          progress: {
            select: { lessonId: true, isCompleted: true },
          },
        },
      },
    },
  });

  const courseData = courses.map((course) => {
    const totalLessons = course.modules.reduce(
      (sum, mod) => sum + mod.lessons.length,
      0,
    );
    const enrollment = course.enrollments[0];
    const completedLessons = enrollment
      ? enrollment.progress.filter((p) => p.isCompleted).length
      : 0;
    const progressPercent =
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      moduleCount: course.modules.length,
      totalLessons,
      completedLessons,
      progressPercent,
    };
  });

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-10">
          <span className="text-accent-gold text-xs tracking-[0.3em] uppercase font-medium">The Inner Circle</span>
          <h1 className="text-4xl font-extralight tracking-wider uppercase mt-3 mb-2">
            <span className="gradient-text-gold">Classroom</span>
          </h1>
          <div className="w-16 h-px bg-accent-gold/30 mx-auto mt-4 mb-4" />
          <p className="text-text-gray max-w-lg mx-auto">
            Your private course library. Learn at your own pace.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          <a href="/inner-circle/feed" className="px-5 py-2 rounded-full text-sm text-text-gray hover:text-accent-gold border border-white/10 hover:border-accent-gold/30 transition-colors">Feed</a>
          <a href="/inner-circle/voice-notes" className="px-5 py-2 rounded-full text-sm text-text-gray hover:text-accent-gold border border-white/10 hover:border-accent-gold/30 transition-colors">Voice Notes</a>
          <a href="/inner-circle/classroom" className="px-5 py-2 rounded-full text-sm bg-accent-gold/10 text-accent-gold border border-accent-gold/30">Classroom</a>
        </div>

        {courseData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 text-text-gray/30 mx-auto mb-4" />
            <p className="text-text-gray">
              Courses are being prepared. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
