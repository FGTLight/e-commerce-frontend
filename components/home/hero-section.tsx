import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="container py-16 md:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm w-fit">
              <span className="text-primary font-semibold">Nuevo</span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-muted-foreground">Colección Regreso a Clases 2025</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              Prepárate para el
              <span className="text-primary"> éxito escolar</span>
            </h1>

            <p className="text-lg text-muted-foreground text-pretty md:text-xl max-w-2xl leading-relaxed">
              Encuentra todos los útiles escolares que necesitas para un año académico exitoso. Calidad, variedad y los
              mejores precios.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="text-base">
                <Link href="/products">
                  Ver productos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <Link href="/categories">Explorar categorías</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Productos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">50k+</div>
                <div className="text-sm text-muted-foreground">Clientes felices</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Soporte</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border bg-muted/50 shadow-2xl">
              <img
                src="/student-studying-with-colorful-school-supplies.jpg"
                alt="Estudiante con útiles escolares"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
