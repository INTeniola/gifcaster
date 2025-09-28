import { useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { GiphyGif } from '~/services/giphy'
import { sdk } from '@farcaster/miniapp-sdk'

interface CastPreviewProps {
  gif: GiphyGif
  onBack: () => void
}

export default function CastPreview({ gif, onBack }: CastPreviewProps) {
  const [castText, setCastText] = useState(`Check out this GIF! 🎉`)
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      await sdk.actions.composeCast({
        text: castText,
        embeds: [gif.images.original.url]
      })
    } catch (error) {
      console.error('Failed to share cast:', error)
      alert('Failed to share. Please try again.')
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">Share to Cast</h2>
        </div>
        
        {/* GIF Preview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
          <img 
            src={gif.images.original.url} 
            alt={gif.title}
            className="w-full rounded-2xl mb-4"
          />
          
          {/* Cast Text Input */}
          <textarea
            value={castText}
            onChange={(e) => setCastText(e.target.value)}
            placeholder="Add your thoughts..."
            className="w-full bg-white/10 rounded-xl p-3 text-white placeholder-gray-400 border border-white/10 focus:border-purple-400 focus:outline-none resize-none"
            rows={3}
          />
          
          <div className="flex justify-between items-center mt-4 text-sm text-white/60">
            <span>{castText.length}/280</span>
            <span>{gif.title}</span>
          </div>
        </div>

        {/* Share Button */}
        <button 
          onClick={handleShare}
          disabled={isSharing || castText.length > 280}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
        >
          {isSharing ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <Send size={18} />
              Share to Cast
            </>
          )}
        </button>
      </div>
    </div>
  )
}