'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface TimelineEvent {
  year: number
  title: string
  significance: string
  category: 'mission' | 'discovery' | 'experiment'
}

const TimelineView: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  
  const events: TimelineEvent[] = [
    { year: 1961, title: 'First Human in Space', significance: 'Yuri Gagarin', category: 'mission' },
    { year: 1969, title: 'Apollo 11 Moon Landing', significance: 'First humans on Moon', category: 'mission' },
    { year: 1973, title: 'Skylab Launch', significance: 'First US space station', category: 'mission' },
    { year: 1986, title: 'Mir Space Station', significance: 'First modular space station', category: 'mission' },
    { year: 1998, title: 'ISS Construction Begins', significance: 'International collaboration', category: 'mission' },
    { year: 2011, title: 'Mars Science Laboratory', significance: 'Curiosity Rover', category: 'mission' },
    { year: 2015, title: 'NASA Twin Study', significance: 'Long-term space effects', category: 'experiment' },
    { year: 2020, title: 'SpaceX Crew Dragon', significance: 'Commercial spaceflight', category: 'mission' }
  ]

  const TimelineNode: React.FC<{ event: TimelineEvent; index: number }> = ({ event, index }) => {
    const meshRef = useRef<THREE.Mesh>(null)
    const x = (event.year - 1960) * 2 - 20
    const y = Math.sin(index) * 3
    
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      }
    })

    const getEventColor = (category: string) => {
      switch (category) {
        case 'mission': return '#0B3D91'
        case 'discovery': return '#FC3D21'
        case 'experiment': return '#00FF88'
        default: return '#888888'
      }
    }

    return (
      <group position={[x, y, 0]}>
        <Sphere
          ref={meshRef}
          args={[0.3]}
          onClick={() => setSelectedEvent(event)}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'default'}
        >
          <meshStandardMaterial 
            color={getEventColor(event.category)} 
            emissive={getEventColor(event.category)}
            emissiveIntensity={0.3}
          />
        </Sphere>
        
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {event.year}
        </Text>
        
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {event.title}
        </Text>
      </group>
    )
  }

  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg relative">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Timeline Line */}
        <Line
          points={Array.from({ length: 61 }, (_, i) => [(i - 30) * 2, 0, 0])}
          color="#444444"
          lineWidth={2}
        />
        
        {/* Year Markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const year = 1960 + i * 10
          const x = (year - 1960) * 2 - 20
          return (
            <Text
              key={year}
              position={[x, -2, 0]}
              fontSize={0.3}
              color="#888888"
              anchorX="center"
              anchorY="middle"
            >
              {year}
            </Text>
          )
        })}
        
        {/* Events */}
        {events.map((event, index) => (
          <TimelineNode key={event.year} event={event} index={index} />
        ))}
      </Canvas>

      {/* Event Details Panel */}
      {selectedEvent && (
        <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 rounded-lg p-4 max-w-80">
          <h3 className="text-white font-bold text-lg mb-2">{selectedEvent.title}</h3>
          <div className="text-gray-300 mb-2">Year: {selectedEvent.year}</div>
          <div className="text-gray-400 text-sm mb-3">{selectedEvent.significance}</div>
          <div className={`inline-block px-2 py-1 rounded text-xs ${
            selectedEvent.category === 'mission' ? 'bg-nasa-blue' :
            selectedEvent.category === 'discovery' ? 'bg-nasa-red' :
            'bg-green-600'
          }`}>
            {selectedEvent.category.toUpperCase()}
          </div>
          <button 
            onClick={() => setSelectedEvent(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

export default TimelineView