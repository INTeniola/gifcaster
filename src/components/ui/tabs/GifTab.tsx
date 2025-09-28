import GifSearch from '~/components/gif/GifSearch';

interface GifTabProps {
  user?: any;
}

export default function GifTab({ user }: GifTabProps) {
  return (
    <div className="space-y-4">
      <GifSearch user={user} />
    </div>
  );
}