"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Package, ArrowRight } from "lucide-react"
import confetti from "canvas-confetti"

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-2xl">
          <Card className="p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
                <CheckCircle2 className="h-12 w-12 text-secondary" />
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-2">¡Pedido confirmado!</h1>
            <p className="text-lg text-muted-foreground mb-8">Gracias por tu compra en EduSupplies</p>

            {orderId && (
              <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm mb-8">
                <Package className="h-4 w-4" />
                <span className="font-medium">Número de pedido:</span>
                <span className="font-mono font-semibold">{orderId}</span>
              </div>
            )}

            <div className="space-y-4 mb-8 text-left bg-muted/50 rounded-lg p-6">
              <h2 className="font-semibold text-center mb-4">¿Qué sigue?</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Confirmación por email</p>
                    <p className="text-sm text-muted-foreground">Recibirás un correo con los detalles de tu pedido</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Preparación del pedido</p>
                    <p className="text-sm text-muted-foreground">Preparamos tus productos con cuidado</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Envío y entrega</p>
                    <p className="text-sm text-muted-foreground">Recibirás tu pedido en 3-5 días hábiles</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/profile/orders">
                  Ver mis pedidos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent">
                <Link href="/products">Seguir comprando</Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
