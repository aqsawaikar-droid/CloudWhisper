'use client';

import { AppHeader } from '@/components/app-header';
import { Dashboard } from '@/components/dashboard';
import { useUser } from '@/firebase';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatHistoryPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const params = useParams();
  const conversationId = params.id as string;

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
        <Dashboard conversationId={conversationId} />
      </main>
    </div>
  );
}
