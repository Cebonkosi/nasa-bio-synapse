'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Square, Settings, RotateCcw, AlertTriangle, CheckCircle, Shield } from 'lucide-react'

const MissionControl: React.FC = () => {
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle')
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [missionTime, setMissionTime] = useState(0)
  const [showConfig, setShowConfig] = useState(false)
  const [missionParams, setMissionParams] = useState({
    destination: 'MARS_COLONY',
    duration: 680,
    crewSize: 4,
    radiationShielding: 'enhanced',
    artificialGravity: true,
    exerciseRegimen: 'high_intensity'
  })
  const [risks, setRisks] = useState<any[]>([])
  const [countermeasures, setCountermeasures] = useState<any[]>([])
  const simulationRef = useRef<NodeJS.Timeout>()

  // Simulation logic
  const startSimulation = () => {
    if (simulationStatus === 'running') return
    
    setSimulationStatus('running')
    setSimulationProgress(0)
    setMissionTime(0)
    setRisks([])
    setCountermeasures([])

    // Simulate mission progression
    simulationRef.current = setInterval(() => {
      setSimulationProgress(prev => {
        const newProgress = prev + 0.5
        if (newProgress >= 100) {
          completeSimulation()
          return 100
        }
        return newProgress
      })
      setMissionTime(prev => prev + 1)
      
      // Add risks and countermeasures at certain progress points
      if (simulationProgress >= 20 && risks.length === 0) {
        setRisks([
          { id: 1, name: 'Radiation Exposure', severity: 'high', progress: 25 },
          { id: 2, name: 'Bone Density Loss', severity: 'medium', progress: 45 },
          { id: 3, name: 'Muscle Atrophy', severity: 'medium', progress: 60 }
        ])
      }
      
      if (simulationProgress >= 40 && countermeasures.length === 0) {
        setCountermeasures([
          { id: 1, name: 'Advanced Radiation Shielding', effectiveness: 85, status: 'active' },
          { id: 2, name: 'ARED Exercise System', effectiveness: 78, status: 'active' },
          { id: 3, name: 'Nutritional Supplements', effectiveness: 65, status: 'active' }
        ])
      }
    }, 100)
  }

  const pauseSimulation = () => {
    setSimulationStatus('paused')
    if (simulationRef.current) {
      clearInterval(simulationRef.current)
    }
  }

  const resetSimulation = () => {
    setSimulationStatus('idle')
    setSimulationProgress(0)
    setMissionTime(0)
    setRisks([])
    setCountermeasures([])
    if (simulationRef.current) {
      clearInterval(simulationRef.current)
    }
  }

  const completeSimulation = () => {
    setSimulationStatus('completed')
    if (simulationRef.current) {
      clearInterval(simulationRef.current)
    }
  }

  // Mission configuration
  const updateMissionParam = (key: string, value: any) => {
    setMissionParams(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Format mission time
  const formatMissionTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  // Get mission phase based on progress
  const getMissionPhase = () => {
    if (simulationProgress < 25) return 'LAUNCH_AND_TRANSIT'
    if (simulationProgress < 50) return 'DEEP_SPACE_OPERATIONS'
    if (simulationProgress < 75) return 'PLANETARY_APPROACH'
    return 'SURFACE_OPERATIONS'
  }

  useEffect(() => {
    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current)
      }
    }
  }, [])

  return (
    <div className="h-[600px] bg-space-black/40 rounded-2xl border border-nasa-blue/30 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            simulationStatus === 'running' ? 'bg-green-400 animate-pulse' :
            simulationStatus === 'completed' ? 'bg-blue-400' :
            'bg-red-400'
          }`}></div>
          <h2 className="text-2xl font-bold text-white">MISSION CONTROL CENTER</h2>
          <div className="text-nasa-cyan font-mono text-sm bg-nasa-blue/30 px-3 py-1 rounded-full">
            {simulationStatus.toUpperCase()}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSimulation}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET</span>
          </motion.button>
          
          {simulationStatus === 'running' ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={pauseSimulation}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Square className="w-4 h-4" />
              <span>PAUSE</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startSimulation}
              disabled={simulationStatus === 'completed'}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              <span>RUN SIMULATION</span>
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowConfig(true)}
            className="bg-nasa-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>CONFIGURE</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[500px]">
        {/* Mission Parameters & Progress */}
        <div className="space-y-6">
          {/* Mission Parameters */}
          <div className="bg-space-black/60 border border-nasa-cyan/20 rounded-xl p-4">
            <h3 className="text-nasa-cyan font-mono text-sm mb-4">MISSION_PARAMETERS</h3>
            <div className="space-y-4">
              {[
                { label: 'DESTINATION', value: missionParams.destination, icon: '🚀' },
                { label: 'DURATION', value: `${missionParams.duration} DAYS`, icon: '⏰' },
                { label: 'CREW_SIZE', value: `${missionParams.crewSize} ASTRONAUTS`, icon: '👨‍🚀' },
                { label: 'PHASE', value: getMissionPhase(), icon: '📡' }
              ].map((param, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-nasa-blue/20">
                  <div className="flex items-center space-x-2">
                    <span>{param.icon}</span>
                    <span className="text-gray-400 text-sm">{param.label}</span>
                  </div>
                  <span className="text-white font-mono text-sm">{param.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Progress */}
          <div className="bg-space-black/60 border border-nasa-cyan/20 rounded-xl p-4">
            <h3 className="text-nasa-cyan font-mono text-sm mb-4">MISSION_PROGRESS</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">COMPLETION</span>
                  <span className="text-nasa-cyan">{simulationProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-nasa-blue/20 rounded-full h-2">
                  <motion.div 
                    className="h-2 bg-gradient-to-r from-nasa-cyan to-nasa-blue rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${simulationProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">MISSION_TIME</span>
                <span className="text-white font-mono">{formatMissionTime(missionTime)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Visualization */}
        <div className="col-span-2 bg-space-black/60 border border-nasa-cyan/20 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-nasa-cyan font-mono text-sm">SIMULATION_VISUALIZATION</h3>
            <div className="text-gray-400 text-sm font-mono">
              {simulationStatus === 'running' && '▶ REAL_TIME_SIMULATION'}
              {simulationStatus === 'paused' && '⏸ SIMULATION_PAUSED'}
              {simulationStatus === 'completed' && '✓ MISSION_COMPLETE'}
              {simulationStatus === 'idle' && '⏹ AWAITING_INITIALIZATION'}
            </div>
          </div>

          <div className="h-[400px] flex items-center justify-center relative">
            {/* Animated Space Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-nasa-blue/10 to-nasa-cyan/5 rounded-lg"></div>
            
            {/* Mission Visualization */}
            <div className="relative z-10 text-center">
              <AnimatePresence mode="wait">
                {simulationStatus === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="space-y-4"
                  >
                    <div className="w-32 h-32 border-2 border-nasa-cyan rounded-full mx-auto flex items-center justify-center">
                      <div className="w-24 h-24 border border-nasa-blue rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-nasa-cyan font-mono">SIMULATION_READY</p>
                    <p className="text-gray-400 text-sm">AWAITING_INITIALIZATION</p>
                  </motion.div>
                )}

                {simulationStatus === 'running' && (
                  <motion.div
                    key="running"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Animated Spacecraft */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-4xl"
                    >
                      🚀
                    </motion.div>
                    
                    {/* Progress Visualization */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>EARTH</span>
                        <span>DEEP_SPACE</span>
                        <span>{missionParams.destination}</span>
                      </div>
                      <div className="w-64 h-1 bg-nasa-blue/30 rounded-full mx-auto">
                        <motion.div
                          className="h-1 bg-gradient-to-r from-nasa-cyan to-green-400 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${simulationProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Real-time Data */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-nasa-blue/20 rounded p-2">
                        <div className="text-nasa-cyan">CREW_VITALS</div>
                        <div className="text-green-400">NOMINAL</div>
                      </div>
                      <div className="bg-nasa-blue/20 rounded p-2">
                        <div className="text-nasa-cyan">SYSTEMS</div>
                        <div className="text-green-400">OPTIMAL</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {simulationStatus === 'completed' && (
                  <motion.div
                    key="completed"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="w-32 h-32 bg-green-400/20 rounded-full mx-auto flex items-center justify-center border border-green-400">
                      <CheckCircle className="w-16 h-16 text-green-400" />
                    </div>
                    <p className="text-green-400 font-mono text-lg">MISSION_SUCCESS</p>
                    <p className="text-gray-400">All objectives completed successfully</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Risks & Countermeasures Panel */}
      {(risks.length > 0 || countermeasures.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid grid-cols-2 gap-6"
        >
          {/* Identified Risks */}
          <div className="bg-space-black/60 border border-red-400/30 rounded-xl p-4">
            <h3 className="text-red-400 font-mono text-sm mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>IDENTIFIED_RISKS</span>
            </h3>
            <div className="space-y-3">
              {risks.map(risk => (
                <div key={risk.id} className="flex justify-between items-center">
                  <span className="text-white text-sm">{risk.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      risk.severity === 'high' ? 'bg-red-400' : 
                      risk.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <span className="text-gray-400 text-xs">{risk.severity.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Countermeasures */}
          <div className="bg-space-black/60 border border-green-400/30 rounded-xl p-4">
            <h3 className="text-green-400 font-mono text-sm mb-4 flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>COUNTERMEASURES</span>
            </h3>
            <div className="space-y-3">
              {countermeasures.map(cm => (
                <div key={cm.id} className="flex justify-between items-center">
                  <span className="text-white text-sm">{cm.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="text-green-400 text-xs">{cm.effectiveness}%</div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Configuration Modal */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowConfig(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-space-black border border-nasa-cyan/30 rounded-2xl p-6 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">MISSION_CONFIGURATION</h3>
                <button 
                  onClick={() => setShowConfig(false)}
                  className="text-nasa-cyan hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Destination */}
                <div>
                  <label className="text-nasa-cyan font-mono text-sm mb-2 block">DESTINATION</label>
                  <select
                    value={missionParams.destination}
                    onChange={(e) => updateMissionParam('destination', e.target.value)}
                    className="w-full bg-space-black border border-nasa-cyan/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nasa-cyan"
                  >
                    <option value="LUNAR_BASE">LUNAR_BASE</option>
                    <option value="MARS_COLONY">MARS_COLONY</option>
                    <option value="DEEP_SPACE">DEEP_SPACE_MISSION</option>
                    <option value="ISS">INTERNATIONAL_SPACE_STATION</option>
                  </select>
                </div>

                {/* Mission Duration */}
                <div>
                  <label className="text-nasa-cyan font-mono text-sm mb-2 block">
                    MISSION_DURATION: {missionParams.duration} DAYS
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="1000"
                    value={missionParams.duration}
                    onChange={(e) => updateMissionParam('duration', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Crew Size */}
                <div>
                  <label className="text-nasa-cyan font-mono text-sm mb-2 block">
                    CREW_SIZE: {missionParams.crewSize} ASTRONAUTS
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={missionParams.crewSize}
                    onChange={(e) => updateMissionParam('crewSize', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Advanced Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-nasa-cyan font-mono text-sm mb-2 block">RADIATION_SHIELDING</label>
                    <select
                      value={missionParams.radiationShielding}
                      onChange={(e) => updateMissionParam('radiationShielding', e.target.value)}
                      className="w-full bg-space-black border border-nasa-cyan/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nasa-cyan"
                    >
                      <option value="basic">BASIC</option>
                      <option value="enhanced">ENHANCED</option>
                      <option value="advanced">ADVANCED</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-nasa-cyan font-mono text-sm mb-2 block">EXERCISE_REGIMEN</label>
                    <select
                      value={missionParams.exerciseRegimen}
                      onChange={(e) => updateMissionParam('exerciseRegimen', e.target.value)}
                      className="w-full bg-space-black border border-nasa-cyan/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nasa-cyan"
                    >
                      <option value="minimal">MINIMAL</option>
                      <option value="standard">STANDARD</option>
                      <option value="high_intensity">HIGH_INTENSITY</option>
                    </select>
                  </div>
                </div>

                {/* Artificial Gravity Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-nasa-cyan font-mono text-sm">ARTIFICIAL_GRAVITY</label>
                  <button
                    onClick={() => updateMissionParam('artificialGravity', !missionParams.artificialGravity)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      missionParams.artificialGravity ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      missionParams.artificialGravity ? 'transform translate-x-7' : 'transform translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowConfig(false)}
                    className="px-4 py-2 border border-nasa-cyan/30 text-nasa-cyan rounded-lg hover:bg-nasa-cyan/10 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => {
                      setShowConfig(false)
                      resetSimulation()
                    }}
                    className="px-4 py-2 bg-nasa-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    APPLY_CONFIG
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MissionControl