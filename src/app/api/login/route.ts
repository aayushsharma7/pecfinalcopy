import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
        }

        let user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            // Create new user if doesn't exist
            user = await prisma.user.create({
                data: {
                    username,
                    password
                },
            });
        } else {
            // Verify password for existing users
            if (user.password !== password) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
