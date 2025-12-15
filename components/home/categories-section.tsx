import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { mockCategories } from "@/lib/mock-data"

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Compra por categoría
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Encuentra exactamente lo que necesitas en nuestras categorías organizadas
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockCategories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-white/90">{category.productCount} productos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
