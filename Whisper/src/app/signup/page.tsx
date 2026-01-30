'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useUser } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const auth = useAuth();
    const router = useRouter();
    const { user, isUserLoading } = useUser();

    useEffect(() => {
        if (!isUserLoading && user) {
        router.push('/');
        }
    }, [user, isUserLoading, router]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // The useEffect hook will handle the redirect on successful login
        } catch (err: any) {
            let message = "An unknown error occurred during signup.";
            if (err.code) {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        message = 'This email address is already in use by another account.';
                        break;
                    case 'auth/invalid-email':
                        message = 'Please enter a valid email address.';
                        break;
                    case 'auth/weak-password':
                        message = 'The password is too weak. It must be at least 6 characters long.';
                        break;
                    default:
                        message = `Could not create account. Please try again later. (Error: ${err.code})`;
                        break;
                }
            }
            setError(message);
        }
    };
    
    if (isUserLoading || user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="flex min-h-svh items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <form onSubmit={handleSignup} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} minLength={6}/>
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full">Create an account</Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
        </div>
    );
}
