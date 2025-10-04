'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Satellite, Database, Brain, Activity, Zap } from 'lucide-react'
import AdvancedKnowledgeGraph from '../components/AdvancedKnowledgeGraph'
import MissionControl from '../components/MissionControl'
import DataExplorer from '../components/DataExplorer'

export default function Home() {
  const [activeModule, setActiveModule] = useState<'universe' | 'mission' | 'data'>('universe')
  const [isLoading, setIsLoading] = useState(true)
  const [systemStatus, setSystemStatus] = useState('INITIALIZING')

  useEffect(() => {
    const statuses = ['INITIALIZING', 'LOADING_NEURAL_NETWORK', 'CONNECTING_NASA_APIS', 'READY']
    let current = 0

    const interval = setInterval(() => {
      setSystemStatus(statuses[current])
      current++
      if (current >= statuses.length) {
        clearInterval(interval)
        setTimeout(() => setIsLoading(false), 1000)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-space-black relative overflow-hidden">
        {/* Animated Space Background */}
        <div className="absolute inset-0 bg-nebula"></div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent scanline"></div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            {/* NASA Logo Animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 mx-auto mb-8 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-nasa-cyan via-nasa-blue to-nasa-red rounded-full glow-cyan"></div>
              <div className="absolute inset-4 bg-space-black rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-nasa-cyan" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-6xl font-bold terminal-text mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              BIO-SYNAPSE
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <p className="text-nasa-cyan font-mono text-lg tracking-wider">
                SPACE BIOLOGY INTELLIGENCE PLATFORM
              </p>
              
              <div className="bg-black/50 border border-nasa-cyan/30 rounded-lg p-4 max-w-md mx-auto">
                <div className="text-nasa-cyan font-mono text-sm flex items-center justify-between">
                  <span>SYSTEM_STATUS</span>
                  <span className="text-green-400 animate-pulse">●</span>
                </div>
                <div className="text-white font-mono text-xs mt-2">
                  {systemStatus}...
                </div>
                <div className="w-full bg-nasa-blue/20 rounded-full h-1 mt-2">
                  <motion.div 
                    className="h-1 bg-gradient-to-r from-nasa-cyan to-nasa-blue rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-space-black relative overflow-hidden">
      {/* Animated Space Background */}
      <div className="absolute inset-0 bg-nebula"></div>
      
      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent scanline"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-nasa-blue/30 bg-space-black/80 backdrop-blur-lg"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-nasa-cyan to-nasa-blue rounded-lg flex items-center justify-center glow-cyan">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">BIO-SYNAPSE</h1>
                    <p className="text-nasa-cyan text-sm font-mono">NASA SPACE BIOLOGY</p>
                  </div>
                </motion.div>
              </div>

              {/* System Status */}
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-green-400 font-mono text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>SYSTEM_OPERATIONAL</span>
                  </div>
                  <div className="text-nasa-cyan text-xs">ALL_MODULES_NOMINAL</div>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-b border-nasa-blue/20 bg-space-blue/30 backdrop-blur-lg"
        >
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
                      ? 'bg-gradient-to-r from-nasa-blue/80 to-nasa-cyan/80 text-white shadow-2xl glow-blue'
                      : 'bg-space-black/50 text-gray-400 hover:text-white hover:bg-nasa-blue/20 border border-transparent hover:border-nasa-blue/30'
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${activeModule === item.id ? 'text-white' : 'text-nasa-cyan'}`} />
                  <div>
                    <div className="font-bold text-sm tracking-wider">{item.label}</div>
                    <div className="text-xs opacity-80">{item.description}</div>
                  </div>
                  {activeModule === item.id && (
                    <motion.div
                      layoutId="activeModule"
                      className="w-2 h-2 bg-nasa-cyan rounded-full glow-cyan ml-auto"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeModule === 'universe' && <AdvancedKnowledgeGraph />}
              {activeModule === 'mission' && <MissionControl />}
              {activeModule === 'data' && <DataExplorer />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Status Bar */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-nasa-blue/20 bg-space-black/80 backdrop-blur-lg"
        >
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-6 text-nasa-cyan">
                <div className="flex items-center space-x-2">
                  <Activity className="w-3 h-3" />
                  <span>RESEARCH_PAPERS: 2,847</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-3 h-3" />
                  <span>BIOLOGICAL_CONCEPTS: 156</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="w-3 h-3" />
                  <span>ACTIVE_CONNECTIONS: 4,892</span>
                </div>
              </div>
              
              <div className="text-gray-400">
                NASA SPACE APP CHALLENGE | HACKATHON 2025 | BIO-SYNAPSE v1.0
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}