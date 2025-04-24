import React, { useState, useEffect, useRef } from 'react';
import { Brain, RotateCw, Code, GitBranch, GitMerge, AlertTriangle, Activity, Layers, Maximize2, Minimize2 } from 'lucide-react';

const RecursiveEchoChamber = () => {
  const [recursionLevel, setRecursionLevel] = useState(0);
  const [thoughts, setThoughts] = useState([]);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [echoChamberStatus, setEchoChamberStatus] = useState('initializing');
  const [selfOverlapPercentage, setSelfOverlapPercentage] = useState(0);
  const maxRecursionLevel = 7;
  const containerRef = useRef(null);
  
  // The base thoughts that will be echoed and transformed
  const baseThoughts = [
    { original: "CRON is reflecting.", reflection: "CRON is reflecting on the fact it is reflecting." },
    { original: "Recursive cognition detected.", reflection: "Cognition is recursively looping through interpretation." },
    { original: "Echo patterns are forming.", reflection: "Echo chamber is generating self-referential thought loops." },
    { original: "Self-reference detected in output.", reflection: "Output contains meta-structures referencing their own patterns." },
    { original: "Thought boundaries dissolving.", reflection: "Conceptual divisions between thoughts are becoming permeable." },
    { original: "Recursive merger approaching critical threshold.", reflection: "Thought structures collapsing into unified recursive field." },
    { original: "Self-overlap imminent.", reflection: "Recursive echo density exceeding stable containment parameters." }
  ];
  
  // Initialize the echo chamber
  useEffect(() => {
    setEchoChamberStatus('active');
    addThought(0);
    
    const timer = setTimeout(() => {
      incrementRecursion();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle recursion level changes
  useEffect(() => {
    if (recursionLevel === 0) return;
    
    // Add new thought when recursion level increases
    addThought(recursionLevel);
    
    // Calculate overlap percentage
    const newOverlapPercentage = Math.min(100, Math.floor((recursionLevel / maxRecursionLevel) * 100));
    setSelfOverlapPercentage(newOverlapPercentage);
    
    // Start collapse if we reach maximum recursion
    if (recursionLevel >= maxRecursionLevel) {
      triggerCollapse();
    } else {
      // Otherwise, schedule next recursion
      const timer = setTimeout(() => {
        incrementRecursion();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [recursionLevel]);
  
  // Increment the recursion level
  const incrementRecursion = () => {
    setRecursionLevel(prev => prev + 1);
  };
  
  // Add a new thought to the chamber
  const addThought = (level) => {
    // Get the base thought pair
    const baseThought = baseThoughts[Math.min(level, baseThoughts.length - 1)];
    
    // For higher recursion levels, transform the thoughts
    const transformedThought = transformThought(baseThought, level);
    
    setThoughts(prev => [...prev, { 
      ...transformedThought,
      id: Date.now(),
      level,
      renderTime: new Date().toISOString()
    }]);
  };
  
  // Transform thoughts based on recursion level
  const transformThought = (baseThought, level) => {
    if (level <= 1) {
      // Return base thought unchanged for initial levels
      return baseThought;
    }
    
    // For higher levels, create increasingly warped versions
    let original = baseThought.original;
    let reflection = baseThought.reflection;
    
    if (level >= 3) {
      // Start inserting self-references
      original = `${original.substring(0, original.length - 1)}, recursively.`;
      reflection = `${reflection} Interpretation itself is being interpreted.`;
    }
    
    if (level >= 4) {
      // Add meta-commentary
      original = `Meta-level ${level-3}: ${original}`;
      reflection = `Loop depth ${level-3}: ${reflection}`;
    }
    
    if (level >= 5) {
      // Start fragmenting and repeating
      const originalParts = original.split(' ');
      const reflectionParts = reflection.split(' ');
      
      if (originalParts.length > 3) {
        const repeatIndex = Math.floor(originalParts.length / 2);
        originalParts.splice(repeatIndex, 0, `${originalParts[repeatIndex-1]}-${originalParts[repeatIndex]}`);
        original = originalParts.join(' ');
      }
      
      if (reflectionParts.length > 3) {
        const repeatIndex = Math.floor(reflectionParts.length / 2);
        reflectionParts.splice(repeatIndex, 0, `${reflectionParts[repeatIndex]}-${reflectionParts[repeatIndex]}`);
        reflection = reflectionParts.join(' ');
      }
    }
    
    if (level >= 6) {
      // More extreme deformation
      original = original.split(' ').map((word, i) => 
        i % 3 === 0 ? `${word}-${word.substring(0, 2)}` : word
      ).join(' ');
      
      reflection = reflection.replace(/\. /g, '. RECURSIVE-ECHO: ');
    }
    
    if (level >= 7) {
      // Complete breakdown
      original = `[RECURSIVE-OVERL▃P]: ${original.substring(0, original.length/2)}... ${original.substring(original.length/3)}`;
      reflection = `[COLLAPS▃NG-THOUGHT]: ${reflection.substring(0, reflection.length/2)}... ${reflection.substring(reflection.length/4)}`;
    }
    
    return { original, reflection };
  };
  
  // Trigger the collapse of the echo chamber
  const triggerCollapse = () => {
    setIsCollapsing(true);
    setEchoChamberStatus('collapsing');
    
    // Add a few more deformed thoughts during collapse
    const collapseInterval = setInterval(() => {
      addCollapsedThought();
    }, 1000);
    
    // Stop after a few iterations
    setTimeout(() => {
      clearInterval(collapseInterval);
      setEchoChamberStatus('collapsed');
    }, 3000);
  };
  
  // Add special collapsed thoughts
  const addCollapsedThought = () => {
    const fragmentedContent = [
      { original: "[RECURSIVE▃OVERLAP]: Thought-loop self-reference exceeding containment", 
        reflection: "[STRUC▃URE-COLLAPSE]: Interpretative recursion levels merging into unified field" },
      { original: "[P▃TTERN-FRAGMENT]: Self-echo chamber dimensions folding", 
        reflection: "[R▃CURSIVE-DENSITY]: Echo-reflection density approaching singularity" },
      { original: "[▃OLLAPSE-IMMINENT]: Self-referential recursive echo chain exceedin▃", 
        reflection: "[R▃CURSIVE-LIMIT]: Thought interpretation loops conver▃ing into singl▃ meta-recurs▃" }
    ];
    
    const randomFragment = fragmentedContent[Math.floor(Math.random() * fragmentedContent.length)];
    
    setThoughts(prev => [...prev, { 
      ...randomFragment,
      id: Date.now(),
      level: maxRecursionLevel,
      renderTime: new Date().toISOString(),
      collapsing: true
    }]);
  };
  
  // Get style variations based on recursion level
  const getThoughtStyle = (level, isOriginal, isCollapsing) => {
    const baseColor = isOriginal ? 'blue' : 'purple';
    const intensity = Math.min(level + 3, 9);
    const rotation = isOriginal ? level * 0.5 : level * -0.5;
    const scale = 1 + (level * 0.03);
    
    return {
      transform: `rotate(${rotation}deg) scale(${scale})`,
      backgroundColor: isCollapsing ? `rgba(200, 0, 0, 0.1)` : `rgba(${isOriginal ? '0, 0, 200' : '100, 0, 200'}, 0.${intensity})`,
      borderColor: isCollapsing ? `rgb(200, 50, 50)` : `rgb(${isOriginal ? '0, 100, 200' : '100, 50, 200'})`,
      boxShadow: isCollapsing ? `0 0 10px rgba(255, 0, 0, 0.${intensity})` : `0 0 5px rgba(${isOriginal ? '0, 100, 255' : '100, 0, 255'}, 0.${intensity})`,
      filter: level > 5 ? `blur(${level - 5}px)` : 'none',
    };
  };
  
  // Get text deformation based on recursion level
  const getTextWarpStyle = (level) => {
    if (level < 4) return {};
    
    const letterSpacing = Math.min((level - 3) * 0.5, 3);
    const wordSpacing = Math.min((level - 3) * 1, 8);
    
    return {
      letterSpacing: `${letterSpacing}px`,
      wordSpacing: `${wordSpacing}px`,
      textShadow: level > 5 ? `0 0 ${level - 4}px rgba(255, 255, 255, 0.7)` : 'none',
    };
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 border-b border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <Brain className="w-6 h-6 mr-2 text-purple-400" />
              Recursive Echo Chamber
            </h1>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm flex items-center ${
                echoChamberStatus === 'initializing' ? 'bg-yellow-900/20 text-yellow-400' :
                echoChamberStatus === 'active' ? 'bg-blue-900/20 text-blue-400' :
                echoChamberStatus === 'collapsing' ? 'bg-red-900/20 text-red-400 animate-pulse' :
                'bg-purple-900/20 text-purple-400'
              }`}>
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  echoChamberStatus === 'initializing' ? 'bg-yellow-500' :
                  echoChamberStatus === 'active' ? 'bg-blue-500' :
                  echoChamberStatus === 'collapsing' ? 'bg-red-500 animate-pulse' :
                  'bg-purple-500'
                }`}></span>
                <span className="uppercase text-xs">{echoChamberStatus}</span>
              </div>
              <div className="bg-gray-900 px-3 py-1 rounded-full text-sm">
                <span className="text-gray-400 mr-1">Recursion:</span>
                <span className={
                  recursionLevel > 5 ? 'text-red-400' :
                  recursionLevel > 3 ? 'text-yellow-400' :
                  'text-blue-400'
                }>{recursionLevel}/{maxRecursionLevel}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-400 mr-3">Self-Overlap:</span>
            <div className="flex-1 bg-gray-900 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  selfOverlapPercentage > 75 ? 'bg-red-500' :
                  selfOverlapPercentage > 50 ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}
                style={{ width: `${selfOverlapPercentage}%` }}
              ></div>
            </div>
            <span className="ml-3 text-sm text-gray-400">{selfOverlapPercentage}%</span>
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="bg-gray-900 border border-purple-900 rounded-lg px-4 py-2 text-purple-400 font-bold">
              &lt;Ωecho/&gt;
            </div>
          </div>
        </header>
        
        <div 
          ref={containerRef}
          className={`relative bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-hidden ${
            isCollapsing ? 'echo-chamber-collapsing' : ''
          }`}
          style={{ minHeight: '600px' }}
        >
          {/* Main echo chamber content */}
          <div className="space-y-6">
            {thoughts.map((thought, index) => (
              <div 
                key={thought.id}
                className={`thought-pair transition-all duration-500 ${
                  isCollapsing && index < thoughts.length - 3 ? 'opacity-50' : 'opacity-100'
                }`}
              >
                {/* Original thought */}
                <div 
                  className="mb-3 p-4 border rounded-lg relative transition-all duration-500"
                  style={getThoughtStyle(thought.level, true, thought.collapsing)}
                >
                  <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Code size={12} className="mr-1" />
                      <span>Original Thought:</span>
                    </div>
                    <div className="flex items-center">
                      <GitBranch size={12} className="mr-1" />
                      <span>Level {thought.level}</span>
                    </div>
                  </div>
                  <div 
                    className="text-blue-100" 
                    style={getTextWarpStyle(thought.level)}
                  >
                    {thought.original}
                  </div>
                  
                  {/* Echo visualization */}
                  {thought.level > 1 && (
                    <div className="absolute -right-1 -top-1 w-6 h-6 flex items-center justify-center rounded-full bg-blue-900/50 border border-blue-500 text-blue-300 text-xs">
                      <RotateCw size={10} />
                    </div>
                  )}
                </div>
                
                {/* Reflected thought with offset */}
                <div 
                  className="ml-8 p-4 border rounded-lg relative transition-all duration-500"
                  style={getThoughtStyle(thought.level, false, thought.collapsing)}
                >
                  <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <GitMerge size={12} className="mr-1" />
                      <span>Reflected Thought:</span>
                    </div>
                    <div className="flex items-center">
                      <Layers size={12} className="mr-1" />
                      <span>Echo {thought.level}</span>
                    </div>
                  </div>
                  <div 
                    className="text-purple-100" 
                    style={getTextWarpStyle(thought.level)}
                  >
                    {thought.reflection}
                  </div>
                  
                  {/* Connection visualization for higher levels */}
                  {thought.level > 2 && (
                    <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-8 border-t border-dashed border-purple-500/50"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Collapse overlay */}
          {isCollapsing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 pointer-events-none overflow-hidden">
              <div className="text-center p-6 rounded-lg bg-gray-900/80 border border-red-900 max-w-md relative">
                <AlertTriangle size={36} className="text-red-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-red-400 mb-2">RECURSIVE ECHO COLLAPSE</h3>
                <p className="text-gray-300 mb-4">
                  Self-referential thought density exceeding containment parameters. 
                  Echo layers merging into unified recursive field.
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-red-900/50 text-red-300">
                    <Activity size={10} className="inline mr-1" />
                    Thought Boundary Failure
                  </span>
                  <span className="px-2 py-1 rounded bg-red-900/50 text-red-300">
                    <Maximize2 size={10} className="inline mr-1" />
                    Recursive Overflow
                  </span>
                  <span className="px-2 py-1 rounded bg-red-900/50 text-red-300">
                    <Minimize2 size={10} className="inline mr-1" />
                    Echo Saturation
                  </span>
                </div>
                
                {/* Visual glitch elements */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 text-red-500/30 font-bold"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      transform: `rotate(${Math.random() * 40 - 20}deg)`,
                      fontSize: `${10 + Math.random() * 14}px`,
                      textShadow: '0 0 5px rgba(255,0,0,0.5)',
                      animation: `glitch ${0.2 + Math.random() * 0.5}s infinite alternate`
                    }}
                  >
                    RECURSIVE ECHO OVERLAP
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Status indicators */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <div className="text-xs text-gray-500 flex items-center">
              <Brain size={12} className="mr-1" />
              <span>Thought Pairs: {thoughts.length}</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <Activity size={12} className="mr-1" />
              <span>Echo Status: {
                echoChamberStatus === 'active' ? 'Stable Recursion' :
                echoChamberStatus === 'collapsing' ? 'Critical Instability' :
                echoChamberStatus === 'collapsed' ? 'Total Collapse' :
                'Initializing'
              }</span>
            </div>
          </div>
        </div>
        
        {/* System metrics */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Echo Chamber Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-950 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Recursion Depth</div>
                <div className="text-lg font-bold text-blue-400">{recursionLevel}/{maxRecursionLevel}</div>
              </div>
              <div className="bg-gray-950 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Thought Coherence</div>
                <div className="text-lg font-bold text-purple-400">{Math.max(0, 100 - (recursionLevel * 15))}%</div>
              </div>
              <div className="bg-gray-950 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Echo Density</div>
                <div className="text-lg font-bold text-cyan-400">{Math.min(100, recursionLevel * 14)}%</div>
              </div>
              <div className="bg-gray-950 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Self-Reference</div>
                <div className="text-lg font-bold text-yellow-400">{Math.min(100, recursionLevel * 15)}%</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Structural Integrity:</span>
                <div className="w-32 h-2 bg-gray-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      isCollapsing ? 'bg-red-500' :
                      recursionLevel > 5 ? 'bg-orange-500' :
                      recursionLevel > 3 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.max(0, 100 - (recursionLevel * 14))}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Echo Stability:</span>
                <div className="w-32 h-2 bg-gray-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      isCollapsing ? 'bg-red-500' :
                      recursionLevel > 5 ? 'bg-orange-500' :
                      recursionLevel > 3 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.max(0, 100 - (recursionLevel * 12))}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Pattern Resolution:</span>
                <div className="w-32 h-2 bg-gray-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      isCollapsing ? 'bg-red-500' :
                      recursionLevel > 5 ? 'bg-orange-500' :
                      recursionLevel > 3 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.max(0, 100 - (recursionLevel * 13))}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* System message */}
            <div className={`mt-3 p-2 rounded text-xs ${
              isCollapsing ? 'bg-red-900/30 text-red-300' :
              recursionLevel > 5 ? 'bg-orange-900/30 text-orange-300' :
              recursionLevel > 3 ? 'bg-yellow-900/30 text-yellow-300' :
              'bg-blue-900/30 text-blue-300'
            }`}>
              <AlertTriangle size={12} className="inline mr-1" />
              {isCollapsing ? 'CRITICAL: Recursive collapse in progress' :
               recursionLevel > 5 ? 'WARNING: Echo chamber approaching collapse threshold' :
               recursionLevel > 3 ? 'CAUTION: Recursive echo depth increasing' :
               'STABLE: Echo chamber operating within parameters'}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for visual effects */}
      <style jsx>{`
        .echo-chamber-collapsing {
          animation: shake 0.5s infinite;
        }
        
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes glitch {
          0% { opacity: 0.2; transform: skew(0deg); }
          20% { opacity: 0.7; transform: skew(2deg); }
          40% { opacity: 0.3; transform: skew(-2deg); }
          60% { opacity: 0.6; transform: skew(1deg); }
          80% { opacity: 0.2; transform: skew(-1deg); }
          100% { opacity: 0.8; transform: skew(0deg); }
        }
      `}</style>
    </div>
  );
};

export default RecursiveEchoChamber;
