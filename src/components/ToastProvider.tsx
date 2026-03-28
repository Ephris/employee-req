import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type Toast = {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
};

type ToastContextType = {
  toasts: Toast[];
  show: (message: string, type?: Toast['type'], timeoutMs?: number) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message: string, type: Toast['type'] = 'info', timeoutMs = 4000) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const toast: Toast = { id, type, message };
      setToasts((prev) => [...prev, toast]);
      if (timeoutMs > 0) {
        setTimeout(() => dismiss(id), timeoutMs);
      }
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={{ position: 'fixed', right: 16, bottom: 16, display: 'grid', gap: 8, zIndex: 9999 }}>
        {toasts.map((t) => {
          const bg =
            t.type === 'success' ? '#16a34a' : t.type === 'error' ? '#dc2626' : '#334155';
          return (
            <div
              key={t.id}
              role="status"
              aria-live="polite"
              style={{
                minWidth: 260,
                maxWidth: 420,
                borderRadius: 10,
                color: 'white',
                background: bg,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <span>{t.message}</span>
              <button
                aria-label="Dismiss"
                onClick={() => dismiss(t.id)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

