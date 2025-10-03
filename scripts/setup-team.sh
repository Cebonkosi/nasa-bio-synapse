#!/bin/bash

echo "🚀 Setting up NASA Bio-Synapse development environment..."

# Check prerequisites
command -v docker >/dev/null 2>&1 || { echo "Docker required but not installed. Aborting."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js required but not installed. Aborting."; exit 1; }

# Clone repo
git clone https://github.com/your-username/nasa-bio-synapse.git
cd nasa-bio-synapse

# Copy environment files
cp .env.example backend/.env
cp .env.example frontend/.env

echo "✅ Setup complete!"
echo "📝 Update .env files with your configuration"
echo "🎯 Run 'docker-compose up -d' to start development environment"