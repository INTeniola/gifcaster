"use client";

import { useEffect, useState } from "react";
import { sdk } from '@farcaster/miniapp-sdk';
import { Header } from "~/components/ui/Header";
import GifTab from "~/components/ui/tabs/GifTab";
import { MoodOfTheDay } from "~/components/ui/MoodOfTheDay";
import { ComingSoon } from "~/components/ui/ComingSoon";

export interface AppProps {
  _title?: string;
}

export default function App(
  { _title }: AppProps = { _title: "GifCaster" }
) {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Handle dark mode
  useEffect(() => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Initialize app with SDK
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Call ready() as per documentation
        await sdk.actions.ready();
        
        // Get user context
        const context = await sdk.context; // ✅ Await the context first
        setUser(context.user);
        
        setIsReady(true);
        console.log('GifCaster initialized successfully');
      } catch (error) {
        console.error('Failed to initialize app:', error);
        // Show app anyway even if SDK fails
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  // Show loading state
  if (!isReady) {
    return (
      <div className="min-h-screen bg-background-dark text-text-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4 mx-auto"></div>
          <p className="text-text-secondary">Loading GifCaster...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-text-primary">
      <Header _user={user} />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main GIF section */}
          <div className="lg:col-span-2">
            <GifTab _user={user} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <MoodOfTheDay />
            <ComingSoon />
          </div>
        </div>
      </main>
    </div>
  );
}