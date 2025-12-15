import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductsGrid } from "@/components/product/products-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { Suspense } from "react"
import { ProductsGridSkeleton } from "@/components/product/products-grid-skeleton"

export const metadata = {
  title: "Productos - EduSupplies",
  description: "Explora nuestro catálogo completo de útiles escolares",
}

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/30">
          <div className="container py-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Catálogo de productos</h1>
            <p className="mt-2 text-muted-foreground">Encuentra todo lo que necesitas para el regreso a clases</p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Filters Sidebar */}
            <aside className="space-y-6">
              <ProductFilters />
            </aside>

            {/* Products Grid */}
            <div>
              <Suspense fallback={<ProductsGridSkeleton />}>
                <ProductsGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
