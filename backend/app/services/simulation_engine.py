from typing import Dict, List, Any
import numpy as np
from app.services.knowledge_graph import kg_service
import logging

logger = logging.getLogger(__name__)

class MissionSimulator:
    def __init__(self):
        self.risk_factors = {
            'microgravity': {
                'bone_density': 0.8,
                'muscle_mass': 0.7,
                'cardiovascular': 0.6,
                'immune_function': 0.4
            },
            'radiation': {
                'cancer_risk': 0.9,
                'cataracts': 0.7,
                'cognitive_decline': 0.5
            },
            'isolation': {
                'psychological_stress': 0.8,
                'sleep_quality': 0.6,
                'team_cohesion': 0.5
            }
        }
    
    def simulate_mission(self, mission_params: Dict) -> Dict:
        """Simulate mission impacts based on parameters"""
        try:
            duration_days = mission_params.get('duration_days', 365)
            destination = mission_params.get('destination', 'mars')
            crew_age = mission_params.get('crew_age', 35)
            artificial_gravity = mission_params.get('artificial_gravity', False)
            radiation_shielding = mission_params.get('radiation_shielding', 'standard')
            
            # Calculate risk scores
            risks = self._calculate_risks(
                duration_days, destination, artificial_gravity, radiation_shielding
            )
            
            # Get relevant research from knowledge graph
            relevant_studies = self._get_relevant_studies(risks)
            
            # Generate countermeasures
            countermeasures = self._suggest_countermeasures(risks)
            
            return {
                'mission_summary': {
                    'destination': destination,
                    'duration_days': duration_days,
                    'total_risk_score': sum(risks.values()) / len(risks)
                },
                'risk_assessment': risks,
                'relevant_studies': relevant_studies,
                'recommended_countermeasures': countermeasures,
                'confidence_level': 'medium'  # Based on available data
            }
            
        except Exception as e:
            logger.error(f"Simulation error: {e}")
            return {'error': str(e)}
    
    def _calculate_risks(self, duration: int, destination: str, artificial_gravity: bool, shielding: str) -> Dict:
        """Calculate risk scores for different biological systems"""
        base_risks = {
            'bone_health': 0.0,
            'muscle_health': 0.0,
            'cardiovascular_health': 0.0,
            'radiation_exposure': 0.0,
            'psychological_health': 0.0,
            'immune_function': 0.0
        }
        
        # Duration multiplier
        duration_factor = min(duration / 365, 2.0)  # Cap at 2x
        
        # Destination factors
        destination_factors = {
            'moon': {'gravity': 0.16, 'radiation': 0.4},
            'mars': {'gravity': 0.38, 'radiation': 0.7},
            'deep_space': {'gravity': 0.0, 'radiation': 1.0}
        }
        
        dest = destination_factors.get(destination, destination_factors['mars'])
        
        # Calculate risks
        if not artificial_gravity:
            base_risks['bone_health'] = 0.8 * dest['gravity'] * duration_factor
            base_risks['muscle_health'] = 0.7 * dest['gravity'] * duration_factor
        
        base_risks['cardiovascular_health'] = 0.6 * (1 - dest['gravity']) * duration_factor
        base_risks['radiation_exposure'] = dest['radiation'] * duration_factor
        base_risks['psychological_health'] = 0.5 * duration_factor
        base_risks['immune_function'] = 0.4 * duration_factor
        
        # Apply shielding reduction
        if shielding == 'enhanced':
            base_risks['radiation_exposure'] *= 0.5
        
        return {k: min(v, 0.95) for k, v in base_risks.items()}  # Cap at 95%
    
    def _get_relevant_studies(self, risks: Dict) -> List[Dict]:
        """Get relevant studies from knowledge graph based on highest risks"""
        high_risk_areas = [area for area, risk in risks.items() if risk > 0.5]
        relevant_studies = []
        
        for risk_area in high_risk_areas[:2]:  # Top 2 risk areas
            # Map risk areas to concepts
            concept_map = {
                'bone_health': 'bone loss',
                'muscle_health': 'muscle atrophy',
                'radiation_exposure': 'radiation',
                'cardiovascular_health': 'cardiovascular',
                'psychological_health': 'psychological stress'
            }
            
            concept = concept_map.get(risk_area, risk_area)
            studies = kg_service.get_connected_concepts(concept, depth=1)
            if studies:
                relevant_studies.append({
                    'risk_area': risk_area,
                    'concept': concept,
                    'studies_count': len(studies.get('nodes', []))
                })
        
        return relevant_studies
    
    def _suggest_countermeasures(self, risks: Dict) -> List[Dict]:
        """Suggest countermeasures based on risk profile"""
        countermeasures = []
        
        if risks.get('bone_health', 0) > 0.6:
            countermeasures.append({
                'type': 'exercise',
                'name': 'Advanced Resistive Exercise Device (ARED)',
                'frequency': 'Daily',
                'effectiveness': 0.7,
                'description': 'High-intensity resistance training to combat bone density loss'
            })
        
        if risks.get('radiation_exposure', 0) > 0.5:
            countermeasures.append({
                'type': 'pharmaceutical',
                'name': 'Radioprotective compounds',
                'frequency': 'As prescribed',
                'effectiveness': 0.6,
                'description': 'Drugs to protect against radiation damage'
            })
        
        if risks.get('psychological_health', 0) > 0.4:
            countermeasures.append({
                'type': 'psychological',
                'name': 'Virtual reality therapy',
                'frequency': 'Weekly',
                'effectiveness': 0.5,
                'description': 'VR environments for mental health maintenance'
            })
        
        return countermeasures

# Singleton instance
mission_simulator = MissionSimulator()