import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import CourseCard from "@/components/inner-circle/CourseCard";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Classroom | The Inner Circle",
  description: "Course library for Inner Circle members",
};

export default async function ClassroomPage() {
  const userId = await requireServerAuth("/inner-circle/classroom");

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
        where: { userId },
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
    <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
          Classroom
        </h1>
        <p className="text-text-gray text-sm">
          Your private course library. Learn at your own pace.
        </p>
      </div>

      {courseData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <BookOpen className="w-12 h-12 text-text-gray/30 mx-auto mb-4" />
          <p className="text-text-gray">Courses are coming soon.</p>
        </div>
      )}
    </div>
  );
}
