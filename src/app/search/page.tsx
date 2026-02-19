"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { DummyProduct } from "@/types";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<DummyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [total, setTotal] = useState(0);

  // Debounced search
  const searchProducts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setHasSearched(false);
      setTotal(0);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (!res.ok) throw new Error("Gagal mencari produk");
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white/90 mb-3">Cari Produk</h1>
        <p className="text-white/60 mb-4">
          Temukan produk yang Anda cari dengan pencarian real-time
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-2xl mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ketik untuk mencari produk... (contoh: phone, laptop, shirt)"
          className="glass-input w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-white/40"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
          >
            <svg
              className="h-5 w-5 text-white/50 hover:text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Loading */}
      {isLoading && <LoadingSpinner text="Mencari produk..." />}

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Results */}
      {!isLoading && hasSearched && (
        <div>
          <p className="text-sm text-white/60 mb-4">
            Ditemukan {total} produk untuk &quot;{query}&quot;
          </p>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="glass-card rounded-xl hover:border-white/20 transition-all duration-300 overflow-hidden border border-white/5 group"
                >
                  <div className="relative h-48 bg-white/5 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discountPercentage > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-white/90 line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                    {product.brand && (
                      <p className="text-xs text-white/50 mb-2">
                        {product.brand}
                      </p>
                    )}
                    <p className="text-xs text-white/60 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold gradient-text">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-white/60">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-16 w-16 text-white/20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-white/60 text-lg mt-4">
                Tidak ada produk ditemukan untuk &quot;{query}&quot;
              </p>
              <p className="text-white/50 text-sm mt-2">
                Coba kata kunci lain
              </p>
            </div>
          )}
        </div>
      )}

      {/* Initial state */}
      {!isLoading && !hasSearched && (
        <div className="text-center py-16">
          <svg
            className="mx-auto h-20 w-20 text-white/10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-white/50 text-lg mt-4">
            Mulai ketik untuk mencari produk
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {["phone", "laptop", "shirt", "shoes", "watch"].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1 glass-card text-white/70 rounded-full text-sm hover:text-blue-400 hover:border-blue-500/30 transition-colors cursor-pointer border border-white/10"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
