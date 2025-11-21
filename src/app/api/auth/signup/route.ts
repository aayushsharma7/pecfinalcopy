import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, generateToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        const token = generateToken({ userId: user.id, username: user.username });

        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return NextResponse.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
