import { useRef, useState } from 'react';
// Removed unused import: import { Search } from 'lucide-react';
import GifSearch from '~/components/gif/GifSearch';
import { useGifStore } from '~/stores/gifStore';

interface GifTabProps {
  _user?: any;
  initialFilter?: 'trending' | 'search' | 'favorites';
}

export default function GifTab({ _user, initialFilter = 'trending' }: GifTabProps) {
  const searchRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const { _recentSearches } = useGifStore();
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-1">
        <button 
          onClick={() => setActiveFilter('trending')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-colors ${
            activeFilter === 'trending' ? 'bg-purple-500 text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          <span className="text-lg">🔥</span>
          <span>Trending</span>
        </button>
        <button 
          onClick={() => setActiveFilter('favorites')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-colors ${
            activeFilter === 'favorites' ? 'bg-purple-500 text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          <span className="text-lg">❤️</span>
          <span>Favorites</span>
        </button>
      </div>

      <GifSearch _user={_user} initialFilter={activeFilter} searchRef={searchRef} />
    </div>
  );
}