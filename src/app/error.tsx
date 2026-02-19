"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-6 border border-red-500/20">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white/90 mb-2">
          Terjadi Kesalahan
        </h2>
        <p className="text-white/60 mb-6 max-w-md">
          {error.message || "Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi."}
        </p>
        <button
          onClick={reset}
          className="glass-btn-primary px-6 py-3 rounded-lg cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
