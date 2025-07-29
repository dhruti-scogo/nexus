# Nexus Application

A Next.js application with Supabase integration for analytics and user management.

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker (optional)

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your Supabase credentials

# Run development server
npm run dev
```

### Docker Deployment

For Docker instructions and deployment, see [DOCKER.md](./DOCKER.md)

Quick Docker commands:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run the application
docker-compose up

# Stop the application
docker-compose down
```

## Features

- Next.js 15 with App Router
- Supabase authentication and database
- Analytics dashboard
- User management
- Responsive UI with Tailwind CSS

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
