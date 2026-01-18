'use client';
import MyRequestedCard from '@/component/manage/MyRequestCard';
import Link from 'next/link';
import { FiArchive } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/utils/apiClient';
import MyRequestsSkeleton from '@/component/loader/MyRequestsSkeleton';
import { useEffect } from 'react';
import Error from '@/component/error/Error';

export default function ManageRequestsPage() {
  useEffect(() => {
    document.title = 'My Requests | Blood Hub';
  }, []);
  const { data: session } = useSession();
  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['my-requests'],
    queryFn: async () => {
      const res = await apiClient(`/my-request/${session?.user.email}`);
      if (res.status === 403) {
        throw new Error('Failed to fetch my requests');
      }
      return res.json();
    },
  });
  console.log(error);
  if (error) return <Error error={error}></Error>;

  return (
    <div className="py-10 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-extrabold mb-2 text-gray-800 flex items-center">
        <FiArchive className="mr-3 text-red-600 hidden md:block" /> My Blood
        Requests
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        Hello, {session?.user.name || session?.user.email}. Manage all your
        submitted blood requests and check their status.
      </p>

      {requests?.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              You have no active or fulfilled blood requests. Start by
              submitting one!
            </span>
          </div>
          <div className="flex-none">
            <Link
              href="/dashboard/add-request"
              className="btn btn-sm btn-primary"
            >
              Submit Request
            </Link>
          </div>
        </div>
      ) : (
        <>
          {isLoading ? (
            <MyRequestsSkeleton total={9}> </MyRequestsSkeleton>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests?.map(request => (
                <MyRequestedCard key={request._id} request={request} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
