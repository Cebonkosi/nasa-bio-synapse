# NASA Bio-Synapse Engine

> Predictive Health & Habitat Advisor for Deep Space Missions

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ 
- Python 3.11+

### Development
```bash or cmd
# Clone and setup
git clone https://github.com/your-username/nasa-bio-synapse.git
cd nasa-bio-synapse

# Start with Docker (recommended)
docker-compose up -d

# Or run manually
# Backend
cd backend && pip install -r requirements.txt
python -m app.main

# Frontend  
cd frontend && npm install
npm run dev

##Access points
Frontend: http://localhost:3000
Backend API: http://localhost:8000
Neo4j Browser: http://localhost:7474
API Docs: http://localhost:8000/docs