'use client'

import { FileText, Download, Lock } from 'lucide-react'

interface ResourceItemProps {
  title: string
  description: string
  type: 'pdf' | 'video' | 'audio' | 'worksheet'
  isLocked: boolean
  fileSize?: string
  downloadUrl?: string
}

const ResourceItem = ({
  title,
  description,
  type,
  isLocked,
  fileSize,
  downloadUrl
}: ResourceItemProps) => {
  const getTypeLabel = () => {
    switch (type) {
      case 'pdf':
        return 'PDF Guide'
      case 'video':
        return 'Video Lesson'
      case 'audio':
        return 'Audio Session'
      case 'worksheet':
        return 'Worksheet'
      default:
        return 'Resource'
    }
  }

  const handleDownload = () => {
    if (!isLocked && downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
  }

  return (
    <div className={`bg-gray-900/50 rounded-lg p-4 border ${isLocked ? 'border-gray-800 opacity-60' : 'border-gray-800 hover:border-gold/30'} transition-all duration-300`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
          <FileText size={20} className="text-gold" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-text-light font-medium flex items-center gap-2">
            {title}
            {isLocked && <Lock size={14} className="text-text-muted" />}
          </h4>
          <p className="text-text-muted text-sm mt-1">{description}</p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="px-2 py-1 rounded bg-gray-800">{getTypeLabel()}</span>
              {fileSize && <span>{fileSize}</span>}
            </div>
            
            {!isLocked && downloadUrl && (
              <button
                onClick={handleDownload}
                className="p-1.5 rounded-lg bg-gold/10 hover:bg-gold/20 transition-colors"
                aria-label="Download resource"
              >
                <Download size={16} className="text-gold" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourceItem