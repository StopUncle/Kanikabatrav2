'use client'

import { Download, BookOpen, Video, FileText, CheckCircle } from 'lucide-react'

interface PurchaseItemProps {
  type: 'book' | 'coaching' | 'course'
  title: string
  description: string
  purchaseDate: string
  status: 'active' | 'completed' | 'scheduled'
  downloadUrl?: string
  sessionDate?: string
}

const PurchaseItem = ({ 
  type, 
  title, 
  description, 
  purchaseDate, 
  status, 
  downloadUrl,
  sessionDate 
}: PurchaseItemProps) => {
  const getIcon = () => {
    switch (type) {
      case 'book':
        return BookOpen
      case 'coaching':
        return Video
      case 'course':
        return FileText
      default:
        return BookOpen
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'text-green-400'
      case 'completed':
        return 'text-text-muted'
      case 'scheduled':
        return 'text-gold'
      default:
        return 'text-text-muted'
    }
  }

  const Icon = getIcon()

  return (
    <div className="group bg-gray-900/50 rounded-xl p-4 hover:bg-gray-900/70 transition-all duration-300 border border-gray-800 hover:border-gold/30">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-700 transition-colors">
          <Icon size={20} className="text-gold" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-text-light font-semibold group-hover:text-gold transition-colors">
                {title}
              </h4>
              <p className="text-text-muted text-sm mt-1">{description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
                <span className="text-text-muted">
                  Purchased: {new Date(purchaseDate).toLocaleDateString()}
                </span>
                {sessionDate && (
                  <span className="text-gold">
                    Session: {new Date(sessionDate).toLocaleDateString()}
                  </span>
                )}
                <span className={`flex items-center gap-1 ${getStatusColor()}`}>
                  <CheckCircle size={12} />
                  {status}
                </span>
              </div>
            </div>
            
            {downloadUrl && (
              <button 
                onClick={() => window.open(downloadUrl, '_blank')}
                className="flex-shrink-0 p-2 rounded-lg bg-gold/10 hover:bg-gold/20 transition-colors"
                aria-label="Download"
              >
                <Download size={18} className="text-gold" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseItem