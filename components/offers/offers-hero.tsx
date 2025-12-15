import { Tag, Sparkles } from "lucide-react"

export default function OffersHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Ofertas Limitadas</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Ofertas <span className="text-primary">Especiales</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl">
            Aprovecha nuestros mejores descuentos en útiles escolares de calidad. Ahorra hasta{" "}
            <span className="font-bold text-primary">35%</span> en productos seleccionados.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card border">
              <Tag className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Descuentos hasta</p>
                <p className="text-lg font-bold text-primary">35%</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card border">
              <Sparkles className="h-5 w-5 text-accent" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Productos en oferta</p>
                <p className="text-lg font-bold">14 artículos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
    </section>
  )
}
