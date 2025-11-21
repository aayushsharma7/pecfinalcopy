import { NextResponse } from "next/server";

export async function GET() {
    // This route is just to ensure the server is hit and socket is initialized if we were using a custom server middleware approach
    // But since we are using a custom server entry point (server.ts), the socket is already running on the same port.
    // We just need to return success.
    return NextResponse.json({ success: true });
}
