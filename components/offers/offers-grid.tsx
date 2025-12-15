"use client"

import { mockProducts } from "@/lib/mock-data"
import ProductCard from "@/components/product/product-card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"

export default function OffersGrid() {
  // Filter products with discount
  const discountedProducts = mockProducts.filter((product) => product.discount && product.discount > 0)

  // Sort by discount percentage (highest first)
  const sortedProducts = [...discountedProducts].sort((a, b) => (b.discount || 0) - (a.discount || 0))

  if (sortedProducts.length === 0) {
    return (
      <div className="container px-4 md:px-6 py-16">
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
          <Package className="h-16 w-16 text-muted-foreground" />
          <h3 className="text-2xl font-semibold">No hay ofertas disponibles</h3>
          <p className="text-muted-foreground max-w-md">
            Actualmente no tenemos productos en oferta. Vuelve pronto para ver nuestras próximas promociones.
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="container px-4 md:px-6 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Todos los Productos en Oferta</h2>
          <p className="text-muted-foreground mt-2">{sortedProducts.length} productos con descuento</p>
        </div>

        <Badge variant="secondary" className="hidden md:inline-flex">
          Ahorra hasta {Math.max(...sortedProducts.map((p) => p.discount || 0))}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
