import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user || !user.password) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isValid = await comparePassword(password, user.password);

        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = generateToken({ userId: user.id, username: user.username });

        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return NextResponse.json({ user: { id: user.id, username: user.username, avatar: user.avatar } });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
