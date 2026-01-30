'use client';

import { AppHeader } from '@/components/app-header';
import { Dashboard } from '@/components/dashboard';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <main className="flex-1 overflow-hidden">
        <Dashboard />
      </main>
    </div>
  );
}
