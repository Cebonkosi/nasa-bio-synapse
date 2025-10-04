from fastapi import APIRouter, HTTPException
from app.data.nasa_connector import nasa_connector
from app.services.knowledge_graph import kg_service
import asyncio

router = APIRouter(prefix="/data", tags=["data"])

@router.post("/ingest/pubspace")
async def ingest_pubspace_data(query: str = "space biology microgravity", max_results: int = 20):
    """Ingest data from NASA PubSpace"""
    try:
        publications = await nasa_connector.fetch_pubspace_publications(query, max_results)
        
        # Add to knowledge graph
        for pub in publications:
            kg_service.create_publication_node(pub)
            
            # Extract basic concepts from title (simplified - will be replaced with AI)
            concepts = extract_concepts_from_text(pub['title'] + " " + pub['abstract'])
            for concept in concepts:
                kg_service.create_concept_relationship(pub['id'], concept)
        
        return {
            "message": f"Successfully ingested {len(publications)} publications",
            "publications": len(publications)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Data ingestion failed: {str(e)}")

@router.get("/graph/stats")
async def get_graph_stats():
    """Get knowledge graph statistics"""
    try:
        stats = kg_service.get_graph_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get graph stats: {str(e)}")

@router.get("/graph/concepts/{concept_name}")
async def get_concept_connections(concept_name: str, depth: int = 2):
    """Get concepts connected to a given concept"""
    try:
        result = kg_service.get_connected_concepts(concept_name, depth)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get concept connections: {str(e)}")

def extract_concepts_from_text(text: str) -> List[str]:
    """Simple concept extraction - will be replaced with AI model"""
    # Basic keyword extraction (replace with proper NLP)
    keywords = ["microgravity", "radiation", "bone loss", "muscle atrophy", 
                "cardiovascular", "immune system", "cognitive", "sleep",
                "nutrition", "exercise", "mars", "moon", "iss"]
    
    found_concepts = []
    for keyword in keywords:
        if keyword.lower() in text.lower():
            found_concepts.append(keyword)
    
    return found_concepts[:5]  # Limit to top 5 concepts