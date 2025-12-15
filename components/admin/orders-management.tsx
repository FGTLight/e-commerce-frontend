"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye } from "lucide-react"
import type { Order } from "@/types"

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
  processing: { label: "Procesando", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  shipped: { label: "Enviado", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400" },
  delivered: { label: "Entregado", color: "bg-green-500/10 text-green-700 dark:text-green-400" },
  cancelled: { label: "Cancelado", color: "bg-red-500/10 text-red-700 dark:text-red-400" },
}

export function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const loadOrders = () => {
      try {
        const stored = localStorage.getItem("orders")
        const allOrders = stored ? JSON.parse(stored) : []
        setOrders(allOrders)
      } catch {
        setOrders([])
      }
    }

    loadOrders()
  }, [])

  const handleStatusChange = (orderId: string, newStatus: string) => {
    try {
      const stored = localStorage.getItem("orders")
      const allOrders = stored ? JSON.parse(stored) : []
      const updatedOrders = allOrders.map((order: Order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      )
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
      setOrders(updatedOrders)
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">No hay pedidos registrados aún.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold font-mono">{order.id}</h3>
                  <Badge className={statusConfig[order.status].color} variant="secondary">
                    {statusConfig[order.status].label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {order.items.length} producto{order.items.length !== 1 ? "s" : ""}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
                </div>
                <Select defaultValue={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="processing">Procesando</SelectItem>
                    <SelectItem value="shipped">Enviado</SelectItem>
                    <SelectItem value="delivered">Entregado</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
