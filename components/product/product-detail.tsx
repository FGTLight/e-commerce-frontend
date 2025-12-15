"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import type { Product } from "@/types"
import { useCartStore } from "@/store/cart-store"
import { toast } from "sonner"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`${quantity} ${product.name} agregado(s) al carrito`, {
      description: "Puedes continuar comprando o ir al carrito",
    })
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground">
          Inicio
        </a>
        <span>/</span>
        <a href="/products" className="hover:text-foreground">
          Productos
        </a>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>
          </div>

          <Separator />

          <div>
            <div className="text-4xl font-bold">${product.price.toFixed(2)}</div>
            <p className="mt-1 text-sm text-muted-foreground">Precio incluye IVA</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={incrementQuantity} disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {product.stock > 0 ? `${product.stock} disponibles` : "Sin stock"}
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al carrito
            </Button>
          </div>

          <Card className="p-4 space-y-3 bg-muted/50">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Envío gratis</p>
                <p className="text-sm text-muted-foreground">En compras mayores a $50</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Compra protegida</p>
                <p className="text-sm text-muted-foreground">Garantía de satisfacción</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Devoluciones</p>
                <p className="text-sm text-muted-foreground">30 días para devolver</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
