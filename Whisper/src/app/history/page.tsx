'use client';

import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser, useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { Conversation } from '@/lib/types';

function HistoryContent() {
  const { user } = useUser();
  const firestore = useFirestore();

  const conversationsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'conversations'),
      orderBy('startTime', 'desc')
    );
  }, [user, firestore]);

  const { data: conversations, isLoading } =
    useCollection<Conversation>(conversationsQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation History</CardTitle>
        <CardDescription>
          Review your past conversations with CloudWhisper.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading history...</p>}
        {!isLoading && conversations && conversations.length === 0 && (
          <div className="text-center text-muted-foreground">
            <p>You have no conversation history yet.</p>
            <Button asChild variant="link">
              <Link href="/chat">Start a new conversation</Link>
            </Button>
          </div>
        )}
        <div className="space-y-4">
          {conversations?.map((convo) => (
            <Link href={`/chat/${convo.id}`} key={convo.id} className="block rounded-lg border p-4 hover:bg-muted">
                <h3 className="font-semibold">{convo.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(convo.startTime).toLocaleString()}
                </p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function HistoryPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="container mx-auto max-w-4xl flex-1 p-4 md:p-6 lg:p-8">
        <HistoryContent />
      </main>
    </div>
  );
}
