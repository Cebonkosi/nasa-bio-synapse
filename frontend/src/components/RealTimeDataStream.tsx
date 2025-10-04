'use client'

import React, { useState, useEffect } from 'react'

const RealTimeDataStream: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<Array<{ time: string; value: number; type: string; unit: string; icon: string }>>([])

  useEffect(() => {
    // Simulate real-time data stream
    const interval = setInterval(() => {
      const types = [
        { type: 'heart_rate', unit: 'BPM', icon: '💓', min: 60, max: 80 },
        { type: 'oxygen_sat', unit: '%', icon: '💨', min: 95, max: 99 },
        { type: 'temperature', unit: '°C', icon: '🌡️', min: 36, max: 37 },
        { type: 'radiation', unit: 'μSv', icon: '☢️', min: 0.1, max: 0.5 },
        { type: 'sleep_quality', unit: '%', icon: '😴', min: 70, max: 95 }
      ]
      
      const randomType = types[Math.floor(Math.random() * types.length)]
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        value: Math.random() * (randomType.max - randomType.min) + randomType.min,
        type: randomType.type,
        unit: randomType.unit,
        icon: randomType.icon
      }
      
      setDataPoints(prev => [newPoint, ...prev.slice(0, 8)]) // Keep last 9 points
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (type: string, value: number) => {
    const thresholds: any = {
      heart_rate: { low: 60, high: 100 },
      oxygen_sat: { low: 90, high: 100 },
      temperature: { low: 36, high: 38 },
      radiation: { low: 0, high: 1 },
      sleep_quality: { low: 60, high: 100 }
    }
    
    const threshold = thresholds[type]
    if (!threshold) return 'text-gray-400'
    
    if (value < threshold.low || value > threshold.high) return 'text-red-400'
    if (value < threshold.low + 5 || value > threshold.high - 5) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getTypeLabel = (type: string) => {
    const labels: any = {
      heart_rate: 'Heart Rate',
      oxygen_sat: 'Oxygen Saturation',
      temperature: 'Body Temperature',
      radiation: 'Radiation Exposure',
      sleep_quality: 'Sleep Quality'
    }
    return labels[type] || type
  }

  return (
    <div className="data-card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-cyan-400 font-mono text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full glow-cyan"></span>
          LIVE ASTRONAUT METRICS
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-400 rounded-full glow-red animate-pulse"></div>
          <span className="text-xs text-gray-400">LIVE</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {dataPoints.map((point, index) => (
          <div 
            key={index}
            className="glass rounded-lg p-3 border border-slate-600 hover:border-cyan-400 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl group-hover:scale-110 transition-transform">{point.icon}</span>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {getTypeLabel(point.type)}
                  </div>
                  <div className="text-gray-400 text-xs">{point.time}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-mono text-lg font-bold ${getStatusColor(point.type, point.value)}`}>
                  {point.value.toFixed(1)}
                  <span className="text-gray-400 text-sm ml-1">{point.unit}</span>
                </div>
                <div className="text-gray-400 text-xs">ISS • LAB MODULE</div>
              </div>
            </div>
            
            {/* Value bar indicator */}
            <div className="w-full bg-slate-700 rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all duration-500 ${
                  getStatusColor(point.type, point.value).replace('text-', 'bg-')
                }`}
                style={{ 
                  width: `${Math.min((point.value / 100) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
        
        {dataPoints.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-3xl mb-3">📡</div>
            <div className="text-sm">Initializing data stream...</div>
            <div className="text-xs mt-1">Connecting to ISS telemetry</div>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-700">
        <div className="flex justify-between text-xs text-gray-500">
          <span>SOURCE: INTERNATIONAL SPACE STATION</span>
          <span>UPDATING...</span>
        </div>
      </div>
    </div>
  )
}

export default RealTimeDataStream