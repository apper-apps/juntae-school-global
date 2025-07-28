import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, variant = "default" }) => {
  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded-lg shimmer w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-lg shimmer w-1/2"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full shimmer"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded shimmer w-1/2"></div>
                </div>
              </div>
              <div className="h-32 bg-gray-200 rounded-lg shimmer"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded shimmer"></div>
                <div className="h-3 bg-gray-200 rounded shimmer w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
          <div className="w-12 h-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 mb-1">로딩 중...</p>
          <p className="text-sm text-gray-500">잠시만 기다려주세요</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;