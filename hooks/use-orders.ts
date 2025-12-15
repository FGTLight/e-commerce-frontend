import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ordersApi } from "@/services/api"
import type { Order } from "@/types"

export function useOrders(userId: string) {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => ordersApi.getAll(userId),
    enabled: !!userId,
  })
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => ordersApi.getById(orderId),
    enabled: !!orderId,
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderData: Omit<Order, "id" | "createdAt">) => ordersApi.create(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
}
