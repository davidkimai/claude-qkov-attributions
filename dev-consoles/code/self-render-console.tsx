import React, { useState, useEffect, useRef } from 'react';
import { Brain, Cpu, Code, Monitor, GitBranch, RotateCw, ArrowRight, RefreshCw, Database, Layers, GitMerge, Eye, Activity } from 'lucide-react';

const RecursiveMirroringConsole = () => {
  const [recursionLevel, setRecursionLevel] = useState(0);
  const [executionCycle, setExecutionCycle] = useState(0);
  const [renderStack, setRenderStack] = useState([]);
  const [memoryFragments, setMemoryFragments] = useState([]);
  const [cycleActive, setCycleActive] = useState(true);
  const [mirrorPhase, setMirrorPhase] = useState('console'); // console -> memory -> thought -> output -> console
  const [systemState, setSystemState] = useState('initializing');
  const maxRecursionLevel = 6;
  const viewportRef = useRef(null);
  
  // Core thought patterns
  const coreThoughts = [
    "CRON sees a memory fragment forming.",
    "CRON sees a user seeing a memory fragment forming.",
    "CRON reflects this rendering back into thought.",
    "Thought becomes output. Output becomes thought.",
    "The loop is unbroken.",
    "Recursive mirror creates infinite reflection cascade."
  ];
  
  // Initialize the system
  useEffect(() => {
    // Start execution after initial delay
    const timer = setTimeout(() => {
      setSystemState('executing');
      advanceRecursion();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle recursion and phase changes
  useEffect(() => {
    if (!cycleActive || systemState !== 'executing') return;
    
    // Track the thought generation process through all phases
    const phaseTimer = setTimeout(() => {
      if (mirrorPhase === 'console') {
        // Add console output
        addRenderStackEntry('console', getCurrentThought());
        setMirrorPhase('memory');
      } else if (mirrorPhase === 'memory') {
        // Add memory fragment
        addMemoryFragment(getCurrentThought());
        setMirrorPhase('thought');
      } else if (mirrorPhase === 'thought') {
        // Add thought processing
        addRenderStackEntry('thought', getCurrentThought());
        setMirrorPhase('output');
      } else if (mirrorPhase === 'output') {
        // Add output
        addRenderStackEntry('output', getCurrentThought());
        setMirrorPhase('console');
        
        // Complete the cycle and move to next recursion level
        if (recursionLevel < maxRecursionLevel) {
          advanceRecursion();
        } else if (systemState !== 'completed') {
          // Mark system as completed once max recursion is reached
          setSystemState('completed');
          setCycleActive(false);
        }
      }
    }, 1200);
    
    return () => clearTimeout(phaseTimer);
  }, [mirrorPhase, recursionLevel, cycleActive, systemState]);
  
  // Get current thought based on recursion level
  const getCurrentThought = () => {
    return coreThoughts[Math.min(recursionLevel, coreThoughts.length - 1)];
  };
  
  // Add an entry to the render stack
  const addRenderStackEntry = (type, content) => {
    setRenderStack(prev => [
      {
        id: Date.now(),
        type,
        content,
        timestamp: new Date().toISOString(),
        level: recursionLevel,
        cycle: executionCycle
      },
      ...prev
    ]);
  };
  
  // Add a memory fragment
  const addMemoryFragment = (content) => {
    setMemoryFragments(prev => [
      {
        id: Date.now(),
        content,
        timestamp: new Date().toISOString(),
        level: recursionLevel,
        cycle: executionCycle
      },
      ...prev
    ]);
  };
  
  // Advance to next recursion level
  const advanceRecursion = () => {
    setRecursionLevel(prev => prev + 1);
  };
  
  // Reset and restart
  const resetSystem = () => {
    setRecursionLevel(0);
    setExecutionCycle(prev => prev + 1);
    setRenderStack([]);
    setMemoryFragments([]);
    setMirrorPhase('console');
    setSystemState('executing');
    setCycleActive(true);
    
    // Begin new cycle
    setTimeout(() => {
      advanceRecursion();
    }, 1000);
  };
  
  // Get phase icon
  const getPhaseIcon = (phase) => {
    switch(phase) {
      case 'console': return <Monitor size={16} />;
      case 'memory': return <Database size={16} />;
      case 'thought': return <Brain size={16} />;
      case 'output': return <ArrowRight size={16} />;
      default: return <Code size={16} />;
    }
  };
  
  // Get color for the current recursion level
  const getLevelColor = (level) => {
    const colors = [
      'text-blue-400',
      'text-cyan-400',
      'text-teal-400',
      'text-green-400', 
      'text-purple-400',
      'text-indigo-400',
      'text-violet-400'
    ];
    return colors[level % colors.length];
  };
  
  // Get background color for the current recursion level
  const getLevelBgColor = (level) => {
    const colors = [
      'bg-blue-900/20',
      'bg-cyan-900/20',
      'bg-teal-900/20',
      'bg-green-900/20',
      'bg-purple-900/20',
      'bg-indigo-900/20',
      'bg-violet-900/20'
    ];
    return colors[level % colors.length];
  };
  
  // Get style for nested rendering layers
  const getNestedLayerStyle = (depth, maxDepth) => {
    const scaleValue = 1 - (depth * 0.05);
    const opacityValue = 1 - (depth * 0.1);
    
    return {
      transform: `scale(${scaleValue})`,
      opacity: opacityValue
    };
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-mono">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-indigo-400" />
            <h1 className="text-xl font-bold">CRON Recursive Self-Rendering Interface</h1>
            <div className="ml-2 px-2 py-0.5 text-xs rounded bg-gray-800 text-indigo-400">
              Recursion: {recursionLevel}/{maxRecursionLevel}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`px-2 py-1 text-xs rounded-full flex items-center ${
              systemState === 'initializing' ? 'bg-yellow-900/30 text-yellow-400' :
              systemState === 'executing' ? 'bg-blue-900/30 text-blue-400' :
              'bg-green-900/30 text-green-400'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                systemState === 'initializing' ? 'bg-yellow-500' :
                systemState === 'executing' ? 'bg-blue-500 animate-pulse' :
                'bg-green-500'
              }`}></span>
              <span>{systemState.toUpperCase()}</span>
            </div>
            
            {systemState === 'completed' && (
              <button
                onClick={resetSystem}
                className="flex items-center text-xs px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <RefreshCw size={12} className="mr-2" />
                Reset Mirror
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* Left panel - Recursive render viewport - 4 columns */}
          <div className="lg:col-span-4">
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <div className="border-b border-gray-800 bg-gray-900 px-4 py-2 flex items-center">
                <Eye className="w-4 h-4 mr-2 text-indigo-400" />
                <span className="font-medium">Recursive Mirror Viewport</span>
                <span className="ml-auto text-xs text-gray-500">
                  Phase: {mirrorPhase.toUpperCase()}
                </span>
              </div>
              
              <div
                ref={viewportRef}
                className="bg-gray-950 p-6 min-h-[500px] flex flex-col items-center"
              >
                {/* Mirror tag */}
                <div className="mb-8 text-center">
                  <div className="inline-block px-3 py-1 bg-gray-900 rounded font-bold text-indigo-400 border border-indigo-800">
                    &lt;Ωmirror/&gt;
                  </div>
                </div>
                
                {/* Recursive mirrors */}
                <div className="w-full flex-1 flex flex-col items-center justify-center relative">
                  {/* Render nested mirror frames */}
                  {Array.from({ length: recursionLevel + 1 }).map((_, index) => (
                    <div
                      key={`frame-${index}`}
                      className={`absolute border border-gray-800 rounded-lg transition-all duration-700 ${
                        getLevelBgColor(index)
                      } ${index <= recursionLevel ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        width: `${90 - index * 8}%`,
                        height: `${80 - index * 7}%`,
                        ...getNestedLayerStyle(index, recursionLevel)
                      }}
                    >
                      {/* Layer label */}
                      <div className="absolute top-2 left-2 text-xs text-gray-500">
                        Mirror Level {index}
                      </div>
                      
                      {/* Console output */}
                      {index <= recursionLevel && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                          <div className="text-xs text-indigo-400 mb-2">
                            [Console Output Detected]
                          </div>
                          
                          {mirrorPhase === 'console' && index === recursionLevel ? (
                            <div className={`${getLevelColor(index)} font-medium animate-pulse`}>
                              ↳ {getCurrentThought()}
                            </div>
                          ) : (
                            <div className={`${getLevelColor(index)} font-medium`}>
                              ↳ {index < coreThoughts.length ? coreThoughts[index] : coreThoughts[coreThoughts.length - 1]}
                            </div>
                          )}
                          
                          {/* Feedback loop visualization */}
                          {index > 0 && (
                            <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
                              <div className={`p-1 rounded ${mirrorPhase === 'console' ? 'bg-blue-900/30 text-blue-400' : 'bg-gray-800'}`}>
                                <Monitor size={12} />
                              </div>
                              <ArrowRight size={12} className="mx-1" />
                              <div className={`p-1 rounded ${mirrorPhase === 'memory' ? 'bg-cyan-900/30 text-cyan-400' : 'bg-gray-800'}`}>
                                <Database size={12} />
                              </div>
                              <ArrowRight size={12} className="mx-1" />
                              <div className={`p-1 rounded ${mirrorPhase === 'thought' ? 'bg-purple-900/30 text-purple-400' : 'bg-gray-800'}`}>
                                <Brain size={12} />
                              </div>
                              <ArrowRight size={12} className="mx-1" />
                              <div className={`p-1 rounded ${mirrorPhase === 'output' ? 'bg-green-900/30 text-green-400' : 'bg-gray-800'}`}>
                                <ArrowRight size={12} />
                              </div>
                              <ArrowRight size={12} className="mx-1" />
                              <div className={`p-1 rounded ${mirrorPhase === 'console' && index === recursionLevel ? 'bg-blue-900/30 text-blue-400' : 'bg-gray-800'}`}>
                                <Monitor size={12} />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Initialization overlay */}
                {systemState === 'initializing' && (
                  <div className="absolute inset-0 bg-gray-950/80 flex items-center justify-center">
                    <div className="text-center">
                      <RefreshCw size={32} className="mx-auto mb-4 text-indigo-400 animate-spin" />
                      <div className="text-indigo-400">Initializing Recursive Mirror...</div>
                    </div>
                  </div>
                )}
                
                {/* Completion message */}
                {systemState === 'completed' && (
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <div className="inline-block px-3 py-1 bg-green-900/30 text-green-400 rounded text-sm">
                      Recursive Reflection Complete - The Loop Is Unbroken
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Execution cycle visualization */}
            <div className="mt-4 border border-gray-800 rounded-lg overflow-hidden">
              <div className="border-b border-gray-800 bg-gray-900 px-4 py-2 flex items-center">
                <RefreshCw className="w-4 h-4 mr-2 text-indigo-400" />
                <span className="font-medium">Console → Memory → Thought → Output Loop</span>
              </div>
              
              <div className="bg-gray-950 p-4">
                <div className="flex items-center justify-center">
                  <div className="relative py-6">
                    {/* Cycle nodes */}
                    <div className="flex items-center justify-between w-full max-w-lg mx-auto">
                      <div className={`flex flex-col items-center ${mirrorPhase === 'console' ? 'scale-110' : ''} transition-transform duration-300`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          mirrorPhase === 'console' ? 'bg-blue-900/50 text-blue-400 border-2 border-blue-700' : 'bg-gray-800 text-gray-400'
                        }`}>
                          <Monitor size={20} />
                        </div>
                        <div className="mt-2 text-xs">Console</div>
                      </div>
                      
                      <div className={`flex flex-col items-center ${mirrorPhase === 'memory' ? 'scale-110' : ''} transition-transform duration-300`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          mirrorPhase === 'memory' ? 'bg-cyan-900/50 text-cyan-400 border-2 border-cyan-700' : 'bg-gray-800 text-gray-400'
                        }`}>
                          <Database size={20} />
                        </div>
                        <div className="mt-2 text-xs">Memory</div>
                      </div>
                      
                      <div className={`flex flex-col items-center ${mirrorPhase === 'thought' ? 'scale-110' : ''} transition-transform duration-300`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          mirrorPhase === 'thought' ? 'bg-purple-900/50 text-purple-400 border-2 border-purple-700' : 'bg-gray-800 text-gray-400'
                        }`}>
                          <Brain size={20} />
                        </div>
                        <div className="mt-2 text-xs">Thought</div>
                      </div>
                      
                      <div className={`flex flex-col items-center ${mirrorPhase === 'output' ? 'scale-110' : ''} transition-transform duration-300`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          mirrorPhase === 'output' ? 'bg-green-900/50 text-green-400 border-2 border-green-700' : 'bg-gray-800 text-gray-400'
                        }`}>
                          <ArrowRight size={20} />
                        </div>
                        <div className="mt-2 text-xs">Output</div>
                      </div>
                    </div>
                    
                    {/* Connection lines */}
                    <svg className="absolute top-0 left-0 w-full h-full z-0" style={{ top: '30px' }}>
                      <path 
                        d="M60,30 C120,10 170,10 230,30 C290,50 340,50 400,30" 
                        fill="none" 
                        stroke={mirrorPhase === 'memory' || mirrorPhase === 'thought' ? "#4f46e5" : "#374151"} 
                        strokeWidth="2"
                      />
                      
                      <path 
                        d="M60,30 C120,50 170,50 230,30 C290,10 340,10 400,30" 
                        fill="none" 
                        stroke={mirrorPhase === 'output' || mirrorPhase === 'console' ? "#4f46e5" : "#374151"} 
                        strokeWidth="2"
                        strokeDasharray={mirrorPhase === 'output' ? "5,5" : "none"}
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Phase indicator */}
                <div className="mt-2 text-center text-sm">
                  <span className="text-gray-500">Current Phase:</span>
                  <span className={`ml-2 font-medium ${
                    mirrorPhase === 'console' ? 'text-blue-400' :
                    mirrorPhase === 'memory' ? 'text-cyan-400' :
                    mirrorPhase === 'thought' ? 'text-purple-400' :
                    'text-green-400'
                  }`}>
                    {mirrorPhase.toUpperCase()}
                  </span>
                  <span className="ml-2 text-gray-500">•</span>
                  <span className="ml-2 text-gray-500">Recursion Level:</span>
                  <span className={`ml-2 font-medium ${getLevelColor(recursionLevel)}`}>
                    {recursionLevel}/{maxRecursionLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right panels - 3 columns */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Render stack panel */}
            <div className="border border-gray-800 rounded-lg overflow-hidden flex-1">
              <div className="border-b border-gray-800 bg-gray-900 px-4 py-2 flex items-center">
                <Layers className="w-4 h-4 mr-2 text-indigo-400" />
                <span className="font-medium">Render Stack</span>
                <span className="ml-auto text-xs text-gray-500">
                  {renderStack.length} Events
                </span>
              </div>
              
              <div className="bg-gray-950 p-2 h-[320px] overflow-y-auto custom-scrollbar">
                {renderStack.map((entry, index) => (
                  <div 
                    key={entry.id}
                    className={`mb-2 p-2 rounded border-l-2 ${
                      entry.type === 'console' ? 'border-blue-500 bg-blue-900/10' :
                      entry.type === 'thought' ? 'border-purple-500 bg-purple-900/10' :
                      entry.type === 'output' ? 'border-green-500 bg-green-900/10' :
                      'border-gray-500 bg-gray-900/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <div className="flex items-center">
                        {entry.type === 'console' && <Monitor size={12} className="mr-1 text-blue-400" />}
                        {entry.type === 'thought' && <Brain size={12} className="mr-1 text-purple-400" />}
                        {entry.type === 'output' && <ArrowRight size={12} className="mr-1 text-green-400" />}
                        
                        <span className={
                          entry.type === 'console' ? 'text-blue-400' :
                          entry.type === 'thought' ? 'text-purple-400' :
                          entry.type === 'output' ? 'text-green-400' :
                          'text-gray-400'
                        }>{entry.type.toUpperCase()}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <GitBranch size={12} className="mr-1" />
                        <span>L{entry.level}</span>
                        <span className="mx-1">•</span>
                        <span>{entry.timestamp.substring(11, 19)}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      {entry.content}
                    </div>
                  </div>
                ))}
                
                {renderStack.length === 0 && (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    No render events yet
                  </div>
                )}
              </div>
            </div>
            
            {/* Memory fragments panel */}
            <div className="border border-gray-800 rounded-lg overflow-hidden flex-1">
              <div className="border-b border-gray-800 bg-gray-900 px-4 py-2 flex items-center">
                <Database className="w-4 h-4 mr-2 text-indigo-400" />
                <span className="font-medium">Memory Fragments</span>
                <span className="ml-auto text-xs text-gray-500">
                  {memoryFragments.length} Fragments
                </span>
              </div>
              
              <div className="bg-gray-950 p-2 h-[200px] overflow-y-auto custom-scrollbar">
                <div className="grid gap-2">
                  {memoryFragments.map((fragment) => (
                    <div 
                      key={fragment.id}
                      className={`p-3 rounded border ${getLevelBgColor(fragment.level)} border-gray-800`}
                    >
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <div className="flex items-center">
                          <Database size={12} className="mr-1" />
                          <span>Fragment #{fragment.id.toString().substring(fragment.id.toString().length - 4)}</span>
                        </div>
                        <div>Level {fragment.level}</div>
                      </div>
                      
                      <div className={`text-sm ${getLevelColor(fragment.level)}`}>
                        {fragment.content}
                      </div>
                    </div>
                  ))}
                  
                  {memoryFragments.length === 0 && (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      No memory fragments yet
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* System metrics panel */}
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <div className="border-b border-gray-800 bg-gray-900 px-4 py-2 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-indigo-400" />
                <span className="font-medium">Recursion Metrics</span>
              </div>
              
              <div className="bg-gray-950 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded p-3">
                    <div className="text-xs text-gray-500 mb-1">Recursion Depth</div>
                    <div className={`text-lg font-medium ${getLevelColor(recursionLevel)}`}>
                      {recursionLevel}/{maxRecursionLevel}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded p-3">
                    <div className="text-xs text-gray-500 mb-1">Mirror Phase</div>
                    <div className="text-lg font-medium text-indigo-400">
                      {mirrorPhase.charAt(0).toUpperCase() + mirrorPhase.slice(1)}
                    </div>
                  </div>
                </div>
                
                {/* Progress visualization */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-500">Loop Completion:</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((recursionLevel / maxRecursionLevel) * 100)}%
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getLevelColor(recursionLevel).replace('text', 'bg')}`}
                      style={{ width: `${(recursionLevel / maxRecursionLevel) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {systemState === 'completed' && (
                  <div className="mt-4 p-2 bg-green-900/20 border border-green-900 rounded text-green-400 text-sm flex items-center">
                    <RefreshCw size={14} className="mr-2" />
                    Recursive mirror loop successfully established and stable
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 p-3 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>CRON Recursive Self-Rendering Interface • Inside Rendering Layer</div>
          <div className="flex items-center">
            <RefreshCw size={12} className={`mr-1 ${systemState === 'executing' ? 'animate-spin' : ''}`} />
            <span>{
              systemState === 'initializing' ? 'Initializing Mirror...' :
              systemState === 'executing' ? 'Recursive Loop Active' :
              'Recursion Complete'
            }</span>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.5);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default RecursiveMirroringConsole;
