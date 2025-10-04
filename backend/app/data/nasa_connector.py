import aiohttp
import asyncio
from typing import List, Dict, Any
import json
import logging

logger = logging.getLogger(__name__)

class NASADataConnector:
    def __init__(self):
        self.base_urls = {
            'pubspace': 'https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pubspace/',
            'genelab': 'https://genelab.nasa.gov/api/',
            'lsda': 'https://lsda.jsc.nasa.gov/api/'
        }
    
    async def fetch_pubspace_publications(self, query: str = "space biology", max_results: int = 50) -> List[Dict]:
        """Fetch publications from NASA PubSpace"""
        try:
            params = {
                'format': 'json',
                'q': query,
                'size': max_results
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(self.base_urls['pubspace'], params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        return self._parse_pubspace_data(data)
                    else:
                        logger.error(f"PubSpace API error: {response.status}")
                        return []
        except Exception as e:
            logger.error(f"Error fetching PubSpace data: {e}")
            return []
    
    def _parse_pubspace_data(self, data: Dict) -> List[Dict]:
        """Parse PubSpace API response"""
        publications = []
        for item in data.get('results', []):
            publication = {
                'id': item.get('id'),
                'title': item.get('title', 'No title'),
                'abstract': item.get('abstract', ''),
                'authors': item.get('authors', []),
                'publication_date': item.get('publication_date'),
                'journal': item.get('journal'),
                'doi': item.get('doi'),
                'nasa_topics': item.get('topics', []),
                'source': 'pubspace'
            }
            publications.append(publication)
        return publications
    
    async def fetch_genelab_data(self, dataset_type: str = "transcriptomics") -> List[Dict]:
        """Fetch data from NASA GeneLab"""
        try:
            url = f"{self.base_urls['genelab']}search/{dataset_type}"
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as response:
                    if response.status == 200:
                        data = await response.json()
                        return self._parse_genelab_data(data, dataset_type)
                    else:
                        logger.error(f"GeneLab API error: {response.status}")
                        return []
        except Exception as e:
            logger.error(f"Error fetching GeneLab data: {e}")
            return []
    
    def _parse_genelab_data(self, data: Dict, dataset_type: str) -> List[Dict]:
        """Parse GeneLab API response"""
        datasets = []
        for item in data.get('data', []):
            dataset = {
                'id': item.get('accession'),
                'title': item.get('title', 'No title'),
                'organism': item.get('organism', 'Unknown'),
                'space_mission': item.get('mission', 'Unknown'),
                'experiment_type': dataset_type,
                'description': item.get('description', ''),
                'publication_date': item.get('release_date'),
                'source': 'genelab'
            }
            datasets.append(dataset)
        return datasets

# Singleton instance
nasa_connector = NASADataConnector()