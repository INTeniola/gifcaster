'use client'

import { Sparkles } from 'lucide-react'

export function ComingSoon() {
  const features = [
    {
      title: 'Smart GIF Suggestions',
      description: 'AI-powered GIF recommendations based on your cast text',
      icon: '🧠'
    },
    {
      title: 'GIF Creation',
      description: 'Create custom GIFs right in VibeCast',
      icon: '✨'
    },
    {
      title: 'GIF Battles',
      description: 'Challenge friends to find the perfect reaction GIF',
      icon: '⚔️'
    },
    {
      title: 'Custom Collections',
      description: 'Create and share your curated GIF collections',
      icon: '🗂️'
    }
  ]

  return (
    <div className="rounded-xl bg-background-card overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Coming Soon
        </h2>
      </div>
      <div className="p-4 space-y-4">
        {features.map((feature) => (
          <div 
            key={feature.title}
            className="flex items-start gap-3 p-3 rounded-lg bg-background-hover/50 hover:bg-background-hover transition-colors"
          >
            <span className="text-2xl" role="img" aria-label={feature.title}>
              {feature.icon}
            </span>
            <div className="space-y-1">
              <h3 className="font-medium text-text-primary">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}