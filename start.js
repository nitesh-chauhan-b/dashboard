#!/usr/bin/env node

// Cross-platform startup script for ADmyBRAND Insights
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Set environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Determine the correct command based on platform and environment
let command, args;

if (process.env.NODE_ENV === 'development') {
  // Development mode
  command = 'npx';
  args = ['tsx', 'server/index.ts'];
} else {
  // Production mode
  command = 'node';
  args = ['dist/index.js'];
}

// Handle Windows-specific issues
if (os.platform() === 'win32') {
  if (command === 'npx') {
    command = 'npx.cmd';
  }
}

// Set additional environment variables for compatibility
process.env.BIND_ALL_INTERFACES = 'true';

console.log(`Starting ADmyBRAND Insights in ${process.env.NODE_ENV} mode...`);
console.log(`Platform: ${os.platform()}`);
console.log(`Command: ${command} ${args.join(' ')}`);

// Spawn the process
const child = spawn(command, args, {
  stdio: 'inherit',
  env: process.env,
  cwd: process.cwd(),
  shell: os.platform() === 'win32'
});

// Handle process events
child.on('error', (error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`Server exited with code ${code} and signal ${signal}`);
    process.exit(code || 1);
  }
});

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  child.kill('SIGTERM');
});