'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GalaxyView: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Create galaxy-like particle system
  const particles = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spiral galaxy distribution
      const radius = Math.random() * 50
      const spinAngle = radius * 0.5
      const branchAngle = (i % 6) * Math.PI / 3
      
      const x = Math.cos(spinAngle + branchAngle) * radius
      const y = (Math.random() - 0.5) * 10
      const z = Math.sin(spinAngle + branchAngle) * radius
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      // Color based on position
      colors[i * 3] = 0.1 + Math.random() * 0.3 // Red
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.5 // Green
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // Blue
      
      sizes[i] = Math.random() * 2
    }
    
    return { positions, colors, sizes }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export default GalaxyView