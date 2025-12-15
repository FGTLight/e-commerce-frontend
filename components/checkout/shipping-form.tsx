"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { ShippingAddress } from "@/types"

const shippingSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  city: z.string().min(2, "La ciudad es requerida"),
  state: z.string().min(2, "El estado/provincia es requerido"),
  postalCode: z.string().min(4, "El código postal es requerido"),
  phone: z.string().min(8, "El teléfono debe tener al menos 8 dígitos"),
})

interface ShippingFormProps {
  onAddressComplete: (address: ShippingAddress) => void
}

export function ShippingForm({ onAddressComplete }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
  })

  const onSubmit = (data: ShippingAddress) => {
    console.log("[v0] Shipping form submitted with data:", data)
    onAddressComplete(data)
  }

  const onError = (errors: any) => {
    console.log("[v0] Form validation errors:", errors)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nombre completo</Label>
        <Input
          id="fullName"
          placeholder="Juan Pérez"
          {...register("fullName")}
          aria-invalid={errors.fullName ? "true" : "false"}
        />
        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          placeholder="Calle Principal 123, Apt 4B"
          {...register("address")}
          aria-invalid={errors.address ? "true" : "false"}
        />
        {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input
            id="city"
            placeholder="Buenos Aires"
            {...register("city")}
            aria-invalid={errors.city ? "true" : "false"}
          />
          {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Estado/Provincia</Label>
          <Input id="state" placeholder="CABA" {...register("state")} aria-invalid={errors.state ? "true" : "false"} />
          {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Código Postal</Label>
          <Input
            id="postalCode"
            placeholder="1000"
            {...register("postalCode")}
            aria-invalid={errors.postalCode ? "true" : "false"}
          />
          {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            placeholder="+54 11 1234-5678"
            {...register("phone")}
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!isValid}>
        Guardar dirección
      </Button>
    </form>
  )
}
