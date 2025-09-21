import { useState, useEffect } from "react";

// Minimal toast system: set window.showToast('message', 'success'|'error') anywhere
export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    window.showToast = (text, tone = "success") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, text, tone }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto rounded-md px-3 py-2 text-sm text-white shadow ${
            t.tone === "error" ? "bg-red-600" : "bg-emerald-600"
          }`}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
