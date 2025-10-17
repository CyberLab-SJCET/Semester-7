'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/app/utils/auth';

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      async function verify() {
        const isAuthed = await checkAuth();
        if (!isAuthed) {
          router.push('/login');
        }
      }
      verify();
    }, [router]);

    return <Component {...props} />;
  };
}