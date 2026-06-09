import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ToastType = "success" | "warning" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++toastId;
    setToasts((prev) => {
      const next = [...prev, { id, message, type }];
      return next.slice(-5);
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        className="fixed z-50 flex flex-col gap-2
          top-4 right-4
          max-sm:bottom-20 max-sm:top-auto max-sm:right-4"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeClass =
    toast.type === "success"
      ? "toast-success"
      : toast.type === "warning"
        ? "toast-warning"
        : toast.type === "error"
          ? "toast-error"
          : "border-primary/30 bg-primary/8 text-primary";

  return (
    <output
      className={`toast-base ${typeClass} flex items-start gap-3 min-w-[16rem] max-w-[24rem]`}
      data-ocid="toast"
    >
      <span className="flex-1 text-sm">{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 p-0.5 rounded hover:bg-muted transition-smooth"
        aria-label="Close toast"
        data-ocid="toast.close_button"
      >
        <X className="w-4 h-4" />
      </button>
    </output>
  );
}
