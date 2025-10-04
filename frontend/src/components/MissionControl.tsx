'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Download, Database, BarChart3, LineChart, PieChart, Activity, Zap, TrendingUp, Calendar, Users, TestTube, Brain, Heart, Eye } from 'lucide-react'

const DataExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'datasets' | 'analytics' | 'trends' | 'insights'>('datasets')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDataset, setSelectedDataset] = useState<any>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '1y' | 'all'>('1y')
  const [filters, setFilters] = useState({
    organism: 'all',
    studyType: 'all',
    riskLevel: 'all'
  })

  // Sample NASA space biology datasets
  const datasets = useMemo(() => [
    {
      id: 'nasa-twins',
      title: 'NASA Twin Study',
      description: 'Comprehensive study of astronaut twins Scott and Mark Kelly',
      category: 'genomics',
      organism: 'human',
      records: 12500,
      lastUpdated: '2024-01-15',
      status: 'active',
      metrics: {
        completeness: 98,
        reliability: 95,
        citations: 247
      },
      tags: ['microgravity', 'genomics', 'longitudinal'],
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 'iss-bone-density',
      title: 'ISS Bone Density Study',
      description: 'Long-term bone density changes in microgravity',
      category: 'physiology',
      organism: 'human',
      records: 8400,
      lastUpdated: '2024-02-01',
      status: 'active',
      metrics: {
        completeness: 92,
        reliability: 88,
        citations: 156
      },
      tags: ['bone_loss', 'microgravity', 'exercise'],
      icon: <Activity className="w-6 h-6" />
    },
    {
      id: 'mars-radiation',
      title: 'Mars Radiation Exposure',
      description: 'Radiation effects on biological systems for Mars missions',
      category: 'radiation',
      organism: 'multi',
      records: 5200,
      lastUpdated: '2024-01-28',
      status: 'active',
      metrics: {
        completeness: 85,
        reliability: 90,
        citations: 89
      },
      tags: ['radiation', 'mars', 'shielding'],
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'mouse-microgravity',
      title: 'Rodent Research Microgravity',
      description: 'Mouse physiological adaptations to space environment',
      category: 'physiology',
      organism: 'mouse',
      records: 3200,
      lastUpdated: '2024-01-20',
      status: 'active',
      metrics: {
        completeness: 78,
        reliability: 82,
        citations: 67
      },
      tags: ['rodent', 'muscle_atrophy', 'neuroscience'],
      icon: <TestTube className="w-6 h-6" />
    },
    {
      id: 'vision-impairment',
      title: 'Spaceflight Visual Impairment',
      description: 'Ocular structural changes in long-duration spaceflight',
      category: 'ophthalmology',
      organism: 'human',
      records: 2800,
      lastUpdated: '2024-02-10',
      status: 'active',
      metrics: {
        completeness: 88,
        reliability: 85,
        citations: 134
      },
      tags: ['vision', 'fluid_shift', 'intracranial'],
      icon: <Eye className="w-6 h-6" />
    },
    {
      id: 'immune-space',
      title: 'Immune System in Space',
      description: 'Immune function alterations during space missions',
      category: 'immunology',
      organism: 'human',
      records: 4100,
      lastUpdated: '2024-01-25',
      status: 'active',
      metrics: {
        completeness: 82,
        reliability: 79,
        citations: 98
      },
      tags: ['immune', 'microbiology', 'stress'],
      icon: <Heart className="w-6 h-6" />
    }
  ], [])

  // Analytics data
  const analyticsData = useMemo(() => ({
    categories: {
      'Physiology': 42,
      'Genomics': 28,
      'Radiation': 15,
      'Psychology': 8,
      'Nutrition': 7
    },
    trends: [
      { month: 'Jan', studies: 45, citations: 120 },
      { month: 'Feb', studies: 52, citations: 145 },
      { month: 'Mar', studies: 48, citations: 138 },
      { month: 'Apr', studies: 61, citations: 189 },
      { month: 'May', studies: 55, citations: 167 },
      { month: 'Jun', studies: 68, citations: 210 }
    ],
    organisms: {
      'Human': 65,
      'Mouse': 20,
      'Plant': 8,
      'Other': 7
    }
  }), [])

  // Filter datasets based on search and filters
  const filteredDatasets = useMemo(() => {
    return datasets.filter(dataset => {
      const matchesSearch = dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesOrganism = filters.organism === 'all' || dataset.organism === filters.organism
      const matchesCategory = filters.studyType === 'all' || dataset.category === filters.studyType
      
      return matchesSearch && matchesOrganism && matchesCategory
    })
  }, [datasets, searchQuery, filters])

  // Quick stats
  const stats = useMemo(() => ({
    totalDatasets: datasets.length,
    totalRecords: datasets.reduce((sum, dataset) => sum + dataset.records, 0),
    activeStudies: datasets.filter(d => d.status === 'active').length,
    avgReliability: Math.round(datasets.reduce((sum, dataset) => sum + dataset.metrics.reliability, 0) / datasets.length)
  }), [datasets])

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="h-[600px] bg-space-black/40 rounded-2xl border border-nasa-blue/30 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-nasa-cyan rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold text-white">DATA LAB</h2>
          <div className="text-nasa-cyan font-mono text-sm bg-nasa-blue/30 px-3 py-1 rounded-full">
            EXPLORATION_MODE
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-nasa-cyan font-mono text-sm">{stats.totalDatasets} DATASETS</div>
            <div className="text-gray-400 text-xs">{stats.totalRecords.toLocaleString()} RECORDS</div>
          </div>
        </div>
      </div>

      <div className="flex space-x-6 h-[500px]">
        {/* Sidebar */}
        <div className="w-80 space-y-6">
          {/* Search */}
          <div className="bg-space-black/60 border border-nasa-cyan/20 rounded-xl p-4">
            <h3 className="text-nasa-cyan font-mono text-sm mb-4">DATA_FILTERS</h3>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-nasa-cyan" />
              <input
                type="text"
                placeholder="SEARCH DATASETS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-space-black border border-nasa-cyan/30 rounded-lg pl-10 pr-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-nasa-cyan"
              />
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">ORGANISM</label>
                <select
                  value={filters.organism}
                  onChange={(e) => updateFilter('organism', e.target.value)}
                  className="w-full bg-space-black border border-nasa-cyan/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-nasa-cyan"
                >
                  <option value="all">ALL ORGANISMS</option>
                  <option value="human">HUMAN</option>
                  <option value="mouse">MOUSE</option>
                  <option value="plant">PLANT</option>
                  <option value="multi">MULTI-SPECIES</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">STUDY TYPE</label>
                <select
                  value={filters.studyType}
                  onChange={(e) => updateFilter('studyType', e.target.value)}
                  className="w-full bg-space-black border border-nasa-cyan/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-nasa-cyan"
                >
                  <option value="all">ALL TYPES</option>
                  <option value="physiology">PHYSIOLOGY</option>
                  <option value="genomics">GENOMICS</option>
                  <option value="radiation">RADIATION</option>
                  <option value="immunology">IMMUNOLOGY</option>
                  <option value="ophthalmology">OPHTHALMOLOGY</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">TIME RANGE</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="w-full bg-space-black border border-nasa-cyan/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-nasa-cyan"
                >
                  <option value="7d">LAST 7 DAYS</option>
                  <option value="30d">LAST 30 DAYS</option>
                  <option value="1y">LAST YEAR</option>
                  <option value="all">ALL TIME</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-space-black/60 border border-nasa-cyan/20 rounded-xl p-4">
            <h3 className="text-nasa-cyan font-mono text-sm mb-4">DATASET_STATS</h3>
            <div className="space-y-3">
              {[
                { label: 'TOTAL DATASETS', value: stats.totalDatasets, color: 'text-nasa-cyan' },
                { label: 'ACTIVE STUDIES', value: stats.activeStudies, color: 'text-green-400' },
                { label: 'DATA RECORDS', value: stats.totalRecords.toLocaleString(), color: 'text-white' },
                { label: 'AVG RELIABILITY', value: `${stats.avgReliability}%`, color: 'text-yellow-400' }
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
        <div className="flex-1 flex flex-col">
          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-6">
            {[
              { id: 'datasets', label: 'DATASETS', icon: Database },
              { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
              { id: 'trends', label: 'TRENDS', icon: TrendingUp },
              { id: 'insights', label: 'INSIGHTS', icon: Brain }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-nasa-blue text-white shadow-lg glow-blue'
                    : 'bg-space-black/50 text-gray-400 hover:text-white hover:bg-nasa-blue/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-semibold text-sm">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 bg-space-black/60 border border-nasa-cyan/20 rounded-xl p-4 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'datasets' && (
                <motion.div
                  key="datasets"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full overflow-y-auto"
                >
                  <div className="grid gap-4">
                    {filteredDatasets.map((dataset, index) => (
                      <motion.div
                        key={dataset.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-space-black/40 border border-nasa-blue/30 rounded-xl p-4 hover:border-nasa-cyan/50 transition-all duration-300 cursor-pointer group"
                        onClick={() => setSelectedDataset(dataset)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-nasa-blue/30 rounded-lg text-nasa-cyan group-hover:scale-110 transition-transform">
                              {dataset.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-bold text-lg mb-1">{dataset.title}</h3>
                              <p className="text-gray-400 text-sm mb-3">{dataset.description}</p>
                              
                              <div className="flex items-center space-x-4 text-xs">
                                <div className="flex items-center space-x-1">
                                  <Database className="w-3 h-3 text-nasa-cyan" />
                                  <span className="text-gray-400">{dataset.records.toLocaleString()} records</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3 text-nasa-cyan" />
                                  <span className="text-gray-400">Updated {dataset.lastUpdated}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Activity className="w-3 h-3 text-green-400" />
                                  <span className="text-green-400">{dataset.metrics.reliability}% reliable</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-nasa-cyan font-mono text-sm bg-nasa-blue/30 px-2 py-1 rounded">
                              {dataset.category.toUpperCase()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {dataset.tags.map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-nasa-blue/20 text-nasa-cyan text-xs rounded-full border border-nasa-blue/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                    
                    {filteredDatasets.length === 0 && (
                      <div className="text-center py-12">
                        <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No datasets found</p>
                        <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <div className="grid grid-cols-2 gap-6 h-full">
                    {/* Research Categories */}
                    <div className="bg-space-black/40 border border-nasa-cyan/20 rounded-xl p-4">
                      <h3 className="text-nasa-cyan font-mono text-sm mb-4 flex items-center space-x-2">
                        <PieChart className="w-4 h-4" />
                        <span>RESEARCH_CATEGORIES</span>
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(analyticsData.categories).map(([category, count], index) => (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-white text-sm">{category}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-nasa-blue/20 rounded-full h-2">
                                <div 
                                  className="h-2 bg-gradient-to-r from-nasa-cyan to-nasa-blue rounded-full"
                                  style={{ width: `${(count / 100) * 100}%` }}
                                />
                              </div>
                              <span className="text-nasa-cyan text-sm font-mono w-8 text-right">{count}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Organism Distribution */}
                    <div className="bg-space-black/40 border border-nasa-cyan/20 rounded-xl p-4">
                      <h3 className="text-nasa-cyan font-mono text-sm mb-4 flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>ORGANISM_DISTRIBUTION</span>
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(analyticsData.organisms).map(([organism, percentage], index) => (
                          <div key={organism} className="flex items-center justify-between">
                            <span className="text-white text-sm">{organism}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-nasa-blue/20 rounded-full h-2">
                                <div 
                                  className="h-2 bg-green-400 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-green-400 text-sm font-mono w-8 text-right">{percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Study Trends */}
                    <div className="col-span-2 bg-space-black/40 border border-nasa-cyan/20 rounded-xl p-4">
                      <h3 className="text-nasa-cyan font-mono text-sm mb-4 flex items-center space-x-2">
                        <LineChart className="w-4 h-4" />
                        <span>STUDY_TRENDS</span>
                      </h3>
                      <div className="flex items-end justify-between h-32 px-4">
                        {analyticsData.trends.map((trend, index) => (
                          <div key={index} className="flex flex-col items-center space-y-2">
                            <div className="text-gray-400 text-xs">{trend.month}</div>
                            <div className="flex items-end space-x-1">
                              <div 
                                className="w-4 bg-nasa-cyan rounded-t"
                                style={{ height: `${(trend.studies / 80) * 60}px` }}
                              />
                              <div 
                                className="w-4 bg-nasa-blue rounded-t"
                                style={{ height: `${(trend.citations / 250) * 60}px` }}
                              />
                            </div>
                            <div className="text-xs text-center">
                              <div className="text-nasa-cyan">{trend.studies}</div>
                              <div className="text-nasa-blue">{trend.citations}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center space-x-4 mt-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-nasa-cyan rounded"></div>
                          <span className="text-gray-400">Studies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-nasa-blue rounded"></div>
                          <span className="text-gray-400">Citations</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'trends' && (
                <motion.div
                  key="trends"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-nasa-cyan mx-auto mb-4" />
                    <h3 className="text-white text-lg mb-2">Trend Analysis</h3>
                    <p className="text-gray-400">Advanced trend analysis and predictive modeling</p>
                    <p className="text-gray-500 text-sm mt-1">Coming in next update</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'insights' && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center">
                    <Brain className="w-16 h-16 text-nasa-cyan mx-auto mb-4" />
                    <h3 className="text-white text-lg mb-2">AI Insights</h3>
                    <p className="text-gray-400">Machine learning-powered research insights</p>
                    <p className="text-gray-500 text-sm mt-1">AI models training in progress</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Dataset Detail Modal */}
      <AnimatePresence>
        {selectedDataset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedDataset(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-space-black border border-nasa-cyan/30 rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-nasa-blue/30 rounded-xl text-nasa-cyan">
                    {selectedDataset.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedDataset.title}</h3>
                    <p className="text-gray-400">{selectedDataset.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedDataset(null)}
                  className="text-nasa-cyan hover:text-white transition-colors p-2"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Dataset Metrics */}
                <div className="space-y-4">
                  <h4 className="text-nasa-cyan font-mono text-sm">DATASET_METRICS</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedDataset.metrics).map(([key, value]) => (
                      <div key={key} className="bg-space-black/40 rounded-lg p-3 border border-nasa-blue/20">
                        <div className="text-gray-400 text-sm capitalize">{key.replace('_', ' ')}</div>
                        <div className="text-white font-bold text-lg">{String(value)}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dataset Info */}
                <div className="space-y-4">
                  <h4 className="text-nasa-cyan font-mono text-sm">DATASET_INFO</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Records', value: selectedDataset.records.toLocaleString() },
                      { label: 'Organism', value: selectedDataset.organism.toUpperCase() },
                      { label: 'Category', value: selectedDataset.category.toUpperCase() },
                      { label: 'Last Updated', value: selectedDataset.lastUpdated }
                    ].map((info, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-400">{info.label}</span>
                        <span className="text-white font-mono">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h4 className="text-nasa-cyan font-mono text-sm mb-3">RESEARCH_TAGS</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDataset.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-nasa-blue/30 text-nasa-cyan text-sm rounded-full border border-nasa-blue/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-nasa-blue/20">
                <button className="px-4 py-2 border border-nasa-cyan/30 text-nasa-cyan rounded-lg hover:bg-nasa-cyan/10 transition-colors">
                  EXPLORE DATA
                </button>
                <button className="px-4 py-2 bg-nasa-blue text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>EXPORT DATASET</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DataExplorer