'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Database, BarChart3, Users, Activity } from 'lucide-react'

const DataExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'datasets' | 'analytics'>('datasets')
  const [searchQuery, setSearchQuery] = useState('')

  const datasets = [
    {
      id: 1,
      title: 'NASA Twin Study',
      description: 'Astronaut twin research in space vs Earth',
      records: '12,500',
      category: 'Genomics'
    },
    {
      id: 2,
      title: 'ISS Bone Density',
      description: 'Long-term bone density changes in microgravity',
      records: '8,400',
      category: 'Physiology'
    },
    {
      id: 3,
      title: 'Mars Radiation Effects',
      description: 'Radiation impact on biological systems',
      records: '5,200',
      category: 'Radiation'
    }
  ]

  return (
    <div className="h-[600px] bg-space-black/40 rounded-2xl border border-nasa-blue/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-nasa-cyan rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold text-white">DATA LAB</h2>
        </div>
        
        <div className="text-right">
          <div className="text-nasa-cyan font-mono text-sm">3 DATASETS</div>
          <div className="text-gray-400 text-xs">26,100 RECORDS</div>
        </div>
      </div>

      <div className="flex space-x-6 h-[500px]">
        {/* Sidebar */}
        <div className="w-80 space-y-6">
          <div className="bg-space-black/60 border border-nasa-cyan/20 rounded-xl p-4">
            <h3 className="text-nasa-cyan font-mono text-sm mb-4">DATA FILTERS</h3>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-nasa-cyan" />
              <input
                type="text"
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-space-black border border-nasa-cyan/30 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-nasa-cyan"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-space-black/60 border border-nasa-cyan/20 rounded-xl p-4">
            <h3 className="text-nasa-cyan font-mono text-sm mb-4">DATASET STATS</h3>
            <div className="space-y-3">
              {[
                { label: 'TOTAL DATASETS', value: '3', color: 'text-nasa-cyan' },
                { label: 'ACTIVE STUDIES', value: '3', color: 'text-green-400' },
                { label: 'DATA RECORDS', value: '26,100', color: 'text-white' }
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className={`${stat.color} font-mono text-sm`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-space-black/60 border border-nasa-cyan/20 rounded-xl p-4">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            {[
              { id: 'datasets', label: 'DATASETS', icon: Database },
              { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-nasa-blue text-white shadow-lg'
                    : 'bg-space-black/50 text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-semibold text-sm">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'datasets' && (
            <div className="space-y-4">
              {datasets.map((dataset, index) => (
                <motion.div
                  key={dataset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-space-black/40 border border-nasa-blue/30 rounded-xl p-4 hover:border-nasa-cyan/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-nasa-blue/30 rounded-lg text-nasa-cyan">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-1">{dataset.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{dataset.description}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="text-gray-400">{dataset.records} records</span>
                          <span className="text-nasa-cyan">{dataset.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-nasa-cyan mx-auto mb-4" />
                <p className="text-gray-400">Analytics dashboard coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DataExplorer