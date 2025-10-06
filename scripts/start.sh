#!/bin/bash

echo "🚀 Starting Kanika Batra Website Development Server..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "🔐 Creating .env.local from .env.example..."
    cp ".env.example" ".env.local"
    echo "⚠️  Remember to update JWT secrets in .env.local for production!"
fi

# Clear the terminal and start the development server
clear
echo
echo "🎯 Kanika Batra Website - Development Environment"
echo "================================================"
echo
echo "🌐 Starting Next.js development server..."
echo "🔥 Hot reload enabled"
echo "🔐 Authentication system ready"
echo
echo "URLs:"
echo "- Main site: http://localhost:3000"
echo "- Register: http://localhost:3000/register"
echo "- Login: http://localhost:3000/login"
echo "- Dashboard: http://localhost:3000/dashboard"
echo
echo "Press Ctrl+C to stop the server"
echo

npm run dev