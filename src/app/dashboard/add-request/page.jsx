'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlusCircle, FiHeart, FiMapPin, FiPhone } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { apiClient } from '@/utils/apiClient';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const priorities = ['Low', 'Medium', 'High', 'Critical'];

export default function AddRequestForm() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    document.title = 'Add Blood Request | Blood Hub';
  }, []);

  const insertData = useMutation({
    mutationFn: async data =>
      apiClient('/blood-request', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: data => {
      if (data?.success && data.requestId) {
        toast.success('Blood request added successfully!');
        reset();
        Swal.fire({
          title: `Blood Request Added Successfully`,
          text: `Request ID: ${data.requestId}`,
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#03C988',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Proceed',
          cancelButtonText: 'Add Another One',
        }).then(result => {
          if (result.isConfirmed) {
            router.push('/dashboard/my-request');
          }
        });
      }
    },
    onError: err => {
      console.log(err);
      toast.error(err?.message || 'Failed to add request');
    },
  });

  const { isPending } = insertData;

  const onSubmit = data => {
    const formData = {
      ...data,
      userEmail: session.user.email,
    };
    insertData.mutate(formData);
  };

  return (
    <div className="card w-full max-w-2xl mx-auto shadow-xl bg-base-100 mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h2 className="card-title text-2xl md:text-3xl mb-6 text-red-600">
          <FiPlusCircle className="mr-2 hidden md:block" /> Submit New Blood
          Request
        </h2>

        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text flex items-center">
              <FiHeart className="mr-2" />
              Blood Group Needed
            </span>
          </label>
          <select
            {...register('bloodGroupNeeded', {
              required: 'Blood group is required',
            })}
            className="select select-bordered w-full"
          >
            <option value="">Select Required Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.bloodGroupNeeded && (
            <p className="text-red-500 text-xs mt-1">
              {errors.bloodGroupNeeded.message}
            </p>
          )}
        </div>
        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text">Units Needed (Bags)</span>
          </label>
          <input
            type="number"
            {...register('unitsNeeded', {
              required: 'Units are required',
              min: { value: 1, message: 'Minimum 1 unit is required' },
            })}
            placeholder="e.g., 2"
            className="input input-bordered w-full"
          />
          {errors.unitsNeeded && (
            <p className="text-red-500 text-xs mt-1">
              {errors.unitsNeeded.message}
            </p>
          )}
        </div>

        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text">Priority Level</span>
          </label>
          <select
            {...register('priority', { required: 'Priority is required' })}
            className="select w-full select-bordered"
          >
            {priorities.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.priority && (
            <p className="text-red-500 text-xs mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text flex items-center">
              <FiMapPin className="mr-2" />
              Hospital Name / Location
            </span>
          </label>
          <input
            type="text"
            {...register('hospitalName', {
              required: 'Hospital name is required',
            })}
            placeholder="e.g., City Trauma Center, Dhaka"
            className="input input-bordered w-full"
          />
          {errors.hospitalName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.hospitalName.message}
            </p>
          )}
        </div>

        <div className="form-control fieldset">
          <label className="label">
            <span className="label-text flex items-center">
              <FiPhone className="mr-2" />
              Emergency Contact
            </span>
          </label>
          <input
            type="tel"
            {...register('contactNumber', {
              required: 'Contact number is required',
              pattern: {
                value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                message: 'Please enter a valid BD phone number',
              },
            })}
            placeholder="e.g., 01XXXXXXXXX"
            className="input input-bordered w-full"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-error btn-sm md:btn-lg"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Submit Request'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
