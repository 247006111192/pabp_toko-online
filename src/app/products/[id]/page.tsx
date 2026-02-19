import Image from "next/image";
import Link from "next/link";
import { getProductById, getAllProducts } from "@/lib/api";
import AddToCartButton from "./AddToCartButton";

// SSR - Force dynamic rendering for every request
export const dynamic = "force-dynamic";

// Generate static params for known product IDs (SSG for known paths)
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));
  return {
    title: `${product.title} - TokoOnline`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-white/60 mb-6">
        <Link href="/" className="hover:text-blue-400">
          Beranda
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-400">
          Produk
        </Link>
        <span>/</span>
        <span className="text-white/70 truncate max-w-50">
          {product.title}
        </span>
      </nav>

      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white/5 rounded-xl p-8">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="object-contain max-h-100 w-auto"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category */}
            <span className="text-sm text-blue-400 font-medium capitalize mb-2">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white/90 mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating.rate)
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
              <span className="text-white/70">
                {product.rating.rate} ({product.rating.count} ulasan)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold gradient-text">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white/90 mb-2">
                Deskripsi
              </h2>
              <p className="text-white/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart */}
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
