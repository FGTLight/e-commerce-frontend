import { useQuery } from "@tanstack/react-query"
import { productsApi } from "@/services/api"
import type { ProductFilters } from "@/types"

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productsApi.getAll(filters),
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productsApi.getBySlug(slug),
    enabled: !!slug,
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => productsApi.getFeatured(),
  })
}
