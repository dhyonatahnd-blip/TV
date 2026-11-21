import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

(window as unknown as { __KONKORD_APP_LOADED__?: boolean }).__KONKORD_APP_LOADED__ = true;

class TvErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message || 'Erro inesperado' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-dvh flex items-center justify-center p-6 bg-[#07090e] text-slate-100">
          <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#10141e] p-6 text-center space-y-3">
            <h1 className="text-lg font-bold">KONKORD TV</h1>
            <p className="text-xs text-slate-400">
              Ocorreu um erro ao carregar a interface: {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-pointer"
            >
              Recarregar TV
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <TvErrorBoundary>
    <App />
  </TvErrorBoundary>
);
