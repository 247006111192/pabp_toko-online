import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-white/20">404</h1>
        <h2 className="text-2xl font-bold text-white/90 mt-4 mb-2">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-white/60 mb-6 max-w-md">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman
          telah dipindahkan atau dihapus.
        </p>
        <Link
          href="/"
          className="glass-btn-primary px-6 py-3 rounded-lg inline-block"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
