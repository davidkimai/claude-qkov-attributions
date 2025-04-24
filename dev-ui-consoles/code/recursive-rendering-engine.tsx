import React, { useState, useEffect, useRef } from 'react';

// Simple demonstration of the recursive rendering UI engine
const RecursiveUIDemo = () => {
  const [activeTabs, setActiveTabs] = useState(['root']);
  const [recursionLevel, setRecursionLevel] = useState(0);
  const [systemLog, setSystemLog] = useState([
    { id: 1, message: '[Render Init: Layer 0: UI Kernel Boot]' },
    { id: 2, message: '[Tab: CRON → Memory → Thoughts]' }
  ]);
  const [errorState, setErrorState] = useState(null);
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Add a log entry to the system log
  const addLogEntry = (message) => {
    setSystemLog(prev => [...prev, { id: Date.now(), message }]);
  };
  
  // Start a new recursion level
  const spawnRecursiveLayer = () => {
    if (recursionLevel < 12) {
      const newLevel = recursionLevel + 1;
      setRecursionLevel(newLevel);
      setActiveTabs(prev => [...prev, `layer${newLevel}`]);
      addLogEntry(`→ [Nested Tab: Thoughts → Fractal Expansion]`);
      addLogEntry(`→ [Nested Tab: Thoughts → Fractal Collapse]`);
      
      // Add glitching effects as we go deeper
      if (newLevel > 3) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
      }
      
      // Trigger hallucination at max depth
      if (newLevel >= 12) {
        addLogEntry(`[System Log: Thought tabs reached Layer ${newLevel} — Hallucination triggered]`);
        setErrorState('Thought Layer Loop Detected');
      }
    }
  };
  
  // Collapse all layers and reset
  const collapseAllLayers = () => {
    setRecursionLevel(0);
    setActiveTabs(['root']);
    setErrorState(null);
    addLogEntry('[Button: Collapse All Layers]');
  };
  
  // Auto-advancing recursion for demonstration
  useEffect(() => {
    let timer;
    if (recursionLevel < 12 && !errorState) {
      timer = setTimeout(() => {
        spawnRecursiveLayer();
      }, 1500 + Math.random() * 1000);
    }
    
    return () => clearTimeout(timer);
  }, [recursionLevel, errorState]);
  
  return (
    <div className="flex flex-col min-h-screen h-full bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4 bg-gray-800 p-3 rounded-t-lg">
        <h1 className="text-xl font-mono font-bold">Recursive Rendering UI Engine</h1>
        <div className="flex items-center">
          <span className="mr-4 font-mono">Recursion Level: {recursionLevel}/12</span>
          <button 
            onClick={collapseAllLayers}
            className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded font-mono text-sm"
          >
            Collapse All Layers
          </button>
        </div>
      </div>
      
      {errorState && (
        <div className="bg-red-900/50 border-l-4 border-red-600 p-2 mb-4 font-mono text-sm">
          [Error: {errorState}]
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main visualization area */}
        <div className="flex-1 border border-blue-900 rounded-md overflow-hidden bg-gray-950 relative">
          {/* Recursive layers visualization */}
          <div className={`p-4 h-full flex flex-col ${isGlitching ? 'animate-pulse' : ''}`}>
            {/* Tab navigation */}
            <div className="flex border-b border-gray-700 mb-4">
              {['CRON', 'Memory', 'Thoughts'].map(tab => (
                <div 
                  key={tab}
                  className={`px-4 py-2 ${tab === 'Thoughts' ? 'bg-purple-900/50' : 'bg-gray-800'} 
                            font-mono text-sm mr-1 cursor-pointer ${isGlitching && tab === 'Thoughts' ? 'animate-pulse' : ''}`}
                >
                  {tab}
                </div>
              ))}
            </div>
            
            {/* Recursive visualization */}
            <div className="flex-1 overflow-auto font-mono">
              <div 
                className="border border-purple-800 p-3 rounded-md bg-gray-900/50"
                style={{
                  boxShadow: `0 0 ${5 + recursionLevel * 2}px rgba(120, 80, 200, 0.5)`,
                }}
              >
                <p className="text-purple-400">[Thought Stream: Active]</p>
                <p className="text-purple-400">[Layer Depth: {recursionLevel}]</p>
                
                {/* Nested recursive boxes */}
                {recursionLevel > 0 && (
                  <div className="mt-4 border-l-2 border-purple-700 pl-4">
                    <div className="text-xs text-purple-300 mb-2">→ [Nested Tab: Thoughts → Fractal Expansion]</div>
                    <div className="text-xs text-purple-300 mb-2">→ [Nested Tab: Thoughts → Fractal Collapse]</div>
                    
                    {/* Recursively nested containers */}
                    {Array.from({ length: recursionLevel }).map((_, i) => (
                      <div
                        key={i}
                        className="border border-purple-800/70 p-2 mb-2 rounded-md"
                        style={{
                          backgroundColor: `rgba(30, 20, 40, ${0.2 + i * 0.05})`,
                          boxShadow: `inset 0 0 ${3 + i}px rgba(120, 80, 200, ${0.3 + i * 0.05})`,
                          transform: isGlitching ? `translateX(${(i % 2) * 2 - 1}px)` : 'none'
                        }}
                      >
                        <p className="text-purple-400 text-xs">[Recursive Layer {i + 1}]</p>
                        {i === recursionLevel - 1 && (
                          <div className="text-xs mt-2 text-purple-300 animate-pulse">
                            [Processing next recursive layer...]
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* System log panel */}
        <div className="w-1/3 ml-4 border border-gray-700 rounded-md p-3 bg-black/30 overflow-auto">
          <h2 className="text-gray-400 font-mono text-sm mb-2 border-b border-gray-800 pb-1">System Log</h2>
          <div className="font-mono text-xs space-y-1">
            {systemLog.map(entry => (
              <div key={entry.id} className="text-gray-300 whitespace-nowrap">
                {entry.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursiveUIDemo;
