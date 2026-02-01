export default function FilterSkeleton() {
    return (
        <div className="w-80 bg-[#FAFAF8] border-r border-[#E8E2D4] animate-pulse">
            {/* Header Skeleton */}
            <div className="p-6 border-b border-[#E8E2D4]">
                <div className="h-6 bg-[#E8E2D4] rounded-lg w-20"></div>
            </div>

            {/* Content Skeleton */}
            <div className="p-6 space-y-8">
                {/* Category Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 bg-[#E8E2D4] rounded w-16"></div>
                    <div className="grid grid-cols-2 gap-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-12 bg-[#E8E2D4] rounded-2xl"></div>
                        ))}
                    </div>
                </div>

                {/* Price Range Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 bg-[#E8E2D4] rounded w-20"></div>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <div className="h-8 bg-[#E8E2D4] rounded-xl w-16"></div>
                            <div className="h-8 bg-[#E8E2D4] rounded-xl w-16"></div>
                        </div>
                        <div className="h-2 bg-[#E8E2D4] rounded-full"></div>
                    </div>
                </div>

                {/* Brand Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 bg-[#E8E2D4] rounded w-24"></div>
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <div className="w-5 h-5 bg-[#E8E2D4] rounded"></div>
                                <div className="h-4 bg-[#E8E2D4] rounded flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Availability Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 bg-[#E8E2D4] rounded w-20"></div>
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-6 bg-[#E8E2D4] rounded-full"></div>
                        <div className="h-4 bg-[#E8E2D4] rounded w-20"></div>
                    </div>
                </div>

                {/* Sort Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 bg-[#E8E2D4] rounded w-16"></div>
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-[#E8E2D4] rounded-full"></div>
                                <div className="h-4 bg-[#E8E2D4] rounded flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}