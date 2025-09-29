'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'
import { giphyService, GiphyGif } from '~/services/giphy'
import GifGrid from '~/components/gif/GifGrid'
import { useGifStore } from '~/stores/gifStore'

interface GifSearchProps {
  _user: any;
  initialFilter?: 'trending' | 'search' | 'favorites';
  searchRef?: React.RefObject<HTMLInputElement>;
}

export default function GifSearch({ _user, initialFilter = 'trending', searchRef }: GifSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [gifs, setGifs] = useState<GiphyGif[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { favorites, addRecentSearch } = useGifStore()

  const loadTrendingGifs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await giphyService.getTrending()
      setGifs(response.data)
    } catch (err) {
      setError('Failed to load GIFs')
      console.error('Error loading trending GIFs:', err)
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, setGifs]);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      await loadTrendingGifs()
      return
    }
    
    setLoading(true)
    setError(null)
    try {
      const response = await giphyService.searchGifs(searchTerm)
      setGifs(response.data)
      addRecentSearch(searchTerm.trim())
    } catch (err) {
      setError('Search failed. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, loadTrendingGifs, addRecentSearch]);

  // Load GIFs based on filter changes
  useEffect(() => {
    const loadGifs = async () => {
      if (initialFilter === 'favorites') {
        setGifs(favorites);
        return;
      }
      
      if (initialFilter === 'trending' || !searchTerm.trim()) {
        await loadTrendingGifs();
        return;
      }

      if (initialFilter === 'search' && searchTerm.trim()) {
        await handleSearch();
      }
    };

    loadGifs();
  }, [initialFilter, favorites, handleSearch, searchTerm, loadTrendingGifs]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search GIFs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-white/10 backdrop-blur-sm rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 border border-white/10 focus:border-purple-400 focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 text-white"
        >
          {loading ? '...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}

      <GifGrid gifs={gifs} loading={loading} initialFilter={initialFilter} />
    </div>
  )
}