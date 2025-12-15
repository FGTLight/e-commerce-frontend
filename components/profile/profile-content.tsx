"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileInfo } from "./profile-info"
import { OrderHistory } from "./order-history"
import { User, Package } from "lucide-react"

export function ProfileContent() {
  return (
    <div className="container py-8">
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="info" className="gap-2">
            <User className="h-4 w-4" />
            Información
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <Package className="h-4 w-4" />
            Pedidos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <ProfileInfo />
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
