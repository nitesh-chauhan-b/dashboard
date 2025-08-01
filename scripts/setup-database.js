#!/usr/bin/env node

// Database setup script for ADmyBRAND Insights
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up ADmyBRAND Insights database...');

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.log('Please set your DATABASE_URL in the Replit secrets or environment variables.');
  console.log('Example: postgresql://user:password@host:port/database');
  process.exit(1);
}

console.log('✅ DATABASE_URL found');

// Check if drizzle config exists
const drizzleConfigPath = path.join(process.cwd(), 'drizzle.config.ts');
if (!fs.existsSync(drizzleConfigPath)) {
  console.error('❌ drizzle.config.ts not found!');
  process.exit(1);
}

console.log('✅ Drizzle configuration found');

// Run database migrations
console.log('🔄 Pushing database schema...');

exec('npm run db:push', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Error details:', stderr);
    
    // Provide helpful error messages
    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Connection troubleshooting:');
      console.log('1. Check if your DATABASE_URL is correct');
      console.log('2. Ensure the database server is running');
      console.log('3. Verify network connectivity to the database');
    }
    
    if (error.message.includes('permission denied') || error.message.includes('authentication failed')) {
      console.log('\n💡 Authentication troubleshooting:');
      console.log('1. Verify your database username and password');
      console.log('2. Check if the user has proper permissions');
    }
    
    process.exit(1);
  }
  
  console.log('✅ Database schema updated successfully!');
  console.log(stdout);
  
  if (stderr) {
    console.log('⚠️  Warnings:', stderr);
  }
  
  console.log('\n🎉 Database setup complete!');
  console.log('You can now start the application with: npm run dev');
});