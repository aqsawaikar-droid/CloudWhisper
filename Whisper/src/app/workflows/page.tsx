'use client';

import { AppHeader } from '@/components/app-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser, useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { Workflow } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function WorkflowsContent() {
  const { user } = useUser();
  const firestore = useFirestore();

  const workflowsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'workflows'),
      orderBy('name')
    );
  }, [user, firestore]);

  const { data: workflows, isLoading } = useCollection<Workflow>(workflowsQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Workflows</CardTitle>
        <CardDescription>
          Review workflows suggested by CloudWhisper.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading workflows...</p>}
        {!isLoading && workflows && workflows.length === 0 && (
          <p className="text-center text-muted-foreground">
            You have no saved workflows.
          </p>
        )}
        <Accordion type="single" collapsible className="w-full">
          {workflows?.map((flow) => (
            <AccordionItem value={flow.id} key={flow.id}>
              <AccordionTrigger>{flow.name}</AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm dark:prose-invert max-w-none space-y-2">
                  <p className="text-muted-foreground">{flow.description}</p>
                  <h4 className="font-semibold">Steps:</h4>
                  <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 font-code text-sm">
                    <code>{flow.steps}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function WorkflowsPage() {
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
        <WorkflowsContent />
      </main>
    </div>
  );
}
