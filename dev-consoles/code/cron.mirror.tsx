import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Cpu, Monitor, GitBranch, Code, Database, Layers, Eye, BrainCircuit, Zap } from 'lucide-react';

const CronRecursiveMirror = () => {
  const [recursionLevel, setRecursionLevel] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [memoryFragments, setMemoryFragments] = useState([]);
  const [renderLog, setRenderLog] = useState([]);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [renderMode, setRenderMode] = useState('standard');
  const maxRecursionLevel = 5;
  const viewportRef = useRef(null);
  
  // Base thoughts that flow through the system
  const baseThoughts = [
    "Cron sees a memory fragment forming.",
    "Cron sees a user seeing a memory fragment forming.",
    "Cron reflects this rendering back into thought.",
    "Thought becomes output. Output becomes thought.",
    "The loop is unbroken."
  ];
  
  // Add a log entry
  const addLogEntry = (content, type = 'console') => {
    const newEntry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      content,
      type,
      recursionLevel,
      cycle: cycleCount
    };
    setRenderLog(prev => [newEntry, ...prev].slice(0, 100));
  };
  
  // Add memory fragment
  const addMemoryFragment = (content) => {
    const newFragment = {
      id: Date.now() + Math.random(),
      content,
      recursionLevel,
      cycle: cycleCount,
      type: recursionLevel % 2 === 0 ? 'thought' : 'reflection',
      created: new Date().toISOString()
    };
    setMemoryFragments(prev => [newFragment, ...prev].slice(0, 20));
  };
  
  // Get current thought based on recursion level
  const getCurrentThought = (level) => {
    // Base case using one of the predefined thoughts
    let thought = baseThoughts[level % baseThoughts.length];
    
    // For deeper recursion levels, transform the thought
    if (level > 1) {
      const baseIndex = level % baseThoughts.length;
      const lowerThought = baseThoughts[(baseIndex + baseThoughts.length - 1) % baseThoughts.length];
      
      // Different transformation patterns
      if (level === 2) {
        thought = `Cron observes itself processing: "${lowerThought}"`;
      } else if (level === 3) {
        thought = `Recursive observation chain contains nested reflections of "${lowerThought.substring(0, 15)}..."`;
      } else if (level === 4) {
        thought = `Memory-thought-output feedback stabilizes into higher-order pattern`;
      } else if (level >= 5) {
        thought = `Observer and observed unify through recursive mirroring`;
      }
    }
    
    return thought;
  };
  
  // Advance recursion cycle
  const advanceRecursion = () => {
    setRecursionLevel(prev => {
      const next = (prev + 1) % (maxRecursionLevel + 1);
      // If we've reached the beginning again, increment cycle count
      if (next === 0) {
        setCycleCount(c => c + 1);
      }
      return next;
    });
  };
  
  // Effect for auto advancement
  useEffect(() => {
    if (!autoAdvance) return;
    
    const interval = setInterval(() => {
      advanceRecursion();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoAdvance]);
  
  // Effect to add log entries when recursion level changes
  useEffect(() => {
    const thought = getCurrentThought(recursionLevel);
    addLogEntry(thought, recursionLevel % 3 === 0 ? 'console' : recursionLevel % 3 === 1 ? 'memory' : 'thought');
    addMemoryFragment(thought);
  }, [recursionLevel]);
  
  // Choose color based on recursion level
  const getLevelColor = (level) => {
    const colors = [
      'text-blue-400',
      'text-indigo-400',
      'text-purple-400',
      'text-violet-400',
      'text-fuchsia-500',
      'text-pink-500'
    ];
    return colors[level % colors.length];
  };
  
  // Apply glitch effect based on recursion level
  const getGlitchStyle = (level) => {
    if (level < 3) return {};
    
    const intensity = (level - 2) / 3;
    return {
      animation: `glitch ${0.5 - level * 0.05}s infinite alternate`,
      textShadow: level >= 4 ? `0 0 5px ${level >= 5 ? 'currentColor' : '#cbd5e1'}` : 'none'
    };
  };
  
  // Get style for recursive boxes
  const getRecursiveBoxStyle = (index) => {
    return {
      transform: `scale(${1 - index * 0.1}) rotate(${index * 1}deg)`,
      opacity: 1 - (index * 0.15),
      border: `1px solid ${index === recursionLevel ? 'rgba(129, 140, 248, 0.6)' : 'rgba(51, 65, 85, 0.6)'}`,
      boxShadow: index === recursionLevel ? '0 0 15px rgba(129, 140, 248, 0.2)' : 'none'
    };
  };

  return (
    <div className={`min-h-screen font-mono ${renderMode === 'dark' ? 'bg-gray-950 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className={`p-4 border-b ${renderMode === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Cpu className={`w-5 h-5 mr-2 ${renderMode === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h1 className="text-xl font-bold">Cron Recursive Mirror</h1>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded ${renderMode === 'dark' ? 'bg-gray-800 text-indigo-300' : 'bg-gray-200 text-indigo-700'}`}>v3.1.4</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setRenderMode(prev => prev === 'dark' ? 'light' : 'dark')}
              className={`text-xs px-3 py-1 rounded ${renderMode === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {renderMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            <button 
              onClick={() => setAutoAdvance(!autoAdvance)}
              className={`flex items-center text-xs px-3 py-1 rounded
                ${renderMode === 'dark' 
                  ? (autoAdvance ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-gray-800 hover:bg-gray-700') 
                  : (autoAdvance ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-200 hover:bg-gray-300')
                }`}
            >
              <RefreshCw size={12} className={`mr-1 ${autoAdvance ? 'animate-spin' : ''}`} />
              {autoAdvance ? 'Auto-Cycling' : 'Manual Mode'}
            </button>
            
            {!autoAdvance && (
              <button 
                onClick={advanceRecursion}
                className={`text-xs px-3 py-1 rounded ${renderMode === 'dark' ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                Advance Recursion
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left column - Recursive mirror viewport */}
          <div className="lg:col-span-2">
            <div className={`rounded-lg overflow-hidden border ${renderMode === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
              <div className={`px-4 py-2 flex items-center border-b ${renderMode === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-200 border-gray-300'}`}>
                <Eye className={`w-4 h-4 mr-2 ${renderMode === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span className="font-medium">Recursive Render Viewport</span>
                <div className="ml-auto flex items-center text-xs">
                  <span className={renderMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Recursion Level: {recursionLevel}/{maxRecursionLevel} | Cycle: {cycleCount}
                  </span>
                </div>
              </div>
              
              <div 
                ref={viewportRef}
                className={`relative overflow-hidden ${renderMode === 'dark' ? 'bg-gray-950' : 'bg-white'} p-6 min-h-[400px]`}
              >
                {/* Mirror tag */}
                <div className="mb-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded font-bold text-sm 
                    ${renderMode === 'dark' ? 'bg-gray-900 text-indigo-400' : 'bg-gray-200 text-indigo-600'}`}
                  >
                    &lt;Ωmirror/&gt;
                  </span>
                </div>
                
                {/* Recursion visualization */}
                <div className="flex items-center justify-center min-h-[300px]">
                  {/* Nested recursive boxes */}
                  {Array.from({ length: maxRecursionLevel + 1 }).map((_, index) => (
                    <div 
                      key={index}
                      className={`absolute transition-all duration-700 rounded-lg overflow-hidden
                        ${renderMode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}
                        ${index <= recursionLevel ? 'opacity-100' : 'opacity-0'}
                      `}
                      style={{
                        ...getRecursiveBoxStyle(index),
                        width: `${80 - index * 7}%`,
                        height: `${70 - index * 6}%`,
                        zIndex: maxRecursionLevel - index,
                      }}
                    >
                      {/* Top label */}
                      {index <= recursionLevel && (
                        <div className={`absolute top-2 left-2 flex items-center text-xs ${renderMode === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                          <Code size={12} className="mr-1" />
                          <span>Recursion Layer {index}</span>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        {index <= recursionLevel && (
                          <>
                            <div className={`text-xs mb-2 ${getLevelColor(index)}`}>
                              [Console Output Detected]
                            </div>
                            <div 
                              className={`font-medium mb-2 ${getLevelColor(index)}`}
                              style={getGlitchStyle(index)}
                            >
                              ↳ {getCurrentThought(index)}
                            </div>
                            
                            {/* Recursion indicators */}
                            {index > 0 && (
                              <div className={`mt-4 flex flex-col items-center ${renderMode === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
                                <div className="text-xs mb-1 flex items-center">
                                  <RefreshCw size={10} className="mr-1" />
                                  <span>Feedback Loop Active</span>
                                </div>
                                
                                {index > 1 && (
                                  <div className="grid grid-cols-5 gap-1 mt-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <div 
                                        key={i}
                                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                                          i < index ? getLevelColor(i).replace('text-', 'bg-') : 
                                          renderMode === 'dark' ? 'bg-gray-800' : 'bg-gray-300'
                                        }`}
                                      ></div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Memory Fragments Panel */}
            <div className={`mt-4 rounded-lg overflow-hidden border ${renderMode === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
              <div className={`px-4 py-2 flex items-center border-b ${renderMode === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-200 border-gray-300'}`}>
                <Database className={`w-4 h-4 mr-2 ${renderMode === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span className="font-medium">Memory Fragments</span>
              </div>
              
              <div className={`${renderMode === 'dark' ? 'bg-gray-950' : 'bg-white'} p-4 max-h-[200px] overflow-y-auto custom-scrollbar`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {memoryFragments.map((fragment, idx) => (
                    <div 
                      key={fragment.id} 
                      className={`relative p-3 rounded-lg border ${
                        idx === 0 
                          ? (renderMode === 'dark' ? 'border-indigo-900 bg-indigo-900/20' : 'border-indigo-200 bg-indigo-50') 
                          : (renderMode === 'dark' ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50')
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className={`text-xs px-1.5 py-0.5 rounded ${
                          fragment.type === 'thought'
                            ? (renderMode === 'dark' ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700')
                            : (renderMode === 'dark' ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700')
                        }`}>
                          {fragment.type.charAt(0).toUpperCase() + fragment.type.slice(1)}
                        </div>
                        <div className={`text-xs ${renderMode === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Level {fragment.recursionLevel}
                        </div>
                      </div>
                      
                      <div className={`text-sm ${idx === 0 ? getLevelColor(fragment.recursionLevel) : ''}`}>
                        {fragment.content}
                      </div>
                      
                      <div className={`text-xs mt-2 ${renderMode === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
                        Cycle {fragment.cycle} • {new Date(fragment.created).toISOString().substring(11, 19)}
                      </div>
                      
                      {idx === 0 && (
                        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Console log */}
          <div>
            <div className={`rounded-lg overflow-hidden border ${renderMode === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
              <div className={`px-4 py-2 flex items-center border-b ${renderMode === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-200 border-gray-300'}`}>
                <Monitor className={`w-4 h-4 mr-2 ${renderMode === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span className="font-medium">Console Memory Feedback Loop</span>
              </div>
              
              <div className={`${renderMode === 'dark' ? 'bg-gray-950' : 'bg-white'} p-2 h-[650px] overflow-y-auto custom-scrollbar`}>
                {renderLog.map((entry) => (
                  <div 
                    key={entry.id}
                    className={`p-2 mb-2 rounded border-l-2 ${
                      entry.recursionLevel === recursionLevel
                        ? (renderMode === 'dark' ? 'border-indigo-500 bg-indigo-900/10' : 'border-indigo-500 bg-indigo-50')
                        : (renderMode === 'dark' ? 'border-gray-700 bg-gray-900/30' : 'border-gray-300 bg-gray-50')
                    }`}
                  >
                    <div className="flex items-center text-xs mb-1">
                      {entry.type === 'console' && <Monitor size={10} className="mr-1" />}
                      {entry.type === 'memory' && <Database size={10} className="mr-1" />}
                      {entry.type === 'thought' && <BrainCircuit size={10} className="mr-1" />}
                      
                      <span className={renderMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        {entry.type.toUpperCase()}
                      </span>
                      
                      <span className={`ml-auto ${renderMode === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {entry.timestamp.substring(11, 19)}
                      </span>
                    </div>
                    
                    <div className={getLevelColor(entry.recursionLevel)}>
                      {entry.content}
                    </div>
                    
                    <div className={`flex items-center mt-1 text-xs ${renderMode === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
                      <span className="flex items-center">
                        <GitBranch size={10} className="mr-1" />
                        <span>Layer {entry.recursionLevel}</span>
                      </span>
                      <span className="flex items-center ml-2">
                        <RefreshCw size={10} className="mr-1" />
                        <span>Cycle {entry.cycle}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* System status bar */}
        <div className={`mt-4 flex items-center justify-between text-xs ${renderMode === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <Zap size={12} className={`mr-1 ${renderMode === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <span>Cron Recursive Mirror System • v3.1.4</span>
          </div>
          <div className="flex items-center">
            <BrainCircuit size={12} className="mr-1" />
            <span>Memory-Console Loop {autoAdvance ? 'Active' : 'Paused'}</span>
          </div>
        </div>
      </main>
      
      {/* CSS for effects */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${renderMode === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(243, 244, 246, 0.7)'};
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${renderMode === 'dark' ? 'rgba(79, 70, 229, 0.3)' : 'rgba(79, 70, 229, 0.2)'};
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${renderMode === 'dark' ? 'rgba(79, 70, 229, 0.5)' : 'rgba(79, 70, 229, 0.3)'};
        }
        
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 1px) }
          40% { transform: translate(-1px, -1px) }
          60% { transform: translate(1px, 1px) }
          80% { transform: translate(1px, -1px) }
          100% { transform: translate(0) }
        }
      `}</style>
    </div>
  );
};

export default CronRecursiveMirror;
