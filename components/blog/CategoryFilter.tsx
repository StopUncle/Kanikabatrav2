'use client'

import { motion } from 'framer-motion'

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange(null)}
        className={`px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
          activeCategory === null
            ? 'bg-accent-gold text-deep-black'
            : 'bg-white/5 text-text-gray hover:bg-white/10 hover:text-white border border-white/10'
        }`}
      >
        All
      </motion.button>

      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
            activeCategory === category
              ? 'bg-accent-gold text-deep-black'
              : 'bg-white/5 text-text-gray hover:bg-white/10 hover:text-white border border-white/10'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  )
}
