import React from 'react';

const FeturedLoaderSkeleton = ({ total }) => {
  const skeletonItems = Array(total).fill(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="card w-full max-w-sm bg-base-100 shadow-xl border border-pink-100 p-4"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="skeleton w-8 h-8 rounded-full bg-red-200" />
              <div className="skeleton h-6 w-16 rounded-md" />
            </div>
            <div className="skeleton h-6 w-24 rounded-full" />
          </div>
          <div className="skeleton h-4 w-3/4 rounded-md mb-4" />
          <div className="skeleton h-px w-full bg-gray-200 my-4" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-4 w-1/2 rounded-md" />
            <div className="skeleton h-4 w-2/3 rounded-md" />
            <div className="skeleton h-4 w-3/5 rounded-md" />
          </div>
          <div className="flex justify-end mt-6">
            <div className="skeleton h-10 w-32 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeturedLoaderSkeleton;
