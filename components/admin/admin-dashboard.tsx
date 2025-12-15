"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsOverview } from "./stats-overview"
import { ProductsManagement } from "./products-management"
import { OrdersManagement } from "./orders-management"
import { BarChart3, Package, ShoppingBag } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="container py-8">
      <Tabs defaultValue="stats" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="stats" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="products" className="gap-2">
            <Package className="h-4 w-4" />
            Productos
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Pedidos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <StatsOverview />
        </TabsContent>

        <TabsContent value="products">
          <ProductsManagement />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
