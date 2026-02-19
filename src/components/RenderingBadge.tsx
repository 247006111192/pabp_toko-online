export default function RenderingBadge({
  type,
}: {
  type: "SSG" | "SSR" | "CSR";
}) {
  const config = {
    SSG: {
      gradient: "from-green-400/20 to-emerald-400/20",
      border: "border-green-400/20",
      dot: "bg-green-400",
      text: "text-green-300",
      label: "Static Site Generation (SSG)",
      description: "Halaman ini di-generate saat build time dan di-cache. Data di-revalidate setiap 1 jam.",
    },
    SSR: {
      gradient: "from-blue-400/20 to-cyan-400/20",
      border: "border-blue-400/20",
      dot: "bg-blue-400",
      text: "text-blue-300",
      label: "Server-Side Rendering (SSR)",
      description: "Halaman ini di-render di server setiap request. Data selalu fresh.",
    },
    CSR: {
      gradient: "from-purple-400/20 to-pink-400/20",
      border: "border-purple-400/20",
      dot: "bg-purple-400",
      text: "text-purple-300",
      label: "Client-Side Rendering (CSR)",
      description: "Halaman ini di-render di browser. Data di-fetch setelah halaman dimuat.",
    },
  };

  const { gradient, border, dot, text, label, description } = config[type];

  return (
    <div className={`inline-flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-3 rounded-2xl bg-linear-to-r ${gradient} border ${border} backdrop-blur-sm`}>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${dot} glow-dot`} />
        <span className={`font-semibold text-sm ${text}`}>{label}</span>
      </div>
      <span className="hidden sm:inline text-white/10">|</span>
      <span className="text-xs sm:text-sm text-white/60">{description}</span>
    </div>
  );
}
