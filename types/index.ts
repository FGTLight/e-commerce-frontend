// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  brand: string
  stock: number
  images: string[]
  rating: number
  reviews: number
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}

// Cart Types
export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

// Order Types
export interface ShippingAddress {
  fullName: string
  address: string
  city: string
  state: string
  postalCode: string
  phone: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  shippingAddress: ShippingAddress
  paymentMethod: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
}

// Filter Types
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  sortBy?: "price-asc" | "price-desc" | "popular" | "newest"
}
