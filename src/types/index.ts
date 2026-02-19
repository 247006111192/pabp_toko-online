// Product type from FakeStoreAPI
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Cart item type
export interface CartItem extends Product {
  quantity: number;
}

// DummyJSON product type
export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

// Quote type from DummyJSON
export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export interface QuotesResponse {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}
