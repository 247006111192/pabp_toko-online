"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-nav sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🛍️</span>
            <span className="text-xl font-bold text-white/90">
              Toko<span className="gradient-text">Online</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: "/", label: "Beranda" },
              { href: "/products", label: "Produk" },
              { href: "/products-ssr", label: "Katalog" },
              { href: "/search", label: "Cari" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/70 hover:text-white hover:bg-white/5 px-4 py-2 rounded-xl transition-all duration-300 font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="relative text-white/70 hover:text-white hover:bg-white/5 p-2 rounded-xl transition-all duration-300 ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-linear-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg shadow-blue-500/30"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link
              href="/cart"
              className="relative text-white/70 hover:text-white p-2 rounded-xl transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-linear-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-1 py-4 border-t border-white/5">
                {[
                  { href: "/", label: "Beranda" },
                  { href: "/products", label: "Produk" },
                  { href: "/products-ssr", label: "Katalog" },
                  { href: "/search", label: "Cari" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all font-medium text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
