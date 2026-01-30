'use client';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


function SettingsContent() {
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your application settings.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p>This is the Settings page. More options will be added here soon.</p>
        <Button variant="outline" onClick={handleSignOut}>Log Out</Button>
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
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
        <SettingsContent />
      </main>
    </div>
  );
}
