// Render deployment start script
const express = require('express');
const path = require('path');
const { fileURLToPath } = require('url');

// Import the server setup
import('./server/index.js').then(() => {
  console.log('Server started successfully');
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});