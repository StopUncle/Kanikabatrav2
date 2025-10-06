'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { COACHING_PACKAGES } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

interface CoachingTiersProps {
  showButton?: boolean
  onSelect?: (packageId: string) => void
}

const CoachingTiers = ({ showButton = true, onSelect }: CoachingTiersProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
    >
      {COACHING_PACKAGES.map((pkg) => (
        <motion.div key={pkg.id} variants={itemVariants}>
          <Card gradient popular={pkg.popular} className="h-full">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-light mb-2 bg-gradient-to-r from-burgundy to-gold bg-clip-text text-transparent">
                  {pkg.name}
                </h3>
                <p className="text-text-muted text-sm">
                  {pkg.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-light text-gold">
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="text-text-muted text-sm sm:text-base">/{pkg.duration}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              {showButton && (
                <Button
                  variant={pkg.popular ? 'secondary' : 'primary'}
                  fullWidth
                  onClick={() => onSelect?.(pkg.id)}
                >
                  Select Package
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default CoachingTiers