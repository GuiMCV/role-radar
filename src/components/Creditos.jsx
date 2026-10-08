import React from 'react'

const Creditos = () => {
  return (
    <div className="flex justify-content-center gap-3 text-xs mb-3">
        <a 
            href="https://www.geoapify.com"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-500 no-underline hover:underline"
        >
            Powered by Geoapify
        </a>
        <span className="text-400">•</span>
        <a 
            href="https://www.openstreetmap.org/copyright" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-500 no-underline hover:underline"
        >
            &copy; OpenStreetMap Contributors
        </a>
    </div>
  )
}

export default Creditos