import { TrendingUp, Search, Heart, Zap } from 'lucide-react';

export default function HomeTab() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Welcome to GifCaster
        </h2>
        <p className="text-white/70 text-sm">
          Find the perfect GIF for your Farcaster casts
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <h3 className="text-white font-medium mb-1">Trending</h3>
          <p className="text-white/60 text-xs">Popular GIFs right now</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Search className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <h3 className="text-white font-medium mb-1">Search</h3>
          <p className="text-white/60 text-xs">Find specific GIFs</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <h3 className="text-white font-medium mb-1">Reactions</h3>
          <p className="text-white/60 text-xs">Perfect for responses</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
          <h3 className="text-white font-medium mb-1">Favorites</h3>
          <p className="text-white/60 text-xs">Your saved GIFs</p>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white/5 rounded-2xl p-4">
        <h3 className="text-white font-medium mb-3">How it works:</h3>
        <div className="space-y-2 text-sm text-white/70">
          <div className="flex items-start gap-3">
            <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">1</span>
            <span>Browse or search for GIFs</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">2</span>
            <span>Tap any GIF you like</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">3</span>
            <span>It opens Farcaster's cast composer</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">4</span>
            <span>Add your text and publish!</span>
          </div>
        </div>
      </div>
    </div>
  );
}