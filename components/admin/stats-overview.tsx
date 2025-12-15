"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import type { Order } from "@/types"

export function StatsOverview() {
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem("orders")
      const storedUsers = localStorage.getItem("users")
      setOrders(storedOrders ? JSON.parse(storedOrders) : [])
      setUsers(storedUsers ? JSON.parse(storedUsers) : [])
    } catch {
      setOrders([])
      setUsers([])
    }
  }, [])

  // Calculate stats
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalProducts = mockProducts.length
  const totalUsers = users.length

  // Get recent orders
  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Calculate top products
  const productSales: Record<string, { name: string; count: number }> = {}
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = { name: item.name, count: 0 }
      }
      productSales[item.productId].count += item.quantity
    })
  })

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const stats = [
    {
      title: "Ventas Totales",
      value: `$${totalSales.toFixed(2)}`,
      description: `${totalOrders} pedidos`,
      icon: DollarSign,
    },
    {
      title: "Pedidos",
      value: totalOrders.toString(),
      description: "Total registrados",
      icon: ShoppingCart,
    },
    {
      title: "Productos",
      value: totalProducts.toString(),
      description: "En catálogo",
      icon: Package,
    },
    {
      title: "Usuarios",
      value: totalUsers.toString(),
      description: "Registrados",
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Productos más vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{product.name}</span>
                    <span className="text-sm font-medium">{product.count} unidades</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No hay ventas registradas aún</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-mono">{order.id}</span>
                      <p className="text-xs text-muted-foreground">${order.total.toFixed(2)}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No hay pedidos registrados aún</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
