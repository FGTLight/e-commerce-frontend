"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Eye } from "lucide-react"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-ABC123",
    date: "2025-01-15",
    total: 45.99,
    status: "delivered" as const,
    items: 3,
  },
  {
    id: "ORD-DEF456",
    date: "2025-01-10",
    total: 89.5,
    status: "shipped" as const,
    items: 5,
  },
  {
    id: "ORD-GHI789",
    date: "2025-01-05",
    total: 23.99,
    status: "processing" as const,
    items: 2,
  },
]

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
  processing: { label: "Procesando", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  shipped: { label: "Enviado", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400" },
  delivered: { label: "Entregado", color: "bg-green-500/10 text-green-700 dark:text-green-400" },
  cancelled: { label: "Cancelado", color: "bg-red-500/10 text-red-700 dark:text-red-400" },
}

export function OrderHistory() {
  if (mockOrders.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8">
          <Package className="h-12 w-12 text-muted-foreground" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">No tienes pedidos</h3>
            <p className="text-sm text-muted-foreground">Tus pedidos aparecerán aquí</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {mockOrders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{order.id}</h3>
                  <Badge className={statusConfig[order.status].color} variant="secondary">
                    {statusConfig[order.status].label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm">
                  {order.items} {order.items === 1 ? "producto" : "productos"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
                </div>
                <Button size="sm" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver detalles
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
