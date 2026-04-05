"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Layers, CheckCircle } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    thumbnailUrl: string | null;
    moduleCount: number;
    totalLessons: number;
    completedLessons: number;
    progressPercent: number;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const isComplete = course.progressPercent === 100;

  return (
    <Link href={`/inner-circle/classroom/${course.slug}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="group bg-deep-black/50 backdrop-blur-sm border border-accent-gold/10 rounded-2xl overflow-hidden hover:border-accent-gold/25 transition-all duration-300"
      >
        {course.thumbnailUrl ? (
          <div className="aspect-video relative overflow-hidden">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-accent-gold/20 via-accent-gold/10 to-transparent flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-accent-gold/40" />
          </div>
        )}

        <div className="p-5 space-y-3">
          <h3 className="text-lg font-light text-text-light group-hover:text-accent-gold transition-colors line-clamp-2">
            {course.title}
          </h3>

          {course.description && (
            <p className="text-sm text-text-gray line-clamp-2">{course.description}</p>
          )}

          <div className="flex items-center gap-4 text-xs text-text-gray">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {course.moduleCount} {course.moduleCount === 1 ? "module" : "modules"}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.totalLessons} {course.totalLessons === 1 ? "lesson" : "lessons"}
            </span>
          </div>

          {course.totalLessons > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                {isComplete ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Complete
                  </span>
                ) : (
                  <span className="text-text-gray">
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                )}
                <span className={isComplete ? "text-emerald-400" : "text-accent-gold"}>
                  {course.progressPercent}%
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isComplete
                      ? "bg-emerald-500"
                      : "bg-accent-gold"
                  }`}
                  style={{ width: `${course.progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
