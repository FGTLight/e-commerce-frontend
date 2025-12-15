"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { mockCategories } from "@/lib/mock-data"
import { X } from "lucide-react"
import { useState } from "react"

const brands = ["Norma", "Bic", "Totto", "Faber-Castell", "Office Max", "Casio"]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 100])

  const currentCategory = searchParams.get("category")
  const currentBrand = searchParams.get("brand")

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/products?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push("/products")
    setPriceRange([0, 100])
  }

  const hasActiveFilters = currentCategory || currentBrand

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full bg-transparent" onClick={clearAllFilters}>
          <X className="mr-2 h-4 w-4" />
          Limpiar filtros
        </Button>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentCategory || ""} onValueChange={(value) => updateFilters("category", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-categories" />
              <Label htmlFor="all-categories" className="font-normal cursor-pointer">
                Todas las categorías
              </Label>
            </div>
            {mockCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.slug} id={category.slug} />
                <Label htmlFor={category.slug} className="font-normal cursor-pointer">
                  {category.name}
                  <span className="ml-1 text-xs text-muted-foreground">({category.productCount})</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Marcas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={currentBrand === brand}
                onCheckedChange={(checked) => updateFilters("brand", checked ? brand : null)}
              />
              <Label htmlFor={brand} className="font-normal cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rango de precio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            step={5}
            className="w-full"
            aria-label="Rango de precio"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">${priceRange[0]}</span>
            <span className="text-muted-foreground">${priceRange[1]}</span>
          </div>
          <Button
            className="w-full"
            size="sm"
            onClick={() => {
              updateFilters("minPrice", priceRange[0].toString())
              updateFilters("maxPrice", priceRange[1].toString())
            }}
          >
            Aplicar precio
          </Button>
        </CardContent>
      </Card>

      {/* Stock Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Disponibilidad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" defaultChecked />
            <Label htmlFor="in-stock" className="font-normal cursor-pointer">
              En stock
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="out-of-stock" />
            <Label htmlFor="out-of-stock" className="font-normal cursor-pointer">
              Agotado
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
