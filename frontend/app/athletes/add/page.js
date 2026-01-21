'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddAthletePage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            await api.post('/athletes', data);
            router.push('/athletes');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to create athlete');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Athlete</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                {...register('name', { required: 'Name is required' })}
                                placeholder="John Doe"
                            />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date of Birth</label>
                            <Input
                                type="date"
                                {...register('dob', { required: 'DOB is required' })}
                            />
                            {errors.dob && <span className="text-red-500 text-xs">{errors.dob.message}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Height (cm)</label>
                                <Input
                                    type="number"
                                    {...register('height', { required: 'Height is required', min: 1 })}
                                    placeholder="180"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Weight (kg)</label>
                                <Input
                                    type="number"
                                    {...register('weight', { required: 'Weight is required', min: 1 })}
                                    placeholder="75"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Saving...' : 'Create Athlete'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
