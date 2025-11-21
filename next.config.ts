import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js: "These packages are for the server only. Don't touch them."
  serverExternalPackages: ["@libsql/client", "libsql", "@prisma/adapter-libsql"],
};

export default nextConfig;