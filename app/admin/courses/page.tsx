"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  Plus,
  ChevronUp,
  ChevronRight,
  Pencil,
  Trash2,
  BookOpen,
  Layers,
  PlayCircle,
  Eye,
  ArrowUp,
  ArrowDown,
  X,
  Check,
} from "lucide-react";
import VideoUrlField from "@/components/admin/VideoUrlField";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  videoUrl: string | null;
  duration: number | null;
  textContent: string | null;
  isFree: boolean;
  sortOrder: number;
}

interface Module {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  lessons: Lesson[];
  _count?: { lessons: number };
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string | null;
  price: number;
  tier: string;
  isActive: boolean;
  sortOrder: number;
  modules: Module[];
  _count?: { enrollments: number };
}

type EditTarget =
  | { type: "course"; id: string }
  | { type: "module"; courseId: string; id: string }
  | { type: "lesson"; courseId: string; moduleId: string; id: string }
  | null;

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [addingModuleTo, setAddingModuleTo] = useState<string | null>(null);
  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<EditTarget>(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    price: "",
    tier: "standard",
  });

  const [moduleForm, setModuleForm] = useState({ title: "", description: "" });
  const [lessonForm, setLessonForm] = useState({
    title: "",
    videoUrl: "",
    textContent: "",
    duration: "",
    isFree: false,
  });

  const [editForm, setEditForm] = useState<Record<string, string | boolean>>({});

  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses || []);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  function toggleCourse(id: string) {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleModule(id: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleCreateCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!courseForm.title.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseForm),
      });
      if (res.ok) {
        setCourseForm({ title: "", description: "", price: "", tier: "standard" });
        setShowCourseForm(false);
        fetchCourses();
      }
    } catch (err) {
      console.error("Failed to create course:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateModule(courseId: string, e: React.FormEvent) {
    e.preventDefault();
    if (!moduleForm.title.trim()) return;
    setSubmitting(true);

    const course = courses.find((c) => c.id === courseId);
    const nextSort = course ? course.modules.length : 0;

    try {
      const res = await fetch(`/api/admin/courses/${courseId}/modules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...moduleForm, sortOrder: nextSort }),
      });
      if (res.ok) {
        setModuleForm({ title: "", description: "" });
        setAddingModuleTo(null);
        fetchCourses();
      }
    } catch (err) {
      console.error("Failed to create module:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateLesson(
    courseId: string,
    moduleId: string,
    e: React.FormEvent,
  ) {
    e.preventDefault();
    if (!lessonForm.title.trim()) return;
    setSubmitting(true);

    const course = courses.find((c) => c.id === courseId);
    const mod = course?.modules.find((m) => m.id === moduleId);
    const nextSort = mod ? mod.lessons.length : 0;

    try {
      const res = await fetch(
        `/api/admin/courses/${courseId}/modules/${moduleId}/lessons`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lessonForm, sortOrder: nextSort }),
        },
      );
      if (res.ok) {
        setLessonForm({
          title: "",
          videoUrl: "",
          textContent: "",
          duration: "",
          isFree: false,
        });
        setAddingLessonTo(null);
        fetchCourses();
      }
    } catch (err) {
      console.error("Failed to create lesson:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(
    type: "course" | "module" | "lesson",
    ids: { courseId: string; moduleId?: string; lessonId?: string },
  ) {
    const confirmed = window.confirm(
      `Delete this ${type}? This cannot be undone.`,
    );
    if (!confirmed) return;

    const key = ids.lessonId || ids.moduleId || ids.courseId;
    setActionLoading(key);

    let url = `/api/admin/courses/${ids.courseId}`;
    if (ids.moduleId) url += `/modules/${ids.moduleId}`;
    if (ids.lessonId) url += `/lessons/${ids.lessonId}`;

    try {
      await fetch(url, { method: "DELETE" });
      fetchCourses();
    } catch (err) {
      console.error(`Failed to delete ${type}:`, err);
    } finally {
      setActionLoading(null);
    }
  }

  function startEdit(
    target: EditTarget,
    initialData: Record<string, string | boolean | number | null>,
  ) {
    setEditTarget(target);
    const form: Record<string, string | boolean> = {};
    for (const [k, v] of Object.entries(initialData)) {
      if (typeof v === "boolean") form[k] = v;
      else form[k] = v?.toString() || "";
    }
    if (form.duration && typeof form.duration === "string") {
      const secs = parseInt(form.duration);
      form.duration = secs ? (secs / 60).toString() : "";
    }
    setEditForm(form);
  }

  async function handleSaveEdit() {
    if (!editTarget) return;
    setSubmitting(true);

    let url = "";
    if (editTarget.type === "course") {
      url = `/api/admin/courses/${editTarget.id}`;
    } else if (editTarget.type === "module") {
      url = `/api/admin/courses/${editTarget.courseId}/modules/${editTarget.id}`;
    } else if (editTarget.type === "lesson") {
      url = `/api/admin/courses/${editTarget.courseId}/modules/${editTarget.moduleId}/lessons/${editTarget.id}`;
    }

    try {
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      setEditTarget(null);
      fetchCourses();
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReorder(
    type: "module" | "lesson",
    ids: { courseId: string; moduleId?: string; itemId: string },
    direction: "up" | "down",
  ) {
    setActionLoading(ids.itemId);

    const course = courses.find((c) => c.id === ids.courseId);
    if (!course) return;

    let items: { id: string; sortOrder: number }[];
    let url: string;

    if (type === "module") {
      items = course.modules.map((m) => ({ id: m.id, sortOrder: m.sortOrder }));
      url = `/api/admin/courses/${ids.courseId}/modules`;
    } else {
      const mod = course.modules.find((m) => m.id === ids.moduleId);
      if (!mod) return;
      items = mod.lessons.map((l) => ({ id: l.id, sortOrder: l.sortOrder }));
      url = `/api/admin/courses/${ids.courseId}/modules/${ids.moduleId}/lessons`;
    }

    const idx = items.findIndex((i) => i.id === ids.itemId);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;

    const currentOrder = items[idx].sortOrder;
    const swapOrder = items[swapIdx].sortOrder;

    try {
      await Promise.all([
        fetch(`${url}/${ids.itemId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sortOrder: swapOrder }),
        }),
        fetch(`${url}/${items[swapIdx].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sortOrder: currentOrder }),
        }),
      ]);
      fetchCourses();
    } catch (err) {
      console.error("Failed to reorder:", err);
    } finally {
      setActionLoading(null);
    }
  }

  function formatDuration(seconds: number | null): string {
    if (!seconds) return "--";
    const mins = Math.round(seconds / 60);
    return `${mins} min`;
  }

  const isEditing = (type: string, id: string) =>
    editTarget?.type === type && "id" in editTarget && editTarget.id === id;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light uppercase tracking-[0.15em] text-text-light">
          Courses
        </h1>
        <button
          onClick={() => setShowCourseForm(!showCourseForm)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200"
        >
          {showCourseForm ? <ChevronUp size={16} /> : <Plus size={16} />}
          {showCourseForm ? "Close" : "Create Course"}
        </button>
      </div>

      {showCourseForm && (
        <form
          onSubmit={handleCreateCourse}
          className="glass-card rounded-lg p-6 mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
                Title
              </label>
              <input
                type="text"
                value={courseForm.title}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, title: e.target.value })
                }
                className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
                placeholder="Course title..."
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={courseForm.price}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, price: e.target.value })
                  }
                  className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
              <div className="flex-1">
                <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
                  Tier
                </label>
                <select
                  value={courseForm.tier}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, tier: e.target.value })
                  }
                  className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
                >
                  <option value="standard" className="bg-deep-black">
                    Standard
                  </option>
                  <option value="gold" className="bg-deep-black">
                    Gold
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-text-gray text-xs uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={courseForm.description}
              onChange={(e) =>
                setCourseForm({ ...courseForm, description: e.target.value })
              }
              className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="Course description..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !courseForm.title.trim()}
            className="flex items-center gap-2 px-6 py-3 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            Create Course
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-accent-gold" size={32} />
        </div>
      ) : courses.length === 0 ? (
        <div className="glass-card rounded-lg p-12 text-center">
          <BookOpen size={32} className="mx-auto text-text-gray/30 mb-3" />
          <p className="text-text-gray font-light">No courses yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="glass-card rounded-lg overflow-hidden">
              <div
                className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                onClick={() => toggleCourse(course.id)}
              >
                <ChevronRight
                  size={16}
                  className={`text-text-gray transition-transform duration-200 ${
                    expandedCourses.has(course.id) ? "rotate-90" : ""
                  }`}
                />
                <BookOpen size={18} className="text-accent-gold" />
                <div className="flex-1 min-w-0">
                  {isEditing("course", course.id) ? (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editForm.title as string}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="bg-white/[0.03] border border-accent-gold/30 rounded px-3 py-1 text-text-light text-sm font-light focus:outline-none"
                      />
                      <button
                        onClick={handleSaveEdit}
                        disabled={submitting}
                        className="text-emerald-400 hover:text-emerald-300"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => setEditTarget(null)}
                        className="text-text-gray hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <h3 className="text-text-light font-light">{course.title}</h3>
                  )}
                  {course.description && !isEditing("course", course.id) && (
                    <p className="text-text-gray/60 text-xs truncate">
                      {course.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-text-gray" onClick={(e) => e.stopPropagation()}>
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      course.isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {course.isActive ? "Active" : "Draft"}
                  </span>
                  <span className="text-accent-gold">${course.price}</span>
                  <span>{course.modules.length} modules</span>
                  <span>{course._count?.enrollments || 0} enrolled</span>
                  <button
                    onClick={() =>
                      startEdit(
                        { type: "course", id: course.id },
                        {
                          title: course.title,
                          description: course.description,
                          price: course.price,
                          tier: course.tier,
                          isActive: course.isActive,
                        },
                      )
                    }
                    className="p-1 text-text-gray hover:text-accent-gold transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() =>
                      handleDelete("course", { courseId: course.id })
                    }
                    disabled={actionLoading === course.id}
                    className="p-1 text-text-gray hover:text-red-400 transition-colors"
                  >
                    {actionLoading === course.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>

              {expandedCourses.has(course.id) && (
                <div className="border-t border-white/5">
                  {course.modules.map((mod, modIdx) => (
                    <div key={mod.id} className="border-b border-white/5 last:border-0">
                      <div
                        className="flex items-center gap-3 px-6 pl-12 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => toggleModule(mod.id)}
                      >
                        <ChevronRight
                          size={14}
                          className={`text-text-gray transition-transform duration-200 ${
                            expandedModules.has(mod.id) ? "rotate-90" : ""
                          }`}
                        />
                        <Layers size={16} className="text-accent-sapphire" />
                        <div className="flex-1 min-w-0">
                          {isEditing("module", mod.id) ? (
                            <div
                              className="flex items-center gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="text"
                                value={editForm.title as string}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    title: e.target.value,
                                  })
                                }
                                className="bg-white/[0.03] border border-accent-gold/30 rounded px-3 py-1 text-text-light text-sm font-light focus:outline-none"
                              />
                              <button
                                onClick={handleSaveEdit}
                                disabled={submitting}
                                className="text-emerald-400 hover:text-emerald-300"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={() => setEditTarget(null)}
                                className="text-text-gray hover:text-red-400"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-text-light/90 text-sm font-light">
                              {mod.title}
                            </span>
                          )}
                        </div>
                        <div
                          className="flex items-center gap-3 text-xs text-text-gray"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{mod.lessons?.length || mod._count?.lessons || 0} lessons</span>
                          <button
                            onClick={() =>
                              handleReorder("module", {
                                courseId: course.id,
                                itemId: mod.id,
                              }, "up")
                            }
                            disabled={modIdx === 0 || actionLoading === mod.id}
                            className="p-0.5 text-text-gray hover:text-accent-gold transition-colors disabled:opacity-20"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            onClick={() =>
                              handleReorder("module", {
                                courseId: course.id,
                                itemId: mod.id,
                              }, "down")
                            }
                            disabled={
                              modIdx === course.modules.length - 1 ||
                              actionLoading === mod.id
                            }
                            className="p-0.5 text-text-gray hover:text-accent-gold transition-colors disabled:opacity-20"
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            onClick={() =>
                              startEdit(
                                { type: "module", courseId: course.id, id: mod.id },
                                {
                                  title: mod.title,
                                  description: mod.description,
                                },
                              )
                            }
                            className="p-0.5 text-text-gray hover:text-accent-gold transition-colors"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete("module", {
                                courseId: course.id,
                                moduleId: mod.id,
                              })
                            }
                            disabled={actionLoading === mod.id}
                            className="p-0.5 text-text-gray hover:text-red-400 transition-colors"
                          >
                            {actionLoading === mod.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Trash2 size={12} />
                            )}
                          </button>
                        </div>
                      </div>

                      {expandedModules.has(mod.id) && (
                        <div className="bg-white/[0.01]">
                          {mod.lessons?.map((lesson, lesIdx) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-3 px-6 pl-20 py-2.5 border-t border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                            >
                              <PlayCircle
                                size={14}
                                className={
                                  lesson.isFree
                                    ? "text-emerald-400"
                                    : "text-text-gray/50"
                                }
                              />
                              <div className="flex-1 min-w-0">
                                {isEditing("lesson", lesson.id) ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={editForm.title as string}
                                      onChange={(e) =>
                                        setEditForm({
                                          ...editForm,
                                          title: e.target.value,
                                        })
                                      }
                                      className="bg-white/[0.03] border border-accent-gold/30 rounded px-2 py-0.5 text-text-light text-xs font-light focus:outline-none"
                                    />
                                    <button
                                      onClick={handleSaveEdit}
                                      disabled={submitting}
                                      className="text-emerald-400 hover:text-emerald-300"
                                    >
                                      <Check size={12} />
                                    </button>
                                    <button
                                      onClick={() => setEditTarget(null)}
                                      className="text-text-gray hover:text-red-400"
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-text-light/70 text-xs font-light">
                                    {lesson.title}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-text-gray">
                                {lesson.isFree && (
                                  <span className="flex items-center gap-1 text-emerald-400">
                                    <Eye size={10} /> Free
                                  </span>
                                )}
                                <span>{formatDuration(lesson.duration)}</span>
                                <button
                                  onClick={() =>
                                    handleReorder(
                                      "lesson",
                                      {
                                        courseId: course.id,
                                        moduleId: mod.id,
                                        itemId: lesson.id,
                                      },
                                      "up",
                                    )
                                  }
                                  disabled={lesIdx === 0 || actionLoading === lesson.id}
                                  className="p-0.5 hover:text-accent-gold transition-colors disabled:opacity-20"
                                >
                                  <ArrowUp size={10} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleReorder(
                                      "lesson",
                                      {
                                        courseId: course.id,
                                        moduleId: mod.id,
                                        itemId: lesson.id,
                                      },
                                      "down",
                                    )
                                  }
                                  disabled={
                                    lesIdx === (mod.lessons?.length || 0) - 1 ||
                                    actionLoading === lesson.id
                                  }
                                  className="p-0.5 hover:text-accent-gold transition-colors disabled:opacity-20"
                                >
                                  <ArrowDown size={10} />
                                </button>
                                <button
                                  onClick={() =>
                                    startEdit(
                                      {
                                        type: "lesson",
                                        courseId: course.id,
                                        moduleId: mod.id,
                                        id: lesson.id,
                                      },
                                      {
                                        title: lesson.title,
                                        description: lesson.description,
                                        videoUrl: lesson.videoUrl,
                                        duration: lesson.duration,
                                        textContent: lesson.textContent,
                                        isFree: lesson.isFree,
                                      },
                                    )
                                  }
                                  className="p-0.5 hover:text-accent-gold transition-colors"
                                >
                                  <Pencil size={10} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDelete("lesson", {
                                      courseId: course.id,
                                      moduleId: mod.id,
                                      lessonId: lesson.id,
                                    })
                                  }
                                  disabled={actionLoading === lesson.id}
                                  className="p-0.5 hover:text-red-400 transition-colors"
                                >
                                  {actionLoading === lesson.id ? (
                                    <Loader2 size={10} className="animate-spin" />
                                  ) : (
                                    <Trash2 size={10} />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}

                          {addingLessonTo === mod.id ? (
                            <form
                              onSubmit={(e) =>
                                handleCreateLesson(course.id, mod.id, e)
                              }
                              className="px-6 pl-20 py-3 border-t border-white/[0.03] space-y-3"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  value={lessonForm.title}
                                  onChange={(e) =>
                                    setLessonForm({
                                      ...lessonForm,
                                      title: e.target.value,
                                    })
                                  }
                                  className="bg-white/[0.03] border border-white/10 rounded px-3 py-2 text-text-light text-xs font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
                                  placeholder="Lesson title..."
                                />
                                <VideoUrlField
                                  compact
                                  value={lessonForm.videoUrl}
                                  onChange={(url) =>
                                    setLessonForm({
                                      ...lessonForm,
                                      videoUrl: url,
                                    })
                                  }
                                  placeholder="YouTube URL or upload mp4..."
                                />
                              </div>
                              <textarea
                                value={lessonForm.textContent}
                                onChange={(e) =>
                                  setLessonForm({
                                    ...lessonForm,
                                    textContent: e.target.value,
                                  })
                                }
                                className="w-full bg-white/[0.03] border border-white/10 rounded px-3 py-2 text-text-light text-xs font-light focus:border-accent-gold/40 focus:outline-none transition-colors resize-none"
                                rows={2}
                                placeholder="Description / notes..."
                              />
                              <div className="flex items-center gap-4">
                                <input
                                  type="number"
                                  step="0.5"
                                  value={lessonForm.duration}
                                  onChange={(e) =>
                                    setLessonForm({
                                      ...lessonForm,
                                      duration: e.target.value,
                                    })
                                  }
                                  className="w-32 bg-white/[0.03] border border-white/10 rounded px-3 py-2 text-text-light text-xs font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
                                  placeholder="Duration (min)"
                                />
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={lessonForm.isFree}
                                    onChange={(e) =>
                                      setLessonForm({
                                        ...lessonForm,
                                        isFree: e.target.checked,
                                      })
                                    }
                                    className="w-3.5 h-3.5 rounded border-white/20 bg-white/[0.03] accent-accent-gold"
                                  />
                                  <span className="text-text-gray text-xs font-light">
                                    Free preview
                                  </span>
                                </label>
                                <div className="flex-1" />
                                <button
                                  type="button"
                                  onClick={() => setAddingLessonTo(null)}
                                  className="px-3 py-1.5 text-xs font-light text-text-gray hover:text-text-light transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  disabled={submitting || !lessonForm.title.trim()}
                                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200 disabled:opacity-50"
                                >
                                  {submitting ? (
                                    <Loader2 size={10} className="animate-spin" />
                                  ) : (
                                    <Plus size={10} />
                                  )}
                                  Add Lesson
                                </button>
                              </div>
                            </form>
                          ) : (
                            <button
                              onClick={() => setAddingLessonTo(mod.id)}
                              className="flex items-center gap-1.5 px-6 pl-20 py-2 text-xs font-light text-text-gray hover:text-accent-gold transition-colors w-full text-left border-t border-white/[0.03]"
                            >
                              <Plus size={10} /> Add Lesson
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {addingModuleTo === course.id ? (
                    <form
                      onSubmit={(e) => handleCreateModule(course.id, e)}
                      className="px-6 pl-12 py-4 border-t border-white/5 space-y-3"
                    >
                      <input
                        type="text"
                        value={moduleForm.title}
                        onChange={(e) =>
                          setModuleForm({ ...moduleForm, title: e.target.value })
                        }
                        className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-2.5 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors"
                        placeholder="Module title..."
                      />
                      <textarea
                        value={moduleForm.description}
                        onChange={(e) =>
                          setModuleForm({
                            ...moduleForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-2.5 text-text-light text-sm font-light focus:border-accent-gold/40 focus:outline-none transition-colors resize-none"
                        rows={2}
                        placeholder="Module description (optional)..."
                      />
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAddingModuleTo(null)}
                          className="px-4 py-2 text-sm font-light text-text-gray hover:text-text-light transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting || !moduleForm.title.trim()}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-light tracking-wide bg-accent-gold/10 text-accent-gold border border-accent-gold/30 rounded hover:bg-accent-gold/20 transition-all duration-200 disabled:opacity-50"
                        >
                          {submitting ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Plus size={14} />
                          )}
                          Add Module
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setAddingModuleTo(course.id)}
                      className="flex items-center gap-2 px-6 pl-12 py-3 text-xs font-light text-text-gray hover:text-accent-gold transition-colors w-full text-left border-t border-white/5"
                    >
                      <Plus size={12} /> Add Module
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
