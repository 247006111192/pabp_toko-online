"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

export default function ProductList({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  // Filter and sort products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let result =
      selectedCategory === "all"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [products, selectedCategory, sortBy]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                : "glass-card text-white/80 hover:text-white/90 border border-white/10"
            }`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors cursor-pointer ${
                selectedCategory === category
                  ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                  : "glass-card text-white/60 hover:text-white/90 border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="glass-input px-4 py-2 rounded-lg text-white/70 text-sm sm:ml-auto cursor-pointer"
        >
          <option value="default">Urutkan</option>
          <option value="price-asc">Harga: Rendah ke Tinggi</option>
          <option value="price-desc">Harga: Tinggi ke Rendah</option>
          <option value="rating">Rating Tertinggi</option>
          <option value="name">Nama A-Z</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-white/60 mb-4">
        Menampilkan {filteredProducts.length} produk
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/50 text-lg">
            Tidak ada produk dalam kategori ini.
          </p>
        </div>
      )}
    </div>
  );
}
