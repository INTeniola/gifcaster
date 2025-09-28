import { Heart, ExternalLink } from 'lucide-react'
import { GiphyGif } from '~/services/giphy'
import { sdk } from '@farcaster/miniapp-sdk'

interface GifGridProps {
  gifs: GiphyGif[]
  loading: boolean
  favorites: GiphyGif[]
  onFavoriteToggle: (gif: GiphyGif) => void
}

export default function GifGrid({ gifs, loading, favorites, onFavoriteToggle }: GifGridProps) {
  const isFavorite = (gifId: string) => {
    return favorites.some(f => f.id === gifId)
  }

  const handleGifSelect = async (gif: GiphyGif) => {
    try {
      await sdk.actions.composeCast({
        text: `Perfect GIF! 🎉 ${gif.title}`,
        embeds: [gif.images.original.url]
      })
    } catch (error) {
      console.error('Failed to share GIF:', error)
      // Fallback: copy URL to clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(gif.images.original.url)
        alert('GIF URL copied to clipboard!')
      }
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white/10 rounded-2xl h-32 animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (gifs.length === 0) {
    return (
      <div className="text-center py-12 text-white/60">
        No GIFs found. Try a different search term.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {gifs.map(gif => (
        <div
          key={gif.id}
          className="relative group cursor-pointer bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-200"
          onClick={() => handleGifSelect(gif)}
        >
          <img
            src={gif.images.fixed_height.url}
            alt={gif.title}
            className="w-full h-32 object-cover"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute bottom-2 left-2 right-8">
              <p className="text-white text-sm font-medium truncate">
                {gif.title || 'Untitled GIF'}
              </p>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavoriteToggle(gif)
              }}
              className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
                isFavorite(gif.id)
                  ? 'bg-pink-500 text-white' 
                  : 'bg-black/30 text-white/70 hover:text-white'
              }`}
            >
              <Heart size={14} fill={isFavorite(gif.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}