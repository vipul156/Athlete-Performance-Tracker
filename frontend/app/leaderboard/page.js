'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [leaderboardRes, testsRes] = await Promise.all([
                    api.get('/scores/leaderboard'),
                    api.get('/tests')
                ]);
                setLeaderboard(leaderboardRes.data);
                setTests(testsRes.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
                <p className="text-muted-foreground">Rankings based on normalized performance scores.</p>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Rank</TableHead>
                            <TableHead>Athlete</TableHead>
                            <TableHead>Total Points</TableHead>
                            <TableHead>Badges</TableHead>
                            {tests.map(test => (
                                <TableHead key={test._id}>{test.name}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={tests.length + 4} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : leaderboard.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={tests.length + 4} className="h-24 text-center">
                                    No data available.
                                </TableCell>
                            </TableRow>
                        ) : (
                            leaderboard.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-bold text-center">#{index + 1}</TableCell>
                                    <TableCell className="font-medium text-base">{entry.athlete.name}</TableCell>
                                    <TableCell className="font-bold text-lg">{entry.totalPoints}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {entry.badges && entry.badges.map((badge, i) => {
                                                const badgeStyles = {
                                                    'Elite': 'bg-yellow-500 hover:bg-yellow-600',
                                                    'Pro': 'bg-slate-500 hover:bg-slate-600',
                                                    'Rookie': 'bg-orange-500 hover:bg-orange-600',
                                                    'Iron Athlete': 'bg-red-600 hover:bg-red-700'
                                                };
                                                return (
                                                    <Badge key={i} className={`whitespace-nowrap ${badgeStyles[badge.label] || 'bg-primary'}`}>
                                                        {badge.label}
                                                    </Badge>
                                                );
                                            })}
                                        </div>
                                    </TableCell>
                                    {tests.map(test => (
                                        <TableCell key={test._id}>
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {entry.scores[test._id] !== undefined ? entry.scores[test._id] : '-'} <span className="text-xs text-muted-foreground">{entry.scores[test._id] ? test.unit : ''}</span>
                                                </span>
                                                {entry.points[test._id] !== undefined && (
                                                    <span className="text-xs text-muted-foreground">({Math.round(entry.points[test._id])} pts)</span>
                                                )}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
