from neo4j import GraphDatabase
from app.config import settings
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class KnowledgeGraphService:
    def __init__(self):
        self.driver = GraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
        )
    
    def close(self):
        self.driver.close()
    
    def init_schema(self):
        """Initialize the knowledge graph schema"""
        with self.driver.session() as session:
            # Create constraints for uniqueness
            session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (p:Publication) REQUIRE p.id IS UNIQUE")
            session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (c:Concept) REQUIRE c.name IS UNIQUE")
            session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (o:Organism) REQUIRE o.name IS UNIQUE")
            session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (e:Environment) REQUIRE e.name IS UNIQUE")
            
            logger.info("Knowledge graph schema initialized")
    
    def create_publication_node(self, publication: Dict):
        """Create a publication node in the graph"""
        with self.driver.session() as session:
            query = """
            MERGE (p:Publication {id: $id})
            SET p.title = $title,
                p.abstract = $abstract,
                p.authors = $authors,
                p.publication_date = $publication_date,
                p.journal = $journal,
                p.doi = $doi,
                p.source = $source
            """
            session.run(query, **publication)
    
    def create_concept_relationship(self, publication_id: str, concept: str, relationship_type: str = "DISCUSSES"):
        """Create relationship between publication and concept"""
        with self.driver.session() as session:
            query = f"""
            MATCH (p:Publication {{id: $publication_id}})
            MERGE (c:Concept {{name: $concept}})
            MERGE (p)-[r:{relationship_type}]->(c)
            SET r.strength = 1.0
            """
            session.run(query, publication_id=publication_id, concept=concept)
    
    def get_connected_concepts(self, concept_name: str, depth: int = 2) -> List[Dict]:
        """Get concepts connected to a given concept"""
        with self.driver.session() as session:
            query = """
            MATCH path = (start:Concept {name: $concept_name})-[*1..$depth]-(connected:Concept)
            UNWIND nodes(path) as node
            UNWIND relationships(path) as rel
            RETURN COLLECT(DISTINCT {
                id: id(node),
                name: node.name,
                type: labels(node)[0]
            }) as nodes,
            COLLECT(DISTINCT {
                source: id(startNode(rel)),
                target: id(endNode(rel)),
                type: type(rel)
            }) as relationships
            """
            result = session.run(query, concept_name=concept_name, depth=depth)
            return result.single()
    
    def get_graph_stats(self) -> Dict:
        """Get knowledge graph statistics"""
        with self.driver.session() as session:
            # Node counts by type
            node_query = """
            CALL apoc.meta.stats()
            YIELD labels
            RETURN labels
            """
            result = session.run(node_query)
            stats = result.single()
            
            return {
                "node_counts": stats["labels"] if stats else {},
                "total_relationships": self._count_relationships()
            }
    
    def _count_relationships(self) -> int:
        with self.driver.session() as session:
            result = session.run("MATCH ()-[r]->() RETURN COUNT(r) as count")
            return result.single()["count"]

# Singleton instance
kg_service = KnowledgeGraphService()