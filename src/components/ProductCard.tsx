"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { memo, useCallback } from "react";

function ProductCard({ product }: { product: Product }) {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      addToCart(product);
    },
    [addToCart, product]
  );

  return (
    <div className="glass-card overflow-hidden group flex flex-col">
      <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative h-48 sm:h-56 bg-white/5 p-4 flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="object-contain h-full w-auto group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {/* Category badge */}
          <span className="absolute top-3 left-3 glass-badge px-3 py-1 text-xs font-medium text-blue-200 capitalize">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-white/90 line-clamp-2 mb-3 group-hover:text-white transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
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
            <span className="text-xs text-white/50">
              ({product.rating.count})
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto">
            <span className="text-xl font-bold gradient-text">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart button */}
      <div className="px-5 pb-5">
        <button
          onClick={handleAddToCart}
          className="w-full glass-btn-primary py-2.5 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>{quantity > 0 ? `Dalam Keranjang (${quantity})` : "Tambah ke Keranjang"}</span>
        </button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
