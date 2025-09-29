"use client";

import { useEffect, useState } from "react";
import { useMiniApp } from "@neynar/react";
import { Header } from "~/components/ui/Header";
import GifTab from "~/components/ui/tabs/GifTab";
import { useNeynarUser } from "../hooks/useNeynarUser";
import { MoodOfTheDay } from "~/components/ui/MoodOfTheDay";
import { ComingSoon } from "~/components/ui/ComingSoon";

export interface AppProps {
  _title?: string;
}

export default function App(
  { _title }: AppProps = { _title: "VibeCast" }
) {
  const { isSDKLoaded, context, actions } = useMiniApp();
  const { user: neynarUser, loading: isUserLoading } = useNeynarUser(context || undefined);
  const [isInterfaceReady, setIsInterfaceReady] = useState(false);

  // Handle dark mode
  useEffect(() => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Mark interface as ready after first render
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is painted
    requestAnimationFrame(() => {
      setIsInterfaceReady(true);
    });
  }, []);

  // Call ready when everything is loaded
  useEffect(() => {
    if (!isSDKLoaded || !actions?.ready) return;
    if (!isInterfaceReady) return;
    if (isUserLoading) return;  // Wait for user data to load
    
    // Hide splash screen only when interface and data are ready
    actions.ready().catch((error) => {
      console.error('Failed to initialize app:', error);
    });
  }, [isSDKLoaded, actions, isInterfaceReady, isUserLoading]);

  // Show loading state until SDK is loaded
  if (!isSDKLoaded) {
    return (
      <div className="min-h-screen bg-background-dark text-text-primary">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Header skeleton */}
          <div className="h-16 bg-gray-800 rounded-lg animate-pulse mb-6"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content skeleton */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="h-12 bg-gray-800 rounded-lg animate-pulse"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-800 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar skeleton */}
            <div className="space-y-6">
              <div className="h-40 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="h-40 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-text-primary">
      <Header _user={neynarUser} />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main GIF section */}
          <div className="lg:col-span-2">
            <GifTab _user={neynarUser} />
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