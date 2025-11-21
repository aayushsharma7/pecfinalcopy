import "dotenv/config";
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server, Socket } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

interface Player {
    id: string;
    name: string;
    score: number;
    avatar?: string;
}

interface Room {
    id: string;
    hostId: string;
    players: Player[];
    status: "waiting" | "playing" | "finished";
    currentQuestionIndex: number;
    answers: Record<string, number>; // playerId -> answerIndex
}

app.prepare().then(() => {
    const httpServer = createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url!, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("internal server error");
        }
    });

    const io = new Server(httpServer);

    // Store rooms in memory
    const rooms: Record<string, Room> = {};

    io.on("connection", (socket: Socket) => {
        console.log("Client connected", socket.id);

        socket.on("create_room", ({ username, avatar }: { username: string; avatar?: string }) => {
            const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
            rooms[roomId] = {
                id: roomId,
                hostId: socket.id,
                players: [{ id: socket.id, name: username, score: 0, avatar }],
                status: "waiting",
                currentQuestionIndex: 0,
                answers: {},
            };
            socket.join(roomId);
            socket.emit("room_created", { roomId });
            io.to(roomId).emit("update_players", rooms[roomId].players);
        });

        socket.on("join_room", ({ roomId, username, avatar }: { roomId: string; username: string; avatar?: string }) => {
            if (rooms[roomId] && rooms[roomId].status === "waiting") {
                rooms[roomId].players.push({ id: socket.id, name: username, score: 0, avatar });
                socket.join(roomId);
                socket.emit("room_joined", { roomId });
                io.to(roomId).emit("update_players", rooms[roomId].players);
            } else {
                socket.emit("error", { message: "Room not found or game already started" });
            }
        });

        socket.on("start_game", ({ roomId }: { roomId: string }) => {
            if (rooms[roomId] && rooms[roomId].hostId === socket.id) {
                rooms[roomId].status = "playing";
                io.to(roomId).emit("game_started");
            }
        });

        socket.on("submit_answer", ({ roomId, answerIndex, timeTaken }: { roomId: string; answerIndex: number; timeTaken: number }) => {
            const room = rooms[roomId];
            if (room) {
                // Simple scoring logic: 100 points for correct answer (validated on client for now, ideally server)
                // For now, we just broadcast that a player answered.
                // In a real app, we'd validate against the question on the server.
                // We'll trust the client for this MVP or just track completion.

                // Let's assume the client sends the score update directly for simplicity in this MVP
                // Or better, we just wait for all to answer.

                room.answers[socket.id] = answerIndex;

                // Check if all players answered
                if (Object.keys(room.answers).length === room.players.length) {
                    // Move to next question or end game
                    // For now, let's just emit "player_answered" to update UI
                }
            }
        });

        socket.on("update_score", ({ roomId, score }: { roomId: string; score: number }) => {
            const room = rooms[roomId];
            if (room) {
                const player = room.players.find(p => p.id === socket.id);
                if (player) {
                    player.score = score;
                    io.to(roomId).emit("update_players", room.players);
                }
            }
        });

        socket.on("disconnect", () => {
            // Handle disconnection
            // Remove player from rooms, etc.
            console.log("Client disconnected", socket.id);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
