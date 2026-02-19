export default function LoadingSpinner({ text = "Memuat..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-white/10 rounded-full animate-spin border-t-blue-400"></div>
        <div className="absolute inset-0 w-12 h-12 border-2 border-transparent rounded-full border-b-purple-400" style={{ animation: "spin 1.5s linear infinite" }}></div>
      </div>
      <p className="mt-5 text-white/50 text-sm">{text}</p>
    </div>
  );
}
