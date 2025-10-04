'use client'

import React from 'react'

const MissionSimulator: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🚀</div>
      <h2 className="text-3xl font-bold text-white mb-4">Mission Simulator</h2>
      <p className="text-gray-400 text-lg mb-8">
        AI-powered mission risk assessment and countermeasure planning
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-gray-700 p-8 rounded-xl text-left">
          <h3 className="font-bold text-white text-xl mb-4">Mission Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-300 block mb-2">Destination</label>
              <select className="w-full bg-gray-600 text-white rounded-lg px-4 py-3">
                <option>International Space Station (ISS)</option>
                <option>Lunar Gateway</option>
                <option>Mars Surface</option>
                <option>Deep Space Exploration</option>
              </select>
            </div>
            <div>
              <label className="text-gray-300 block mb-2">Mission Duration</label>
              <input type="range" min="30" max="1000" className="w-full" />
              <div className="text-gray-400 text-sm">180 days</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 p-8 rounded-xl text-left">
          <h3 className="font-bold text-white text-xl mb-4">Risk Assessment</h3>
          <div className="space-y-3">
            {[
              { risk: 'Bone Density Loss', level: 'High', value: 75 },
              { risk: 'Radiation Exposure', level: 'Medium', value: 60 },
              { risk: 'Muscle Atrophy', level: 'Medium', value: 55 },
              { risk: 'Psychological Stress', level: 'Low', value: 30 }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.risk}</span>
                  <span className={
                    item.level === 'High' ? 'text-red-400' :
                    item.level === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                  }>
                    {item.level}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.level === 'High' ? 'bg-red-500' :
                      item.level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionSimulator