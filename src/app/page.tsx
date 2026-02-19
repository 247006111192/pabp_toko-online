import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/api";
import { Product } from "@/types";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  FloatingOrb,
} from "@/components/animations";

// SSG - Statically generated at build time, revalidated every hour (ISR)
export const revalidate = 3600;

export default async function HomePage() {
  let products: Product[] = [];
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Failed to fetch products during build:", error);
  }
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="relative">
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Floating Orbs Background */}
        <FloatingOrb
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"
          delay={0}
        />
        <FloatingOrb
          className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
          delay={2}
        />
        <FloatingOrb
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-cyan-500/5 blur-3xl"
          delay={4}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeroTitle>
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-2">
              <span className="text-white/90">Selamat Datang di</span>
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-8xl font-black gradient-text leading-tight">
              TokoOnline
            </span>
          </HeroTitle>

          <HeroSubtitle>
            <span className="block text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">
              Temukan berbagai produk berkualitas dengan harga terbaik.
              Belanja mudah, cepat, dan nyaman hanya di TokoOnline.
            </span>
          </HeroSubtitle>

          <HeroButtons>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="glass-btn-primary px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-xl inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Jelajahi Produk
              </Link>
              <Link
                href="/search"
                className="glass-btn px-8 py-4 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari Produk
              </Link>
            </div>
          </HeroButtons>

          {/* Scroll indicator */}
          <AnimatedSection variant="fadeIn" delay={1.2} className="mt-16">
            <div className="flex flex-col items-center gap-2 text-white/40">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-2 bg-white/50 rounded-full mt-1.5 animate-bounce" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ KEUNGGULAN ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <AnimatedSection variant="fadeInUp">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Kenapa TokoOnline?</span>
          </h2>
          <p className="text-white/60 text-center mb-16 max-w-xl mx-auto">
            Pengalaman belanja online yang cepat, aman, dan menyenangkan
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem>
            <div className="glass-card p-8 h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-400 to-emerald-500 opacity-60" />
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white/90 mb-3">
                Performa Cepat
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Halaman dimuat dengan sangat cepat berkat teknologi modern.
                Pengalaman browsing yang mulus tanpa loading lama.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-card p-8 h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-400 to-cyan-500 opacity-60" />
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white/90 mb-3">
                Data Selalu Update
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Informasi produk dan harga selalu terbaru.
                Tidak perlu khawatir dengan data yang sudah kadaluarsa.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="glass-card p-8 h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-400 to-pink-500 opacity-60" />
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white/90 mb-3">
                Pencarian Instan
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Cari produk favorit Anda secara real-time.
                Hasil pencarian muncul langsung saat Anda mengetik.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ═══════════════ FEATURED PRODUCTS ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <AnimatedSection variant="fadeInUp">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Produk Unggulan</span>
          </h2>
          <p className="text-white/60 text-center mb-16 max-w-xl mx-auto">
            Koleksi pilihan terbaik untuk Anda
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <Link
                href={`/products/${product.id}`}
                className="glass-card block p-5 group cursor-pointer"
              >
                <div className="h-44 flex items-center justify-center mb-5 rounded-xl bg-white/5 p-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={150}
                    height={150}
                    className="object-contain h-full w-auto group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-medium text-white/90 line-clamp-2 mb-3 group-hover:text-white transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold gradient-text">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs text-white/60">{product.rating.rate}</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection variant="fadeInUp" delay={0.3} className="text-center mt-12">
          <Link
            href="/products"
            className="glass-btn-primary px-8 py-3 rounded-2xl font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform"
          >
            Lihat Semua Produk
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
