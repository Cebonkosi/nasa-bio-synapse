'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Satellite, Database, Brain } from 'lucide-react'

// Import our refactored components
import AdvancedKnowledgeGraph from '../components/AdvancedKnowledgeGraph'
import MissionControl from '../components/MissionControl'
import DataExplorer from '../components/DataExplorer'

export default function Home() {
  const [activeModule, setActiveModule] = useState<'universe' | 'mission' | 'data'>('universe')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-space-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-nasa-blue border-t-transparent rounded-full mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-white mb-4">BIO-SYNAPSE</h1>
          <p className="text-nasa-cyan font-mono">Initializing Space Biology Platform...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-space-black">
      {/* Header */}
      <header className="border-b border-nasa-blue/30 bg-space-black/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-nasa-cyan to-nasa-blue rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">BIO-SYNAPSE</h1>
                <p className="text-nasa-cyan text-sm">NASA SPACE BIOLOGY</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-green-400 font-mono text-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>SYSTEM_OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-nasa-blue/20 bg-space-blue/30 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1 py-3">
            {[
              {
                id: 'universe',
                label: 'KNOWLEDGE UNIVERSE',
                icon: Brain,
                description: '3D Research Network'
              },
              {
                id: 'mission',
                label: 'MISSION CONTROL',
                icon: Satellite,
                description: 'Live Simulations'
              },
              {
                id: 'data',
                label: 'DATA LAB',
                icon: Database,
                description: 'Advanced Analytics'
              }
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveModule(item.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 flex-1 text-left ${
                  activeModule === item.id
                    ? 'bg-gradient-to-r from-nasa-blue/80 to-nasa-cyan/80 text-white shadow-2xl'
                    : 'bg-space-black/50 text-gray-400 hover:text-white hover:bg-nasa-blue/20'
                }`}
              >
                <item.icon className={`w-6 h-6 ${activeModule === item.id ? 'text-white' : 'text-nasa-cyan'}`} />
                <div>
                  <div className="font-bold text-sm tracking-wider">{item.label}</div>
                  <div className="text-xs opacity-80">{item.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {/* Each tab shows the correct component */}
            {activeModule === 'universe' && <AdvancedKnowledgeGraph />}
            {activeModule === 'mission' && <MissionControl />}
            {activeModule === 'data' && <DataExplorer />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-nasa-blue/20 bg-space-black/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="text-nasa-cyan">
              NASA SPACE BIOLOGY HACKATHON 2024 | BIO-SYNAPSE v1.0
            </div>
            <div className="text-gray-400">
              ALL SYSTEMS NOMINAL
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}