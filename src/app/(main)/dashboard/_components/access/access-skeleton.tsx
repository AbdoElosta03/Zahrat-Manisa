import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AccessSkeleton({ kind = "users" }: { kind?: "users" | "roles" }) {
  return (
    <div className="flex flex-col gap-6" role="status" aria-label="Loading" aria-busy="true">
      <span className="sr-only">Loading / جارٍ التحميل</span>
      <div aria-hidden="true" className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2"><Skeleton className="h-8 w-48" /><Skeleton className="h-4 w-64" /></div>
        <Skeleton className="h-8 w-32" />
      </div>
      <div aria-hidden="true" className="grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <Card key={index}>
            <CardHeader><Skeleton className="h-4 w-28" /></CardHeader>
            <CardContent><Skeleton className="h-8 w-16" /></CardContent>
          </Card>
        ))}
      </div>
      <Card aria-hidden="true">
        <CardHeader className="gap-4">
          <Skeleton className="h-5 w-40" />
          <div className="flex gap-3"><Skeleton className="h-8 flex-1" /><Skeleton className="h-8 w-32" /></div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {Array.from({ length: kind === "roles" ? 8 : 5 }, (_, row) => (
            <div key={row} className="grid grid-cols-3 gap-4 sm:grid-cols-5">
              {[0, 1, 2, 3, 4].map((column) => <Skeleton key={column} className="h-7 w-full" />)}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
