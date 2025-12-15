"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { mockProducts } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"

export function FeaturedProducts() {
  const featuredProducts = mockProducts.filter((p) => p.featured)

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Productos destacados</h2>
            <p className="mt-2 text-lg text-muted-foreground">Los más vendidos y mejor valorados</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/products">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/products">
              Ver todos los productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
