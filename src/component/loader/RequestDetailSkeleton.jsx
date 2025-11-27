import React from 'react';

// This component uses DaisyUI's 'skeleton' class combined with Tailwind CSS
// to mirror the structure of the detailed blood request card.

const RequestDetailSkeleton = () => {
  return (
    <div className="min-h-screen py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 mb-8 self-start">
        <div className="skeleton w-6 h-6 rounded-full" />{' '}
        <div className="skeleton h-5 w-48 rounded-md" />{' '}
      </div>

      <div className="card shadow-2xl bg-base-100 p-6 md:p-8 border-t-8 border-gray-300">
        {' '}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="skeleton w-8 h-8 rounded-full mr-3" />{' '}
            <div className="skeleton h-10 md:h-12 w-3/4 rounded-md" />{' '}
          </div>

          <div className="skeleton h-6 w-1/2 rounded-md" />
        </div>
        <div className="skeleton h-5 w-32 rounded-md mx-auto my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-lg mb-8 pt-4">
          <div className="flex items-center">
            <div className="skeleton w-6 h-6 rounded-full mr-3" />
            <div className="skeleton h-5 w-40 rounded-md" />{' '}
          </div>
          <div className="flex items-center">
            <div className="skeleton w-6 h-6 rounded-full mr-3" />
            <div className="skeleton h-5 w-32 rounded-md" />{' '}
          </div>
          <div className="flex items-center col-span-1 md:col-span-2">
            <div className="skeleton w-6 h-6 rounded-full mr-3" />
            <div className="skeleton h-5 w-5/6 rounded-md" />{' '}
          </div>
          <div className="flex items-center col-span-1 md:col-span-2">
            <div className="skeleton w-6 h-6 rounded-full mr-3" />
            <div className="skeleton h-5 w-4/5 rounded-md" />{' '}
          </div>
          <div className="flex items-center col-span-1 md:col-span-2">
            <div className="skeleton w-6 h-6 rounded-full mr-3" />
            <div className="skeleton h-5 w-2/3 rounded-md" />
          </div>
        </div>
        <div className="skeleton h-5 w-40 rounded-md mx-auto my-4" />
        <div className="bg-base-200 p-4 rounded-lg flex flex-col gap-3">
          <div className="skeleton h-4 w-full rounded-md" />
          <div className="skeleton h-4 w-11/12 rounded-md" />
          <div className="skeleton h-4 w-full rounded-md" />
          <div className="skeleton h-4 w-5/6 rounded-md" />
        </div>
        <div className="card-actions justify-end mt-8">
          <div className="skeleton h-12 w-64 rounded-lg" />{' '}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailSkeleton;
