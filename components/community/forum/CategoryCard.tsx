'use client'

import Link from 'next/link'
import { MessageSquare, Lock, Crown } from 'lucide-react'

interface CategoryCardProps {
  category: {
    id: string
    name: string
    slug: string
    description: string | null
    icon: string | null
    accessTier: string
    postCount: number
    hasAccess: boolean
    accessReason?: string
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const isPremium = category.accessTier === 'PREMIUM' || category.accessTier === 'COACHING_CLIENT'

  return (
    <Link
      href={category.hasAccess ? `/community/forum/${category.slug}` : '#'}
      className={`
        block p-6 rounded-xl border transition-all
        ${category.hasAccess
          ? 'bg-deep-navy/50 border-gray-800 hover:border-accent-gold/50 hover:bg-deep-navy/70'
          : 'bg-gray-900/30 border-gray-800/50 cursor-not-allowed opacity-75'
        }
      `}
      onClick={(e) => !category.hasAccess && e.preventDefault()}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`
            p-3 rounded-lg
            ${category.hasAccess ? 'bg-accent-burgundy/20' : 'bg-gray-800/50'}
          `}>
            {category.icon ? (
              <span className="text-2xl">{category.icon}</span>
            ) : (
              <MessageSquare className={`w-6 h-6 ${category.hasAccess ? 'text-accent-gold' : 'text-gray-500'}`} />
            )}
          </div>
          <div>
            <h3 className={`font-semibold ${category.hasAccess ? 'text-white' : 'text-gray-400'}`}>
              {category.name}
            </h3>
            {category.description && (
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {category.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPremium && (
            <Crown className="w-5 h-5 text-accent-gold" />
          )}
          {!category.hasAccess && (
            <Lock className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
        </span>
        {!category.hasAccess && category.accessReason && (
          <span className="text-accent-burgundy text-xs">
            {category.accessReason}
          </span>
        )}
      </div>
    </Link>
  )
}
