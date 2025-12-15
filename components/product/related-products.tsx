"use client"

import { ProductCard } from "./product-card"
import { mockProducts } from "@/lib/mock-data"
import type { Product } from "@/types"

interface RelatedProductsProps {
  currentProduct: Product
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const relatedProducts = mockProducts
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="border-t bg-muted/30 py-16">
      <div className="container">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Productos relacionados</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
