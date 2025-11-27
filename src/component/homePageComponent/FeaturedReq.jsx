'use client';

import React from 'react';
import RequestCard from '../manage/RequestCard';
import { useQuery } from '@tanstack/react-query';
import FeturedLoaderSkeleton from '../loader/FeturedLoaderSkeleton';

const FeaturedReq = () => {
  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['featuredRequests'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/featured-request`
      );
      if (!res.ok) throw new Error('Failed to fetch featured requests');
      return res.json();
    },
  });
  if (error) return <p className="text-red-500">Failed to load data</p>;
  // console.log(requests);
  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
        Urgent Blood Requests Near You
      </h2>
      <p className="text-lg text-center mb-12 text-gray-500">
        These patients need immediate assistance. Click to view details and
        help.
      </p>
      {isLoading ? (
        <FeturedLoaderSkeleton total={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {requests.map(request => (
            <RequestCard key={request._id} request={request}></RequestCard>
          ))}
        </div>
      )}
    </section>
  );
};
export default FeaturedReq;
