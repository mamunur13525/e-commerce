import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { saveRedirectPath } from '../utils/redirectHelper';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session?.user) {
      saveRedirectPath(router.asPath);
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session?.user) {
    return null;
  }

  return children;
}
