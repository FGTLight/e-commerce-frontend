"use client"

import type React from "react"

import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/cart-store"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.discount && (
            <Badge className="absolute right-2 top-2 bg-destructive text-destructive-foreground">
              -{product.discount}%
            </Badge>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <Badge className="absolute left-2 top-2 bg-warning text-warning-foreground">¡Pocas unidades!</Badge>
          )}
          {product.stock === 0 && (
            <Badge className="absolute left-2 top-2 bg-muted text-muted-foreground">Agotado</Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 font-semibold transition-colors group-hover:text-primary">{product.name}</h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {product.discount ? (
            <>
              <span className="text-lg font-bold text-primary">${finalPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart} disabled={product.stock === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
