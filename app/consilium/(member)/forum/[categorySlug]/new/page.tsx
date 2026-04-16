"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostEditor from "@/components/community/forum/PostEditor";

export default function NewPostPage() {
  const router = useRouter();
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(content: string, title?: string) {
    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      const categoryRes = await fetch(
        `/api/community/categories/${categorySlug}`,
      );
      if (!categoryRes.ok) {
        setError("Category not found");
        return;
      }
      const categoryData = await categoryRes.json();

      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: categoryData.category.id,
          title,
          content,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create post");
        return;
      }

      const data = await res.json();
      router.push(`/consilium/forum/${categorySlug}/post/${data.post.id}`);
    } catch (_err) {
      setError("Failed to create post");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
      <Link
        href={`/consilium/forum/${categorySlug}`}
        className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-accent-gold transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Category
      </Link>

      <div className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/10 rounded-2xl p-6">
        <h1 className="text-2xl font-extralight tracking-wider uppercase gradient-text-gold mb-6">
          Create New Post
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <PostEditor
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/consilium/forum/${categorySlug}`)}
          showTitle
          submitLabel="Create Post"
          placeholder="Write your post content..."
        />
      </div>
    </div>
  );
}
