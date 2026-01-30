'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useUser } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();
  const { isUserLoading } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/chat');
    } catch (err: any) {
      let message = "An unknown error occurred during sign-in.";
       if (err.code) {
        switch (err.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            message = 'Invalid email or password.';
            break;
          case 'auth/user-disabled':
            message = 'This account has been disabled.';
            break;
          case 'auth/too-many-requests':
             message = 'Access to this account has been temporarily disabled due to many failed login attempts. You can try again later.';
             break;
          default:
            message = `Could not sign you in. Please try again later. (Error: ${err.code})`;
            break;
        }
      }
      setError(message);
    }
  };

  if (isUserLoading) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm relative">
        <Button asChild variant="ghost" size="icon" className="absolute left-2 top-2 h-9 w-9 text-muted-foreground hover:text-foreground">
            <Link href="/">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to Home</span>
            </Link>
        </Button>
        <CardHeader className="text-center pt-12">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
