import type { Metadata } from "next"
import OffersHero from "@/components/offers/offers-hero"
import OffersGrid from "@/components/offers/offers-grid"

export const metadata: Metadata = {
  title: "Ofertas Especiales - Útiles Escolares",
  description:
    "Aprovecha nuestras mejores ofertas en útiles escolares. Descuentos de hasta 35% en productos seleccionados.",
}

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-background">
      <OffersHero />
      <OffersGrid />
    </div>
  )
}
