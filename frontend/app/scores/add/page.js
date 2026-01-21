'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddScorePage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [athletes, setAthletes] = useState([]);
    const [tests, setTests] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const [athRes, testRes] = await Promise.all([
                    api.get('/athletes'),
                    api.get('/tests')
                ]);
                setAthletes(athRes.data);
                setTests(testRes.data);
            } catch (err) {
                console.error(err);
                // If API fails (e.g. 401), allow the interceptor or logic to handle it, but here we just log
            }
        }
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            await api.post('/scores', data);
            router.push('/leaderboard');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to submit score');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Record Test Result</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Athlete</label>
                            <select
                                {...register('athlete_id', { required: 'Athlete is required' })}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select Athlete</option>
                                {athletes.map(a => (
                                    <option key={a._id} value={a._id}>{a.name}</option>
                                ))}
                            </select>
                            {errors.athlete_id && <span className="text-red-500 text-xs">{errors.athlete_id.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Test</label>
                            <select
                                {...register('test_id', { required: 'Test is required' })}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select Test</option>
                                {tests.map(t => (
                                    <option key={t._id} value={t._id}>{t.name} ({t.unit})</option>
                                ))}
                            </select>
                            {errors.test_id && <span className="text-red-500 text-xs">{errors.test_id.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Score Value</label>
                            <Input
                                type="number"
                                step="0.01"
                                {...register('value', { required: 'Score is required' })}
                                placeholder="Result"
                            />
                            {errors.value && <span className="text-red-500 text-xs">{errors.value.message}</span>}
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Score'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
