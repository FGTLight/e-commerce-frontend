import type { Product, Order, User, ProductFilters } from "@/types"
import { mockProducts, mockOrders } from "@/lib/mock-data"

// Helper function to simulate API delay
const simulateDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

// Products API - All using mock data
export const productsApi = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    await simulateDelay(300)

    let products = [...mockProducts]

    // Apply filters
    if (filters?.category) {
      products = products.filter((p) => p.category === filters.category)
    }

    if (filters?.brand) {
      products = products.filter((p) => p.brand === filters.brand)
    }

    if (filters?.minPrice) {
      products = products.filter((p) => p.price >= filters.minPrice!)
    }

    if (filters?.maxPrice) {
      products = products.filter((p) => p.price <= filters.maxPrice!)
    }

    // Apply sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          products.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          products.sort((a, b) => b.price - a.price)
          break
        case "name-asc":
          products.sort((a, b) => a.name.localeCompare(b.name))
          break
        case "name-desc":
          products.sort((a, b) => b.name.localeCompare(a.name))
          break
      }
    }

    return products
  },

  getBySlug: async (slug: string): Promise<Product | null> => {
    await simulateDelay(200)
    return mockProducts.find((p) => p.slug === slug) || null
  },

  getFeatured: async (): Promise<Product[]> => {
    await simulateDelay(200)
    return mockProducts.filter((p) => p.featured).slice(0, 8)
  },

  search: async (query: string): Promise<Product[]> => {
    await simulateDelay(300)
    const lowerQuery = query.toLowerCase()
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery),
    )
  },
}

// Orders API - Using localStorage for persistence
export const ordersApi = {
  create: async (orderData: Omit<Order, "id" | "createdAt">): Promise<Order> => {
    await simulateDelay(500)

    const order: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    let orders = []
    try {
      const stored = localStorage.getItem("orders")
      orders = stored ? JSON.parse(stored) : []
    } catch {
      orders = []
    }

    orders.push(order)
    localStorage.setItem("orders", JSON.stringify(orders))

    return order
  },

  getAll: async (userId: string): Promise<Order[]> => {
    await simulateDelay(300)

    let orders = []
    try {
      const stored = localStorage.getItem("orders")
      orders = stored ? JSON.parse(stored) : []
    } catch {
      orders = []
    }

    // If no orders exist and it's a demo user, return mock orders
    if (orders.length === 0 && userId) {
      return mockOrders.map((order) => ({ ...order, userId }))
    }

    return orders.filter((order: Order) => order.userId === userId)
  },

  getById: async (id: string): Promise<Order | null> => {
    await simulateDelay(200)

    let orders = []
    try {
      const stored = localStorage.getItem("orders")
      orders = stored ? JSON.parse(stored) : []
    } catch {
      orders = []
    }

    return orders.find((order: Order) => order.id === id) || null
  },
}

// Auth API - Mock authentication
export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await simulateDelay(500)

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: User) => u.email === email)

    if (user) {
      return {
        user,
        token: `mock-token-${user.id}`,
      }
    }

    // Create demo user if not exists
    const demoUser: User = {
      id: `user-${Date.now()}`,
      name: "Usuario Demo",
      email,
      role: email.includes("admin") ? "admin" : "user",
    }

    users.push(demoUser)
    localStorage.setItem("users", JSON.stringify(users))

    return {
      user: demoUser,
      token: `mock-token-${demoUser.id}`,
    }
  },

  register: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    await simulateDelay(500)

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "user",
    }

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    return {
      user: newUser,
      token: `mock-token-${newUser.id}`,
    }
  },

  getProfile: async (token: string): Promise<User | null> => {
    await simulateDelay(200)
    const userId = token.replace("mock-token-", "")
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    return users.find((u: User) => u.id === userId) || null
  },
}
