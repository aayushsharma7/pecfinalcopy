import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        // Fetch top 10 users by games won (or score if we had a global score)
        // For now, let's sort by gamesWon
        const leaderboard = await prisma.user.findMany({
            take: 10,
            orderBy: {
                gamesWon: "desc",
            },
            select: {
                id: true,
                username: true,
                avatar: true,
                gamesWon: true,
                gamesPlayed: true,
            },
        });

        return NextResponse.json({ leaderboard });
    } catch (error) {
        console.error("Leaderboard error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
