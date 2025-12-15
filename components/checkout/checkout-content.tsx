"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShippingForm } from "./shipping-form"
import { PaymentMethodSelector } from "./payment-method-selector"
import { OrderSummary } from "./order-summary"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { useAuthStore } from "@/store/auth-store"
import { Loader2 } from "lucide-react"
import type { ShippingAddress, Order } from "@/types"

export function CheckoutContent() {
  const router = useRouter()
  const { items, clearCart, getTotal, getSubtotal } = useCartStore()
  const { user } = useAuthStore()

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const handlePlaceOrder = async () => {
    setErrorMessage("")

    if (!shippingAddress) {
      setErrorMessage("Por favor completa la dirección de envío")
      return
    }

    if (!paymentMethod) {
      setErrorMessage("Por favor selecciona un método de pago")
      return
    }

    if (!user) {
      setErrorMessage("Debes iniciar sesión para realizar un pedido")
      setTimeout(() => router.push("/login"), 2000)
      return
    }

    setIsProcessing(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const subtotal = getSubtotal()
      const shipping = subtotal >= 50 ? 0 : 5
      const total = subtotal + shipping

      const order: Order = {
        id: `ORD-${Date.now()}`,
        userId: user.id,
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        shipping,
        total,
        status: "pending",
        shippingAddress,
        paymentMethod,
        createdAt: new Date().toISOString(),
      }

      // Save to localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      orders.push(order)
      localStorage.setItem("orders", JSON.stringify(orders))

      clearCart()
      router.push(`/checkout/success?orderId=${order.id}`)
    } catch (error) {
      setErrorMessage("Error al procesar el pedido. Por favor intenta nuevamente")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Checkout Forms */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Dirección de envío</h2>
            <ShippingForm onAddressComplete={setShippingAddress} />
          </Card>

          {/* Payment Method */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Método de pago</h2>
            <PaymentMethodSelector onPaymentMethodSelect={setPaymentMethod} />
          </Card>
        </div>

        {/* Order Summary */}
        <div className="h-fit">
          <Card className="p-6 space-y-6 sticky top-24">
            <h2 className="text-xl font-semibold">Resumen del pedido</h2>
            <Separator />
            <OrderSummary />
            <Separator />
            {errorMessage && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{errorMessage}</div>
            )}
            <Button
              size="lg"
              className="w-full"
              onClick={handlePlaceOrder}
              disabled={isProcessing || !shippingAddress || !paymentMethod}
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isProcessing ? "Procesando..." : "Confirmar pedido"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
