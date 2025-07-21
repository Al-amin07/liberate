import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function ActiveEventCardSkeleton() {
    return (
        <Card className="hover:shadow-xl transition-all duration-300 transform bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-2/3 rounded-md" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded-full" />
                        <Skeleton className="h-4 w-1/2 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded-full" />
                        <Skeleton className="h-4 w-1/3 rounded" />
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                </div>

                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-8 w-full rounded-md" />
                    <Skeleton className="h-8 w-full rounded-md" />
                </div>
            </CardContent>
        </Card>
    )
}
