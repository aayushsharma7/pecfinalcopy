import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(req: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { avatar, bio } = await req.json();

        const updatedUser = await prisma.user.update({
            where: { id: session.userId },
            data: {
                avatar,
                bio,
            },
            select: {
                id: true,
                username: true,
                avatar: true,
                bio: true,
            },
        });

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
