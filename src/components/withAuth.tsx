// components/withAuth.tsx
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../utils/auth';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = getToken();
      if (!token) {
        router.replace('/signin');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
