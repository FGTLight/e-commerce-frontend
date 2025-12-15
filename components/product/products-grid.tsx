"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "./product-card"
import { mockProducts } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 12

export function ProductsGrid() {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)

  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const sortBy = searchParams.get("sortBy") || "popular"

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...mockProducts]

    // Apply category filter
    if (category) {
      products = products.filter((p) => p.category === category)
    }

    // Apply brand filter
    if (brand) {
      products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
    }

    // Apply price filters
    if (minPrice) {
      products = products.filter((p) => p.price >= Number(minPrice))
    }
    if (maxPrice) {
      products = products.filter((p) => p.price <= Number(maxPrice))
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        products.sort((a, b) => b.price - a.price)
        break
      case "popular":
        products.sort((a, b) => b.reviews - a.reviews)
        break
      case "newest":
        // In a real app, you'd sort by creation date
        products.sort((a, b) => b.id.localeCompare(a.id))
        break
    }

    return products
  }, [category, brand, minPrice, maxPrice, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [category, brand, minPrice, maxPrice, sortBy])

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} de{" "}
          {filteredProducts.length} productos
        </p>

        <Select defaultValue={sortBy}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Más populares</SelectItem>
            <SelectItem value="newest">Más recientes</SelectItem>
            <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className="h-9 w-9"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Página siguiente</span>
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No se encontraron productos</h3>
            <p className="text-sm text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
          </div>
          <Button variant="outline" onClick={() => window.location.replace("/products")}>
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  )
}
