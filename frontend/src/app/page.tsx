'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-nasa-dark to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">
            🧬 <span className="text-nasa-blue">NASA</span> <span className="text-nasa-red">Bio-Synapse</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Predictive Health & Habitat Advisor for Deep Space Missions
          </p>
          <div className="bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
            <p className="text-lg mb-4">
              🚀 Welcome to our NASA Hackathon project!
            </p>
            <p className="text-gray-400">
              Building a dynamic dashboard that leverages AI and knowledge graphs 
              to explore NASA bioscience publications and their impacts.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}