import { useEffect, useState } from 'react';
import { giphyService, GiphyGif } from '~/services/giphy';
import { Skeleton } from '~/components/ui/Skeleton';

export function MoodOfTheDay() {
  const [mood, setMood] = useState<GiphyGif | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodOfTheDay = async () => {
      try {
        const response = await giphyService.getTrending(1);
        if (response.data.length > 0) {
          setMood(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching mood of the day:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodOfTheDay();
  }, []);

  if (loading) {
    return (
      <div className="relative rounded-xl overflow-hidden bg-background-card p-4 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!mood) return null;

  return (
    <div className="relative rounded-xl overflow-hidden bg-background-card">
      <div className="absolute inset-0 bg-gradient-to-b from-background-hover/0 to-background-hover/90" />
      <img
        src={mood.images.original.url}
        alt="Mood of the day"
        className="w-full h-64 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-text-primary">
        <h3 className="text-xl font-bold mb-2">Today's Vibe</h3>
        <p className="text-text-secondary">{mood.title}</p>
      </div>
    </div>
  );
}