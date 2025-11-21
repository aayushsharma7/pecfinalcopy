import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { username, score, level } = await request.json();

        if (!username || score === undefined || !level) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newScore = await prisma.score.create({
            data: {
                score,
                level,
                userId: user.id,
            },
        });

        return NextResponse.json(newScore);
    } catch (error) {
        console.error("Score submission error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
