export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/5">
      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-bold text-white/90">
                Toko<span className="gradient-text">Online</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Toko online modern dengan koleksi produk terlengkap.
              Belanja mudah, cepat, dan aman bersama kami.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-white/80 font-semibold mb-5">Navigasi</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/products" className="text-white/60 hover:text-white transition-colors">Produk</a>
              </li>
              <li>
                <a href="/products-ssr" className="text-white/60 hover:text-white transition-colors">Katalog</a>
              </li>
              <li>
                <a href="/search" className="text-white/60 hover:text-white transition-colors">Cari Produk</a>
              </li>
              <li>
                <a href="/cart" className="text-white/60 hover:text-white transition-colors">Keranjang</a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-white/80 font-semibold mb-5">Teknologi</h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Context API"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="glass-badge px-3 py-1.5 text-xs text-white/60 hover:text-white/80 transition-colors"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-8 text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} TokoOnline. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
