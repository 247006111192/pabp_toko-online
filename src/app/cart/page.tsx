"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white/90 mb-3">
            Keranjang Belanja
          </h1>
        </div>

        <div className="text-center py-20">
          <svg
            className="mx-auto h-24 w-24 text-white/10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-white/70 mt-4">
            Keranjang Anda kosong
          </h2>
          <p className="text-white/50 mt-2">
            Mulai belanja untuk menambahkan produk ke keranjang
          </p>
          <Link
            href="/products"
            className="inline-block mt-6 glass-btn-primary px-6 py-3 rounded-lg"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white/90 mb-3">
          Keranjang Belanja
        </h1>
        <p className="text-white/60 mb-4">
          {totalItems} item dalam keranjang
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
            >
              {/* Image */}
              <div className="w-full sm:w-24 h-24 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-contain h-20 w-auto"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.id}`}
                  className="text-sm font-semibold text-white/90 hover:text-blue-400 line-clamp-2"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-white/50 capitalize mt-1">
                  {item.category}
                </p>
                <p className="text-lg font-bold gradient-text mt-2">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="text-lg font-medium text-white/90 w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors ml-2 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right shrink-0 sm:min-w-25">
                <p className="text-xs text-white/50">Subtotal</p>
                <p className="text-lg font-bold text-white/90">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center space-x-1 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Kosongkan Keranjang</span>
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-white/90 mb-4">
              Ringkasan Pesanan
            </h2>

            <div className="space-y-3 border-b border-white/10 pb-4 mb-4">
              <div className="flex justify-between text-sm text-white/70">
                <span>Subtotal ({totalItems} item)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/70">
                <span>Ongkos Kirim</span>
                <span className="text-green-400">Gratis</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-white/90 text-lg mb-6">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full glass-btn-primary py-3 px-6 rounded-lg cursor-pointer">
              Checkout
            </button>

            <Link
              href="/products"
              className="block text-center text-blue-400 hover:underline text-sm mt-4"
            >
              Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
