const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'GheyiQQ0QJPXPvNsPbg7qi1aqunkU1u0'
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs'

export interface GiphyGif {
  id: string
  title: string
  images: {
    fixed_height: {
      url: string
      width: string
      height: string
    }
    original: {
      url: string
      width: string
      height: string
    }
  }
}

export interface GiphyResponse {
  data: GiphyGif[]
  pagination: {
    total_count: number
    count: number
    offset: number
  }
}

class GiphyService {
  private async fetchFromGiphy(endpoint: string, params: Record<string, any> = {}): Promise<GiphyResponse> {
    const url = new URL(`${GIPHY_BASE_URL}/${endpoint}`)
    url.searchParams.append('api_key', GIPHY_API_KEY)
    url.searchParams.append('limit', '20')
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString())
    })

    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new Error(`GIPHY API error: ${response.status}`)
    }

    return response.json()
  }

  async searchGifs(query: string, offset: number = 0): Promise<GiphyResponse> {
    return this.fetchFromGiphy('search', { q: query, offset })
  }

  async getTrending(offset: number = 0): Promise<GiphyResponse> {
    return this.fetchFromGiphy('trending', { offset })
  }

  async getGifsByCategory(category: string): Promise<GiphyResponse> {
    const categoryQueries = {
      reactions: 'reaction',
      emotions: 'emotion feeling',
      animals: 'cute animals',
      celebration: 'celebration party',
      sports: 'sports win',
    }
    
    const query = categoryQueries[category as keyof typeof categoryQueries] || category
    return this.searchGifs(query)
  }
}

export const giphyService = new GiphyService()