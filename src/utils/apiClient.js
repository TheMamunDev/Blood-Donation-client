import { getSession } from 'next-auth/react';

export async function apiClient(url, options = {}) {
  const session = await getSession();
  const token = session?.user?.accessToken;

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
      ...(options.headers || {}),
    },
  });
  return response;
}
