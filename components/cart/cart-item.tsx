"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem as CartItemType } from "@/types"
import { useCartStore } from "@/store/cart-store"
import Link from "next/link"
import { toast } from "sonner"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()
  const { product, quantity } = item

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove()
      return
    }

    if (newQuantity > product.stock) {
      toast.error("No hay suficiente stock disponible")
      return
    }

    updateQuantity(product.id, newQuantity)
  }

  const handleRemove = () => {
    removeItem(product.id)
    toast.success("Producto eliminado del carrito")
  }

  const itemTotal = product.price * quantity

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link href={`/product/${product.slug}`} className="shrink-0">
          <div className="h-24 w-24 overflow-hidden rounded-md border bg-muted">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <Link href={`/product/${product.slug}`} className="hover:text-primary">
              <h3 className="font-semibold leading-tight line-clamp-2">{product.name}</h3>
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{product.brand}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(quantity - 1)}
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={quantity >= product.stock}
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-semibold">${itemTotal.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">${product.price.toFixed(2)} c/u</div>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={handleRemove}
                aria-label="Eliminar producto"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stock Warning */}
          {quantity >= product.stock && (
            <p className="mt-2 text-xs text-destructive">Has alcanzado el stock máximo disponible</p>
          )}
        </div>
      </div>
    </Card>
  )
}
