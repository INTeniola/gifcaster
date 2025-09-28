import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GiphyGif } from '~/services/giphy'

interface GifStore {
  favorites: GiphyGif[]
  recentSearches: string[]
  addFavorite: (gif: GiphyGif) => void
  removeFavorite: (gifId: string) => void
  addRecentSearch: (term: string) => void
  clearRecentSearches: () => void
}

export const useGifStore = create<GifStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentSearches: [],
      
      addFavorite: (gif) => {
        const { favorites } = get()
        if (!favorites.find(f => f.id === gif.id)) {
          set({ favorites: [...favorites, gif] })
        }
      },
      
      removeFavorite: (gifId) => {
        const { favorites } = get()
        set({ favorites: favorites.filter(f => f.id !== gifId) })
      },
      
      addRecentSearch: (term) => {
        const { recentSearches } = get()
        const filtered = recentSearches.filter(s => s !== term)
        set({ recentSearches: [term, ...filtered].slice(0, 5) })
      },
      
      clearRecentSearches: () => {
        set({ recentSearches: [] })
      }
    }),
    {
      name: 'gifcaster-storage'
    }
  )
)