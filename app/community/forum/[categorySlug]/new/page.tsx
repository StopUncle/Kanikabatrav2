'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PostEditor from '@/components/community/forum/PostEditor'

export default function NewPostPage() {
  const router = useRouter()
  const params = useParams()
  const categorySlug = params.categorySlug as string
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(content: string, title?: string) {
    if (!title) {
      setError('Title is required')
      return
    }

    try {
      const categoryRes = await fetch(`/api/community/categories/${categorySlug}`)
      if (!categoryRes.ok) {
        setError('Category not found')
        return
      }
      const categoryData = await categoryRes.json()

      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: categoryData.category.id,
          title,
          content
        })
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to create post')
        return
      }

      const data = await res.json()
      router.push(`/community/forum/${categorySlug}/post/${data.post.id}`)
    } catch (_err) {
      setError('Failed to create post')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href={`/community/forum/${categorySlug}`}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Category
      </Link>

      <div className="bg-deep-navy/50 border border-gray-800 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Create New Post</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <PostEditor
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/community/forum/${categorySlug}`)}
          showTitle
          submitLabel="Create Post"
          placeholder="Write your post content..."
        />
      </div>
    </div>
  )
}
