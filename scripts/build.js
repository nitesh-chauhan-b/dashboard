#!/usr/bin/env node

// Build script for ADmyBRAND Insights
const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Building ADmyBRAND Insights...');

// Clean previous build
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  console.log('🧹 Cleaning previous build...');
  fs.rmSync(distPath, { recursive: true, force: true });
}

console.log('✅ Build directory cleaned');

// Build the project
console.log('🔄 Building frontend and backend...');

try {
  // Build frontend with Vite
  console.log('📦 Building frontend...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Build backend with esbuild
  console.log('📦 Building backend...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  
  // Verify build outputs
  const clientDistPath = path.join(process.cwd(), 'dist', 'client');
  const serverDistPath = path.join(process.cwd(), 'dist', 'index.js');
  
  if (fs.existsSync(clientDistPath)) {
    console.log('✅ Frontend build found');
  } else {
    console.log('⚠️  Frontend build not found at expected location');
  }
  
  if (fs.existsSync(serverDistPath)) {
    console.log('✅ Backend build found');
  } else {
    console.log('⚠️  Backend build not found at expected location');
  }
  
  console.log('\n🎉 Build process complete!');
  console.log('To start the production server, run: npm start');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  // Provide helpful troubleshooting
  if (error.message.includes('vite') || error.message.includes('not found')) {
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure all dependencies are installed: npm install');
    console.log('2. Check if Vite is properly configured');
    console.log('3. Ensure all source files are present');
  }
  
  process.exit(1);
}