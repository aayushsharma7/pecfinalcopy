# Arabian Nights Quiz App

A magical Next.js quiz game themed around Arabian Nights. Features include:
- **Rich UI** with gold gradient text, glass‑morphism navigation, and animated lanterns.
- **SQLite** database powered by Prisma for persistent scores.
- **Responsive design** with dark mode and custom fonts (Amiri, Cinzel, etc.).
- **Leaderboard** with global and chapter tabs, animated entries, and a stylish back button.
- **Deployable on Render** using a simple `npm start` script.

## Getting Started
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run locally (development)
npm run dev
```

## Build & Deploy (Render)
```bash
# Build for production
npm run build

# Start the server (Render will run this)
npm start
```

The Render service should have the environment variable:
```
DATABASE_URL=file:./prod.db
```
and a persistent disk mounted at `/var/data` for the SQLite file.

## Styling
- **Gold text**: `.gold-text` class with a three‑tone gradient and glow.
- **Glass navigation**: `.glass-nav` with blur and gold border.
- **Custom fonts** loaded via Google Fonts and `next/font`.
- **Animations**: floating lanterns, star twinkle, and slide‑in leaderboard rows.

## Scripts
- `dev` – runs the development server with hot‑reloading.
- `build` – generates Prisma client, builds the Next.js app.
- `postbuild` – pushes Prisma schema (`npx prisma db push`).
- `start` – runs the compiled server using `tsx`.

## License
MIT © 2025 Your Name
