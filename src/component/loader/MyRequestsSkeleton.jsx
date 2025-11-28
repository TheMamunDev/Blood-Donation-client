import React from 'react';

const MyRequestsSkeleton = ({ total }) => {
  const skeletonItems = Array(total).fill(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="card bg-red-100/50 shadow-xl border-l-4 border-gray-300 animate-pulse"
        >
          <div className="card-body p-6">
            <div className="flex flex-col xs:flex-row justify-between items-center mb-3">
              <div className="skeleton h-8 w-2/3 md:w-48 rounded-md" />

              <div className="skeleton h-6 w-20 rounded-full mt-2 xs:mt-0" />
            </div>

            <div className="flex items-center mt-2">
              <div className="skeleton w-4 h-4 rounded-full mr-2" />{' '}
              <div className="skeleton h-4 w-5/6 rounded-md" />
            </div>
            <div className="flex items-center mt-1">
              <div className="skeleton w-3 h-3 rounded-full mr-2" />{' '}
              <div className="skeleton h-3 w-4/5 rounded-md" />
            </div>
            <div className="flex items-center mt-1">
              <div className="skeleton w-3 h-3 rounded-full mr-2" />{' '}
              <div className="skeleton h-3 w-3/4 rounded-md" />
            </div>
            <div className="skeleton h-px w-full bg-gray-200 my-4" />
            <div className="card-actions justify-end space-x-2">
              <div className="skeleton h-8 w-16 rounded-md" />
              <div className="skeleton h-8 w-20 rounded-md" />
              <div className="skeleton h-8 w-24 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRequestsSkeleton;
