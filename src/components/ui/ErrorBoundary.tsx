'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('GifCaster error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-auto">
            <AlertTriangle className="mx-auto mb-4 text-red-400" size={48} />
            <h2 className="text-xl font-semibold text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-white/70 mb-6">
              We apologize for the inconvenience. Please try refreshing the app.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-medium transition-colors text-white flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={18} />
              Refresh App
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}