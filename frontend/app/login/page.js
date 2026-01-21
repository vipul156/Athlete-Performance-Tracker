'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function LoginPage() {

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', data);
            localStorage.setItem('user', JSON.stringify(res.data));
            // Force reload to update navbar state (simple approach) or just verify redirection works
            window.location.href = '/';
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center pt-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                placeholder="coach@example.com"
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        <div className="text-center text-sm">
                            Don't have an account? <Link href="/register" className="text-primary hover:underline">Register</Link>
                        </div>

                        <div className="mt-4 p-4 text-sm bg-muted rounded-md text-left space-y-2">
                            <p className="font-semibold text-muted-foreground">Demo Credentials:</p>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between">
                                    <span>Coach:</span>
                                    <span className="font-mono text-xs">coach@example.com / password123</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Viewer:</span>
                                    <span className="font-mono text-xs">viewer@example.com / password123</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
