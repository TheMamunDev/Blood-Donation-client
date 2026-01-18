'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import SessionLoader from '@/component/loader/SessionLoader';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 5000000;
const registerSchema = z.object({
  name: z.string().min(1, 'Name Required!'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Minimum 6 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),

  photo: z
    .any()
    .transform(fileList => fileList?.[0])
    .refine(file => file?.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

export default function RegisterPage() {
  useEffect(() => {
    document.title = 'Registration | Blood Hub';
  }, []);
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  if (status === 'loading')
    return (
      <div className="min-h-screen">
        <SessionLoader></SessionLoader>
      </div>
    );
  const uploadToImgbb = async file => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.data.display_url;
  };

  const onSubmit = async formDataHandler => {
    const registrationData = {
      name: formDataHandler.name,
      email: formDataHandler.email,
      password: formDataHandler.password,
      photo: 'https://img.icons8.com/office/300/person-male-skin-type-4.png',
    };
    startTransition(async () => {
      try {
        const photoURL = await uploadToImgbb(formDataHandler.photo);
        registrationData.photo = photoURL;
        // console.log(photoURL);
      } catch (err) {
        console.log(err);
        registrationData.photo =
          'https://img.icons8.com/office/300/person-male-skin-type-4.png';
      }

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationData),
        });
        const json = await res.json();
        if (json?.message) {
          Swal.fire({
            icon: 'success',
            title: 'Registered!',
            text: 'Registration successful!',
            showConfirmButton: false,
            timer: 2000,
          });

          router.push('/login');
        } else {
          toast.error(json.message || 'Registration failed. Try again.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        toast.error('Network error. Could not connect to server.');
      }
    });
  };

  const handleGoogle = e => {
    e.preventDefault();
    signIn('google', { callbackUrl: '/?loginSuccess=true' });
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-10 bg-base-100">
      <div className="card w-full max-w-lg shadow-2xl bg-base-200">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="card-title text-3xl justify-center text-red-600 my-6">
            Join Blood Hub
          </h2>
          <div className="card bg-base-100 shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset ">
                <label className="label">Name</label>
                <input
                  {...register('name')}
                  type="text"
                  className="input w-full"
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-400">{errors.name.message}</p>
                )}
                <label className="label">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-400">{errors.email.message}</p>
                )}
                <label className="label">Password</label>
                <input
                  {...register('password')}
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-400">{errors.password.message}</p>
                )}

                <label className="label">Photo </label>
                <input
                  {...register('photo')}
                  className="file-input w-full"
                  name="photo"
                  type="file"
                  accept="image/*"
                />
                {errors.photo && (
                  <p className="text-red-400">{errors.photo.message}</p>
                )}
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <div className="form-control mt-6 flex flex-col md:flex-row gap-3">
                  <button
                    type="submit"
                    className="btn bg-red-600 text-white btn-lg"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      'Register Now'
                    )}
                  </button>
                  <button
                    onClick={handleGoogle}
                    className="btn btn-lg bg-white text-black border-[#e5e5e5]"
                  >
                    <svg
                      aria-label="Google logo"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Login with Google
                  </button>
                </div>

                <div className="text-center mt-4">
                  Already have an account?{' '}
                  <Link href="/login" className="link link-primary">
                    Login here
                  </Link>
                </div>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
