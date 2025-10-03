import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "NASA Bio-Synapse Engine"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    NEO4J_URI: str = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USER: str = os.getenv("NEO4J_USER", "neo4j")
    NEO4J_PASSWORD: str = os.getenv("NEO4J_PASSWORD", "password")
    
    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    # NASA APIs
    NASA_PUBSPACE_API: str = "https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pubspace/"
    NASA_GENELAB_API: str = "https://genelab.nasa.gov/api/"

settings = Settings()