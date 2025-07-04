#!/bin/bash

# Build script for Vercel deployment
echo "Building Carbon Emission Calculator..."

# Install dependencies
npm install

# Build the client
echo "Building client..."
npm run build

# Create necessary directories
mkdir -p dist/client

# Copy built files
cp -r client/dist/* dist/client/

echo "Build complete!"