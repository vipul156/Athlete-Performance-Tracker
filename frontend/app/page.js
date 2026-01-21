import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Athlete Performance Tracker. Manage athletes and view performance metrics.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage athletes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Athletes</div>
            <p className="text-xs text-muted-foreground">View and manage profiles</p>
            <Button asChild className="mt-4 w-full" variant="outline">
              <Link href="/athletes">View All</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rankings</div>
            <p className="text-xs text-muted-foreground">See top performers</p>
            <Button asChild className="mt-4 w-full" variant="outline">
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Record Performance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">New Score</div>
            <p className="text-xs text-muted-foreground">Log athlete test results</p>
            <Button asChild className="mt-4 w-full" variant="outline">
              <Link href="/scores/add">Record Score</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
