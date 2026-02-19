import Image from "next/image";
import Link from "next/link";
import { getDummyProducts } from "@/lib/api";

// SSR - Force dynamic rendering: data is fetched fresh on every request
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Katalog Produk - TokoOnline",
  description: "Jelajahi katalog produk terlengkap di TokoOnline",
};

export default async function ProductsSSRPage() {
  const data = await getDummyProducts(20, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white/90 mb-3">
          Katalog Produk
        </h1>
        <p className="text-white/60 mb-4">
          {data.products.length} dari {data.total} produk tersedia
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.products.map((product) => (
          <div
            key={product.id}
            className="glass-card rounded-xl hover:border-white/20 transition-all duration-300 overflow-hidden border border-white/5 group flex flex-col"
          >
            {/* Image */}
            <div className="relative h-48 bg-white/5 flex items-center justify-center overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={200}
                height={200}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              {/* Discount badge */}
              {product.discountPercentage > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}
              <span className="absolute top-2 left-2 bg-blue-500/20 text-blue-300 text-xs font-medium px-2 py-1 rounded-full capitalize border border-blue-500/20">
                {product.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-white/90 line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
                {product.title}
              </h3>

              {product.brand && (
                <p className="text-xs text-white/50 mb-2">{product.brand}</p>
              )}

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? "text-yellow-400"
                          : "text-white/10"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-white/60">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              {/* Price */}
              <div className="mt-auto flex items-center space-x-2">
                <span className="text-lg font-bold gradient-text">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-sm text-white/50 line-through">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock */}
              <p
                className={`text-xs mt-2 ${
                  product.stock > 10 ? "text-green-400" : "text-orange-400"
                }`}
              >
                {product.stock > 10
                  ? `Stok tersedia (${product.stock})`
                  : `Stok terbatas (${product.stock})`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Back link */}
      <div className="text-center mt-10">
        <Link
          href="/"
          className="text-blue-400 hover:underline font-medium"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
