import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

export function PromoBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 md:p-12 lg:p-16">
          <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/20 p-3">
              <Gift className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl mb-4">
              Envío gratis en compras mayores a $50
            </h2>
            <p className="text-lg text-white/90 text-pretty mb-8 leading-relaxed">
              Aprovecha nuestra promoción especial de regreso a clases. Válido en todos los productos hasta fin de mes.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-base">
              <Link href="/products">Comprar ahora</Link>
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
