import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '~/app/globals.css';
import { Providers } from '~/app/providers';
import { ErrorBoundary } from '~/components/ui/ErrorBoundary';
import { APP_NAME, APP_DESCRIPTION } from '~/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${APP_NAME} - Perfect GIFs for Farcaster`,
  description: APP_DESCRIPTION || 'Express yourself with the perfect GIF on Farcaster',
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  manifest: '/manifest.json',
  other: {
    'fc:miniapp': JSON.stringify({
      version: "1",
      imageUrl: "https://gifcaster.vercel.app/icon-512.png",
      button: {
        title: "Find GIFs",
        action: {
          type: "launch_miniapp",
          name: "GifCaster",
          url: "https://gifcaster.vercel.app",
          splashImageUrl: "https://gifcaster.vercel.app/icon-192.png",
          splashBackgroundColor: "#000000"
        }
      }
    })
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}