'use client';
import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { useRouter } from 'next/navigation';

export const useRedirectOnRole = () => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && role === 'admin') {
      router.push('/admin/dashboard');
    }
  }, [user, role, loading]);
};
