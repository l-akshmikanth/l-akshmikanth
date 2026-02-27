"use client";

interface PreviewSkeletonProps {
  isLoading: boolean;
}

export default function PreviewSkeleton({ isLoading }: PreviewSkeletonProps) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-10 bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="flex flex-col items-center justify-center h-full space-y-4 px-6">
        {/* Fake browser content shimmer */}
        <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
