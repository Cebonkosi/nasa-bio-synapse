'use client'

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, Line } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Search, Play, Pause, ZoomIn, ZoomOut } from 'lucide-react'
import * as THREE from 'three'

// 3D Node Component
const Node3D: React.FC<{ 
  node: any; 
  isSelected: boolean;
  onClick: (node: any) => void;
  onHover: (node: any | null) => void;
}> = ({ node, isSelected, onClick, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = node.y + Math.sin(state.clock.elapsedTime + node.id) * 0.5
      
      // Rotation for selected nodes
      if (isSelected) {
        meshRef.current.rotation.y += 0.02
      }
    }
  })

  const getNodeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      concept: '#00F5FF',    // Cyan for concepts
      mission: '#0B3D91',    // Blue for missions
      study: '#FC3D21',      // Red for studies
      organism: '#FFD700',   // Gold for organisms
      default: '#888888'
    }
    return colors[type] || colors.default
  }

  const getNodeSize = (val: number): number => {
    return 1 + (val / 10) * 2
  }

  const handleClick = (e: any) => {
    e.stopPropagation()
    onClick(node)
  }

  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    onHover(node)
  }

  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    onHover(null)
  }

  return (
    <group position={[node.x || 0, node.y || 0, node.z || 0]}>
      <Sphere
        ref={meshRef}
        args={[getNodeSize(node.val)]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          color={getNodeColor(node.type)}
          emissive={getNodeColor(node.type)}
          emissiveIntensity={isSelected ? 0.8 : 0.3}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Node Label */}
      <Text
        position={[0, -getNodeSize(node.val) - 0.5, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        {node.name}
      </Text>

      {/* Selection Glow */}
      {isSelected && (
        <Sphere args={[getNodeSize(node.val) + 0.3]}>
          <meshBasicMaterial 
            color={getNodeColor(node.type)} 
            transparent 
            opacity={0.3}
            side={THREE.BackSide}
          />
        </Sphere>
      )}
    </group>
  )
}

// 3D Link Component
const Link3D: React.FC<{ 
  link: any; 
  nodes: any[];
}> = ({ link, nodes }) => {
  const source = typeof link.source === 'string' 
    ? nodes.find(n => n.id === link.source) 
    : link.source
  const target = typeof link.target === 'string' 
    ? nodes.find(n => n.id === link.target) 
    : link.target

  if (!source || !target) return null

  const start = new THREE.Vector3(source.x || 0, source.y || 0, source.z || 0)
  const end = new THREE.Vector3(target.x || 0, target.y || 0, target.z || 0)

  const getLinkColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      impacts: '#ff4444',
      hosts: '#4444ff',
      studies: '#00ff00',
      correlates: '#ffff00',
      default: '#888888'
    }
    return colors[type] || colors.default
  }

  return (
    <Line
      points={[start, end]}
      color={getLinkColor(link.type)}
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  )
}

// Starfield Background Component
const Starfield: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 2000
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.5} 
        color="#ffffff" 
        transparent 
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Force Graph Simulation (Simple version)
const useForceGraph = (nodes: any[], links: any[]) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })

  useEffect(() => {
    // Simple force simulation
    const simulatedNodes = nodes.map((node, i) => ({
      ...node,
      x: Math.cos((i / nodes.length) * Math.PI * 2) * 20,
      y: Math.sin((i / nodes.length) * Math.PI * 2) * 20,
      z: (Math.random() - 0.5) * 10,
      vx: 0,
      vy: 0,
      vz: 0
    }))

    setGraphData({
      nodes: simulatedNodes,
      links: links
    })
  }, [nodes, links])

  return graphData
}

const AdvancedKnowledgeGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [hoveredNode, setHoveredNode] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isPlaying, setIsPlaying] = useState(true)
  const [cameraDistance, setCameraDistance] = useState(50)

  // Sample NASA space biology data
  const sampleData = useMemo(() => ({
    nodes: [
      // Core Concepts
      { id: 'microgravity', name: 'Microgravity', type: 'concept', val: 12, description: 'Weightlessness effects on human physiology' },
      { id: 'radiation', name: 'Cosmic Radiation', type: 'concept', val: 10, description: 'Space radiation impacts on biology' },
      { id: 'bone-loss', name: 'Bone Density', type: 'concept', val: 9, description: 'Bone mass reduction in space' },
      { id: 'muscle-atrophy', name: 'Muscle Atrophy', type: 'concept', val: 8, description: 'Muscle deterioration in microgravity' },
      { id: 'vision-impairment', name: 'Vision', type: 'concept', val: 7, description: 'Ocular changes in space' },
      { id: 'immune-system', name: 'Immune System', type: 'concept', val: 6, description: 'Immune function in space' },
      
      // NASA Missions
      { id: 'iss', name: 'ISS', type: 'mission', val: 10, description: 'International Space Station research' },
      { id: 'artemis', name: 'Artemis', type: 'mission', val: 9, description: 'Lunar exploration program' },
      { id: 'mars-2020', name: 'Mars 2020', type: 'mission', val: 8, description: 'Mars mission preparations' },
      
      // Research Studies
      { id: 'twin-study', name: 'Twin Study', type: 'study', val: 9, description: 'NASA astronaut twin research' },
      { id: 'bed-rest', name: 'Bed Rest', type: 'study', val: 6, description: 'Earth-based space analog' },
      
      // Organisms
      { id: 'mouse', name: 'Mouse Studies', type: 'organism', val: 5, description: 'Rodent research in space' },
      { id: 'plant', name: 'Space Plants', type: 'organism', val: 4, description: 'Botany in microgravity' }
    ],
    links: [
      { source: 'microgravity', target: 'bone-loss', type: 'impacts' },
      { source: 'microgravity', target: 'muscle-atrophy', type: 'impacts' },
      { source: 'microgravity', target: 'vision-impairment', type: 'impacts' },
      { source: 'radiation', target: 'immune-system', type: 'impacts' },
      { source: 'iss', target: 'twin-study', type: 'hosts' },
      { source: 'iss', target: 'mouse', type: 'hosts' },
      { source: 'artemis', target: 'radiation', type: 'studies' },
      { source: 'twin-study', target: 'immune-system', type: 'studies' },
      { source: 'bone-loss', target: 'muscle-atrophy', type: 'correlates' }
    ]
  }), [])

  const graphData = useForceGraph(sampleData.nodes, sampleData.links)

  const filteredNodes = useMemo(() => {
    if (!searchQuery) return graphData.nodes
    return graphData.nodes.filter((node: any) => 
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [graphData.nodes, searchQuery])

  const filteredLinks = useMemo(() => {
    return graphData.links.filter((link: any) => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id
      const targetId = typeof link.target === 'string' ? link.target : link.target.id
      return filteredNodes.some((n: any) => n.id === sourceId) && filteredNodes.some((n: any) => n.id === targetId)
    })
  }, [graphData.links, filteredNodes])

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node)
  }, [selectedNode])

  const CameraController: React.FC<{ distance: number }> = ({ distance }) => {
    const { camera } = useThree()
    
    useEffect(() => {
      camera.position.set(0, 0, distance)
      camera.lookAt(0, 0, 0)
    }, [camera, distance])

    return null
  }

  return (
    <div className="h-[600px] bg-space-black/40 rounded-2xl border border-nasa-blue/30 overflow-hidden relative">
      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-20">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-space-black/80 backdrop-blur-lg border border-nasa-cyan/20 rounded-xl p-4 space-y-4 min-w-80"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-nasa-cyan font-mono text-sm font-bold">3D CONTROLS</h3>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-nasa-blue/30 border border-nasa-blue/50"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-nasa-cyan" />
            <input
              type="text"
              placeholder="SEARCH CONCEPTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-space-black border border-nasa-cyan/30 rounded-lg pl-10 pr-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-nasa-cyan"
            />
          </div>

          {/* Zoom Controls */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>ZOOM</span>
              <span>{cameraDistance.toFixed(0)}</span>
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCameraDistance(Math.max(20, cameraDistance - 10))}
                className="flex-1 bg-nasa-blue/30 border border-nasa-blue/50 rounded-lg p-2 flex items-center justify-center"
              >
                <ZoomIn className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCameraDistance(Math.min(100, cameraDistance + 10))}
                className="flex-1 bg-nasa-blue/30 border border-nasa-blue/50 rounded-lg p-2 flex items-center justify-center"
              >
                <ZoomOut className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-gray-400">NODES</div>
            <div className="text-nasa-cyan text-right">{filteredNodes.length}</div>
            <div className="text-gray-400">CONNECTIONS</div>
            <div className="text-nasa-cyan text-right">{filteredLinks.length}</div>
            <div className="text-gray-400">SELECTED</div>
            <div className="text-green-400 text-right">
              {selectedNode ? selectedNode.name : 'NONE'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        gl={{ antialias: true, alpha: true }}
        className="rounded-2xl cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={['#000013']} />
        
        <CameraController distance={cameraDistance} />
        
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[20, 20, 20]} intensity={1.2} color="#00F5FF" />
        <pointLight position={[-20, -20, 20]} intensity={0.8} color="#0B3D91" />
        <pointLight position={[0, 0, -20]} intensity={0.5} color="#FC3D21" />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={15}
          maxDistance={150}
        />
        
        {/* Starfield Background */}
        <Starfield />
        
        {/* Graph Elements */}
        {filteredLinks.map((link: any, index: number) => (
          <Link3D key={index} link={link} nodes={filteredNodes} />
        ))}
        
        {filteredNodes.map((node: any) => (
          <Node3D
            key={node.id}
            node={node}
            isSelected={selectedNode?.id === node.id}
            onClick={handleNodeClick}
            onHover={setHoveredNode}
          />
        ))}
      </Canvas>

      {/* Node Details Panel */}
      {selectedNode && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-4 right-4 bg-space-black/80 backdrop-blur-lg border border-nasa-blue/30 rounded-xl p-4 max-w-80"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-lg">{selectedNode.name}</h3>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-nasa-cyan hover:text-white transition-colors p-1 rounded hover:bg-nasa-blue/30"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
              <span className="text-nasa-cyan capitalize">{selectedNode.type}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Relevance:</span>
              <span className="text-white">{selectedNode.val}/10</span>
            </div>
            
            {selectedNode.description && (
              <div>
                <div className="text-gray-400 text-xs mb-1">Description</div>
                <div className="text-white text-sm leading-relaxed">{selectedNode.description}</div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Hover Tooltip */}
      {hoveredNode && !selectedNode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bg-space-black/80 backdrop-blur-lg border border-nasa-cyan/30 rounded-lg p-3 pointer-events-none"
          style={{
            left: '50%',
            top: '20%',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="text-white font-semibold text-sm">{hoveredNode.name}</div>
          <div className="text-nasa-cyan text-xs capitalize">{hoveredNode.type}</div>
        </motion.div>
      )}

      {/* Bottom Status Bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-space-black/60 backdrop-blur-lg border border-nasa-cyan/20 rounded-lg p-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="text-nasa-cyan">3D_KNOWLEDGE_UNIVERSE_ACTIVE</div>
          <div className="text-green-400 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>REAL_TIME_RENDERING • {filteredNodes.length} NODES • {filteredLinks.length} CONNECTIONS</span>
          </div>
        </div>
      </div>

      {/* Interaction Guide */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-space-black/60 backdrop-blur-lg border border-nasa-blue/30 rounded-lg p-3">
        <div className="text-xs text-gray-400 font-mono text-center">
          🖱️ DRAG: ROTATE • SCROLL: ZOOM • CLICK: SELECT
        </div>
      </div>
    </div>
  )
}

export default AdvancedKnowledgeGraph