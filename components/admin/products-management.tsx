"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

export function ProductsManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar producto
        </Button>
      </div>

      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold leading-tight">{product.name}</h3>
                      <Badge variant={product.stock > 0 ? "default" : "secondary"}>Stock: {product.stock}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
