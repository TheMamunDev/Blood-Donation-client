'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

export default function ToastListner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'loading') {
      const loginSuccess = searchParams.get('loginSuccess');
      if (loginSuccess === 'true') {
        toast.success(`Login Successful! Welcome ${session?.user?.name}`);
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete('loginSuccess');
        router.replace(`/?${newSearchParams.toString()}`, { scroll: false });
      }
    }
  }, [searchParams, router, status]);

  return null;
}
