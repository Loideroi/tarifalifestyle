'use client';

import { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <div>
            <h3 className="font-semibold text-red-800">Something went wrong</h3>
            <p className="mt-1 text-sm text-red-600">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={this.handleRetry}
            className="gap-2 border-red-200 text-red-700 hover:bg-red-100"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional error display component for use outside error boundaries
interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplay({
  title = 'Something went wrong',
  message = 'An unexpected error occurred',
  onRetry,
  className,
}: ErrorDisplayProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center ${className}`}
    >
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <div>
        <h3 className="font-semibold text-red-800">{title}</h3>
        <p className="mt-1 text-sm text-red-600">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="gap-2 border-red-200 text-red-700 hover:bg-red-100"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
