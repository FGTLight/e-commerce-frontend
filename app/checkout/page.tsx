"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutContent } from "@/components/checkout/checkout-content"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="border-b bg-muted/30">
            <div className="container py-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Finalizar compra</h1>
              <p className="mt-2 text-muted-foreground">Completa tu información para procesar el pedido</p>
            </div>
          </div>
          <CheckoutContent />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
