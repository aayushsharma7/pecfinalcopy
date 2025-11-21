# Turso Database Setup for Vercel Deployment

## Step 1: Create a Turso Database

1. Install Turso CLI (if not already installed):
   ```bash
   # Windows (using PowerShell)
   powershell -c "irm get.tur.so/install.ps1 | iex"
   
   # Or use npm
   npm install -g @libsql/client
   ```

2. Sign up and create a database:
   ```bash
   turso auth signup
   turso db create vizeria-db
   ```

3. Get your database URL:
   ```bash
   turso db show vizeria-db --url
   ```

4. Create an auth token:
   ```bash
   turso db tokens create vizeria-db
   ```

## Step 2: Update Local Environment Variables

Create/update your `.env` file with:
```env
DATABASE_URL="libsql://[YOUR-DB-NAME]-[YOUR-USERNAME].turso.io"
DATABASE_AUTH_TOKEN="your-auth-token-here"
```

## Step 3: Run Migrations

```bash
npx prisma generate
npx prisma db push
```

## Step 4: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add these variables:
   - `DATABASE_URL`: Your Turso database URL (from step 1.3)
   - `DATABASE_AUTH_TOKEN`: Your auth token (from step 1.4)

## Step 5: Redeploy

```bash
git add .
git commit -m "Configure Turso database"
git push
```

Vercel will automatically redeploy with the new database configuration.

## Testing Locally

After setting up the environment variables, run:
```bash
npm run dev
```

Try signing up and logging in to verify the database connection works!
