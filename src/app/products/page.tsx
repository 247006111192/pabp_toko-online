import { getAllProducts, getCategories } from "@/lib/api";
import ProductList from "./ProductList";

// SSG - Statically generated at build time, revalidated every hour
export const revalidate = 3600;

export const metadata = {
  title: "Semua Produk - TokoOnline",
  description: "Jelajahi semua produk terbaik di TokoOnline",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white/90 mb-3">Semua Produk</h1>
        <p className="text-white/60 mb-4">
          {products.length} produk tersedia
        </p>
      </div>

      {/* Product List with Category Filter (Client Component) */}
      <ProductList products={products} categories={categories} />
    </div>
  );
}
