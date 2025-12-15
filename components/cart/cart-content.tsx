"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cart-store"
import { CartItem } from "./cart-item"
import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CartContent() {
  const { items, getTotal, getItemCount } = useCartStore()

  const subtotal = getTotal()
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">Tu carrito está vacío</h3>
            <p className="text-sm text-muted-foreground">Agrega productos para comenzar tu compra</p>
          </div>
          <Button asChild>
            <Link href="/products">Explorar productos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Cart Items */}
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">{getItemCount()} productos en tu carrito</div>

          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit">
          <Card className="p-6 space-y-4 sticky top-24">
            <h2 className="text-xl font-semibold">Resumen del pedido</h2>

            <Separator />

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal ({getItemCount()} productos)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Envío</span>
                {shipping === 0 ? (
                  <span className="font-medium text-secondary">Gratis</span>
                ) : (
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                )}
              </div>

              {shipping === 0 && (
                <div className="rounded-md bg-secondary/10 p-3 text-sm text-secondary">
                  ¡Felicitaciones! Tienes envío gratis
                </div>
              )}

              {subtotal < 50 && subtotal > 0 && (
                <div className="rounded-md bg-accent/10 p-3 text-sm text-accent-foreground">
                  Agrega ${(50 - subtotal).toFixed(2)} más para envío gratis
                </div>
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-2xl">${total.toFixed(2)}</span>
            </div>

            <Button size="lg" className="w-full" asChild>
              <Link href="/checkout">
                Proceder al pago
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/products">Continuar comprando</Link>
            </Button>

            {/* Security Badge */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Compra 100% segura y protegida</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
