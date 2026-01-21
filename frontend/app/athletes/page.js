'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Plus } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function AthletesPage() {
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter(); // Import useRouter

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(storedUser);

        const fetchAthletes = async () => {
            try {
                const { data } = await api.get('/athletes');
                setAthletes(data);
            } catch (error) {
                console.error("Failed to fetch athletes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAthletes();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Athletes</h1>
                {user && user.role === 'coach' && (
                    <Button asChild>
                        <Link href="/athletes/add">
                            <Plus className="mr-2 h-4 w-4" /> Add Athlete
                        </Link>
                    </Button>
                )}
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>DOB</TableHead>
                            <TableHead>Height (cm)</TableHead>
                            <TableHead>Weight (kg)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : athletes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No athletes found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            athletes.map((athlete) => (
                                <TableRow key={athlete._id}>
                                    <TableCell className="font-medium">{athlete.name}</TableCell>
                                    <TableCell>{new Date(athlete.dob).toLocaleDateString()}</TableCell>
                                    <TableCell>{athlete.height}</TableCell>
                                    <TableCell>{athlete.weight}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
