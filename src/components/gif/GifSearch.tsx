'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp, Heart, Zap } from 'lucide-react'
import { giphyService, GiphyGif } from '~/services/giphy'
import GifGrid from '~/components/gif/GifGrid'
import { useGifStore } from '~/stores/gifStore'

interface GifSearchProps {
  user: any
}

export default function GifSearch({ user }: GifSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('trending')
  const [gifs, setGifs] = useState<GiphyGif[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { favorites, addFavorite, removeFavorite } = useGifStore()

  const tabs = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'reactions', label: 'Reactions', icon: Zap },
    { id: 'favorites', label: 'Favorites', icon: Heart }
  ]

  // Load initial trending GIFs
  useEffect(() => {
    loadTrendingGifs()
  }, [])

  const loadTrendingGifs = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await giphyService.getTrending()
      setGifs(response.data)
    } catch (err) {
      setError('Failed to load trending GIFs')
      console.error('Error loading trending GIFs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setLoading(true)
    setError(null)
    try {
      const response = await giphyService.searchGifs(searchTerm)
      setGifs(response.data)
      setActiveTab('search')
    } catch (err) {
      setError('Search failed. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = async (tabId: string) => {
    setActiveTab(tabId)
    setError(null)
    
    if (tabId === 'trending') {
      await loadTrendingGifs()
    } else if (tabId === 'reactions') {
      setLoading(true)
      try {
        const response = await giphyService.getGifsByCategory('reactions')
        setGifs(response.data)
      } catch (err) {
        setError('Failed to load reactions')
      } finally {
        setLoading(false)
      }
    } else if (tabId === 'favorites') {
      setGifs(favorites)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search GIFs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full bg-white/10 backdrop-blur-sm rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 border border-white/10 focus:border-purple-400 focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !searchTerm.trim()}
          className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 text-white"
        >
          {loading ? '...' : 'Search'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/10 backdrop-blur-sm rounded-xl p-1">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-purple-500 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}

      {/* GIF Grid */}
      <GifGrid 
        gifs={gifs} 
        loading={loading}
        favorites={favorites}
        onFavoriteToggle={(gif: GiphyGif) => {
          const isFav = favorites.some(f => f.id === gif.id)
          if (isFav) {
            removeFavorite(gif.id)
          } else {
            addFavorite(gif)
          }
        }}
      />
    </div>
  )
}