'use client'

import React from 'react'

const DataExplorer: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-3xl font-bold text-white mb-4">Data Explorer</h2>
      <p className="text-gray-400 text-lg mb-8">
        Advanced data visualization and exploration tools coming soon
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gray-700 p-6 rounded-xl">
          <div className="text-2xl mb-2">📈</div>
          <h3 className="font-semibold text-white mb-2">Trend Analysis</h3>
          <p className="text-gray-400 text-sm">Identify patterns across decades of research</p>
        </div>
        <div className="bg-gray-700 p-6 rounded-xl">
          <div className="text-2xl mb-2">🔬</div>
          <h3 className="font-semibold text-white mb-2">Comparative Studies</h3>
          <p className="text-gray-400 text-sm">Compare effects across different organisms</p>
        </div>
        <div className="bg-gray-700 p-6 rounded-xl">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold text-white mb-2">Statistical Insights</h3>
          <p className="text-gray-400 text-sm">Advanced analytics and correlation discovery</p>
        </div>
      </div>
    </div>
  )
}

export default DataExplorer