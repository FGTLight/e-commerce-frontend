"use client"

import { useCartStore } from "@/store/cart-store"
import { ScrollArea } from "@/components/ui/scroll-area"

export function OrderSummary() {
  const { items, getTotal, getItemCount } = useCartStore()

  const subtotal = getTotal()
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  return (
    <div className="space-y-4">
      <ScrollArea className="max-h-[300px] pr-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                <img
                  src={item.product.images[0] || "/placeholder.svg"}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 leading-tight">{item.product.name}</h4>
                <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)} c/u</p>
              </div>
              <div className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({getItemCount()} productos)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Envío</span>
          {shipping === 0 ? (
            <span className="font-medium text-secondary">Gratis</span>
          ) : (
            <span className="font-medium">${shipping.toFixed(2)}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-lg font-semibold pt-2">
        <span>Total</span>
        <span className="text-2xl">${total.toFixed(2)}</span>
      </div>
    </div>
  )
}
