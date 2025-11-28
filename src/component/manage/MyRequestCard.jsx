'use client';

import Link from 'next/link';
import { FiCalendar, FiMapPin, FiTrash2, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/utils/apiClient';

const getBadgeClass = priority => {
  switch (priority) {
    case 'Low':
      return 'badge-neutral';
    case 'Critical':
      return 'badge-error';
    case 'High':
      return 'badge-warning';
    case 'Medium':
      return 'badge-info';
  }
};

export default function MyRequestedCard({ request }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteReq = useMutation({
    mutationFn: async id => {
      try {
        const result = await apiClient(`/blood-request/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return result.json();
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (res, data) => {
      console.log(data, res);
      Swal.fire('Deleted!', data.message, 'success');
      queryClient.setQueryData(['my-requests'], prevData => {
        return prevData.filter(item => item._id !== data);
      });
      if (res.deletedCount) {
        toast.error(`Successfully deleted`);
      }
    },
  });
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this request!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      deleteReq.mutate(request._id);
    }
  };

  const updateData = useMutation({
    mutationFn: async data => {
      try {
        const result = await apiClient(`/blood-request/close/${request._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        return result.json();
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data, postData) => {
      console.log(data, postData);
      queryClient.setQueryData(['my-requests'], old => {
        if (!old) return;

        return old.map(req => (req._id === postData._id ? postData : req));
      });
    },
  });
  const handleCloseRequest = async () => {
    const result = await Swal.fire({
      title: 'Confirm Fulfillment?',
      text: 'Are you sure this request has been fulfilled and should be marked as CLOSED?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Close It!',
    });

    if (result.isConfirmed) {
      const data = { ...request, status: 'Closed' };
      updateData.mutate(data);
    }
  };
  return (
    <div className="card bg-red-100  shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.01] border-l-4 border-red-500">
      <div className="card-body p-6">
        <div className="flex flex-col xs:flex-row justify-between items-center">
          <h2 className="card-title text-lg md:text-3xl font-extrabold text-red-600">
            {request.bloodGroupNeeded} ({request.unitsNeeded} Units)
          </h2>
          <div
            className={`badge ${getBadgeClass(
              request.priority
            )} text-white whitespace-nowrap`}
          >
            {request.priority} Priority
          </div>
        </div>

        <p className="flex items-center text-gray-600 mt-2">
          <FiMapPin className="mr-2 text-primary" /> {request.hospitalName}
        </p>
        <p className="flex items-center text-sm text-gray-500">
          <FiCalendar className="mr-2" /> Posted:{' '}
          {new Date(request.createdAt).toLocaleDateString()}
        </p>
        <p className="flex items-center text-sm text-gray-500">
          <FiCalendar className="mr-2" /> Status:{' '}
          {request.status === 'Closed' ? 'Blood Managed' : 'Need Blood'}
        </p>

        <div className="divider my-1"></div>

        <div className="card-actions justify-end space-x-2">
          <button className="btn btn-sm btn-error text-white">
            <Link href={`/request/${request._id}`}>View</Link>
          </button>

          <button
            disabled={request.status === 'Closed'}
            onClick={handleCloseRequest}
            className="btn btn-sm btn-primary"
          >
            {request.status === 'Closed' ? 'Managed' : 'Close'}
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error btn-outline text-black"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
