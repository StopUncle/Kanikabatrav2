@echo off
echo 🚀 Starting Kanika Batra Website Development Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ package.json not found. Make sure you're in the project root directory.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo 🔐 Creating .env.local from .env.example...
    copy ".env.example" ".env.local" >nul
    echo ⚠️  Remember to update JWT secrets in .env.local for production!
)

REM Clear the terminal and start the development server
cls
echo.
echo 🎯 Kanika Batra Website - Development Environment
echo ================================================
echo.
echo 🌐 Starting Next.js development server...
echo 🔥 Hot reload enabled
echo 🔐 Authentication system ready
echo.
echo URLs:
echo - Main site: http://localhost:3000
echo - Register: http://localhost:3000/register
echo - Login: http://localhost:3000/login
echo - Dashboard: http://localhost:3000/dashboard
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev