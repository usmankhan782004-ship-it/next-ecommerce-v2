import { Skeleton } from "@/components/ui/Skeleton"

export function ProductSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-[300px] w-full rounded-xl bg-muted/50" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4 bg-muted/50" />
                <Skeleton className="h-4 w-1/2 bg-muted/50" />
            </div>
        </div>
    )
}
