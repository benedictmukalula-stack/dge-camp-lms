#!/bin/bash

# Knowledge Camp Global - Quick Start Script

echo "🎓 Knowledge Camp Global - Starting Application"
echo "================================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file. Please edit it with your configuration."
        echo ""
    else
        echo "❌ .env.example not found!"
        exit 1
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
echo ""

# Start the application
echo "🚀 Starting development server..."
echo ""
echo "The application will be available at:"
echo "  - Local:   http://localhost:3000"
echo "  - Network: http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "Health check: http://localhost:3000/api/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
