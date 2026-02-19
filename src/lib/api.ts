import { Product, DummyProduct, DummyProductsResponse } from "@/types";

const FAKESTORE_API = "https://fakestoreapi.com";
const DUMMYJSON_API = "https://dummyjson.com";

// ========== FakeStoreAPI ==========

// Get all products (for SSG)
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${FAKESTORE_API}/products`, {
    next: { revalidate: 3600 }, // Revalidate every hour (ISR/SSG behavior)
  });
  if (!res.ok) throw new Error("Gagal mengambil data produk");
  return res.json();
}

// Get single product by ID (for SSR)
export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${FAKESTORE_API}/products/${id}`, {
    cache: "no-store", // Always fetch fresh data (SSR behavior)
  });
  if (!res.ok) throw new Error(`Produk dengan ID ${id} tidak ditemukan`);
  return res.json();
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${FAKESTORE_API}/products/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Gagal mengambil data kategori");
  return res.json();
}

// Get products by category
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const res = await fetch(
    `${FAKESTORE_API}/products/category/${encodeURIComponent(category)}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Gagal mengambil data produk kategori");
  return res.json();
}

// ========== DummyJSON API ==========

// Search products from DummyJSON (for CSR)
export async function searchDummyProducts(
  query: string
): Promise<DummyProductsResponse> {
  const res = await fetch(
    `${DUMMYJSON_API}/products/search?q=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Gagal mencari produk");
  return res.json();
}

// Get DummyJSON products with pagination
export async function getDummyProducts(
  limit: number = 10,
  skip: number = 0
): Promise<DummyProductsResponse> {
  const res = await fetch(
    `${DUMMYJSON_API}/products?limit=${limit}&skip=${skip}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Gagal mengambil data produk");
  return res.json();
}

// Get single DummyJSON product
export async function getDummyProductById(
  id: number
): Promise<DummyProduct> {
  const res = await fetch(`${DUMMYJSON_API}/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Produk tidak ditemukan");
  return res.json();
}
