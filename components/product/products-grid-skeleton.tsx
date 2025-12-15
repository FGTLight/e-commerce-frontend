import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductsGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <Skeleton className="aspect-square w-full" />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-3 p-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-24" />
              <div className="flex w-full items-center justify-between">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
