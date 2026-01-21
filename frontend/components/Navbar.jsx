'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check for user in local storage on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <nav className="border-b bg-background">
            <div className="flex h-16 items-center px-4 container mx-auto justify-between">
                <div className="flex items-center">
                    <Link href="/" className="mr-8 flex items-center space-x-2 font-bold text-xl">
                        <span>🏅 Athlete Tracker</span>
                    </Link>
                    <div className="flex items-center space-x-4 lg:space-x-6">
                        <Link href="/athletes" className="text-sm font-medium transition-colors hover:text-primary">
                            Athletes
                        </Link>
                        <Link href="/leaderboard" className="text-sm font-medium transition-colors hover:text-primary">
                            Leaderboard
                        </Link>
                        {user && user.role === 'coach' && (
                            <Link href="/scores/add" className="text-sm font-medium transition-colors hover:text-primary">
                                Record Score
                            </Link>
                        )}
                    </div>

                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">Hi, {user.name}</span>
                            <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
