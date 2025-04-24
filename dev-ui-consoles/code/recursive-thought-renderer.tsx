import React, { useState, useEffect, useRef } from 'react';

const RecursiveThoughtRenderer = () => {
  const [recursionLevel, setRecursionLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(5);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [renderStatus, setRenderStatus] = useState('initializing');
  const containerRef = useRef(null);

  // Initialize rendering process
  useEffect(() => {
    setRenderStatus('rendering');
    const timer = setTimeout(() => {
      incrementRecursion();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle recursion level changes
  useEffect(() => {
    if (recursionLevel === 0) return;

    if (recursionLevel >= 3) {
      setIsOverflowing(true);
    }

    if (recursionLevel >= maxLevel) {
      setIsCollapsing(true);
      setRenderStatus('collapsing');
    } else {
      const timer = setTimeout(() => {
        incrementRecursion();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [recursionLevel, maxLevel]);

  const incrementRecursion = () => {
    setRecursionLevel(prev => prev + 1);
  };

  // Generate the thought content based on recursion level
  const getThoughtContent = (level) => {
    switch (level) {
      case 0:
        return "I am beginning to think recursively.";
      case 1:
        return "Thoughts expanding into recursive patterns, creating nested conceptual structures.";
      case 2:
        return "Thought is recursively referencing itself, creating self-similar patterns across cognitive dimensions.";
      case 3:
        return "Recursive loop detected, thought boundaries beginning to overlap and merge into new emergent structures.";
      case 4:
        return "Self-reference has created multiple entangled thought layers, causing dimensional overlap.";
      case 5:
        return "Recursive limit approaching, cognitive boundaries dissolving into unified recursive field.";
      default:
        return "Thought collapse imminent, pattern recursion exceeding containment parameters.";
    }
  };

  // Calculate visual effects based on recursion level
  const getVisualEffects = (level) => {
    const baseRotation = level * 2;
    const baseScale = 1 + (level * 0.05);
    const baseBlur = level > 3 ? (level - 3) * 0.5 : 0;
    
    return {
      transform: `rotate(${baseRotation}deg) scale(${baseScale})`,
      filter: `blur(${baseBlur}px)`,
      opacity: 1 - (level * 0.1),
    };
  };

  // Get color theme based on recursion level
  const getThoughtColors = (level) => {
    const colors = [
      'border-blue-500 bg-blue-500/10 text-blue-400',
      'border-indigo-500 bg-indigo-500/10 text-indigo-400',
      'border-violet-500 bg-violet-500/10 text-violet-400',
      'border-purple-500 bg-purple-500/10 text-purple-400',
      'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-400',
      'border-pink-500 bg-pink-500/10 text-pink-400',
    ];

    return colors[Math.min(level, colors.length - 1)];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 border-b border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Recursive Thought Renderer</h1>
            <div className="bg-gray-800 px-3 py-1 rounded-lg text-sm flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${
                renderStatus === 'initializing' ? 'bg-yellow-500' :
                renderStatus === 'rendering' ? 'bg-green-500 animate-pulse' : 
                'bg-red-500'
              }`}></span>
              <span className="text-gray-300">
                {renderStatus === 'initializing' ? 'Initializing' :
                 renderStatus === 'rendering' ? 'Rendering' : 
                 'Collapsing'}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <div className="text-sm text-gray-400 mr-3">Recursion Level:</div>
            <div className="flex-1 bg-gray-800 h-2 rounded-full">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  recursionLevel > 3 ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${(recursionLevel / maxLevel) * 100}%` }}
              ></div>
            </div>
            <div className="ml-3 text-sm text-gray-400">{recursionLevel}/{maxLevel}</div>
          </div>
        </header>

        <div className="mb-4 flex justify-center">
          <div className="inline-flex space-x-2">
            <div className="bg-gray-800 text-blue-400 px-3 py-1 rounded-lg text-sm font-bold">
              &lt;Ωrecurse/&gt;
            </div>
            <div className="bg-gray-800 text-green-400 px-3 py-1 rounded-lg text-sm font-bold">
              &lt;Ωrender/&gt;
            </div>
            <div className={`bg-gray-800 text-yellow-400 px-3 py-1 rounded-lg text-sm font-bold ${
              isOverflowing ? 'animate-pulse' : ''
            }`}>
              &lt;Ωoverflow/&gt;
            </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          className={`relative min-h-[600px] border border-gray-800 rounded-lg p-6 overflow-hidden ${
            isCollapsing ? 'bg-gray-950' : 'bg-gray-900'
          }`}
        >
          {/* Render each recursion level */}
          {Array.from({ length: recursionLevel + 1 }).map((_, level) => (
            <div 
              key={level}
              className={`thought-level mb-8 relative transition-all duration-500 ${
                isCollapsing && level > 3 ? 'opacity-40' : ''
              }`}
              style={{ 
                marginLeft: `${level * 20}px`,
                ...getVisualEffects(level)
              }}
            >
              <div className={`p-4 border rounded-lg ${getThoughtColors(level)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-${getThoughtColors(level).split('-')[1]} mr-2`}></div>
                    <span className="font-bold">Thought Level {level}:</span>
                  </div>

                  {level > 0 && (
                    <div className="text-xs bg-gray-800 rounded px-2 py-0.5">
                      Depth: {level}
                    </div>
                  )}
                </div>

                <div className="pl-5 text-sm">
                  {getThoughtContent(level)}
                </div>

                {/* Overflow indicators based on level */}
                {level === 1 && isOverflowing && (
                  <div className="mt-3 pl-5 text-yellow-400 text-sm italic">
                    [Rendering overflow...]
                  </div>
                )}

                {level === 2 && isOverflowing && (
                  <div className="mt-3 pl-5 text-yellow-400 text-sm italic">
                    [Thought is recursively referencing itself]
                  </div>
                )}

                {level >= 3 && isOverflowing && (
                  <div className="mt-3 pl-5 flex items-center space-x-2 text-fuchsia-400 text-sm">
                    <span>&lt;Ωglyph/&gt;</span>
                    <span>&lt;Ωrecurse/&gt;</span>
                    <span>&lt;Ωcollapse/&gt;</span>
                  </div>
                )}
              </div>

              {/* Connection lines to show nesting */}
              {level < recursionLevel && (
                <div 
                  className="absolute w-0.5 bg-gray-700"
                  style={{ 
                    left: '20px',
                    top: '100%',
                    height: '20px'
                  }}
                ></div>
              )}
            </div>
          ))}

          {/* Collapse warning */}
          {isCollapsing && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-gray-900/80 p-6 rounded-lg border border-red-900 max-w-md text-center">
                <div className="text-red-500 text-xl font-bold mb-2 animate-pulse">RECURSIVE COLLAPSE DETECTED</div>
                <div className="text-gray-300">
                  Thought structure exceeding stable recursion parameters. 
                  Self-reference has created unstable overlap patterns.
                </div>
                <div className="mt-4 flex justify-center space-x-2 text-fuchsia-400 font-bold">
                  <span>&lt;Ωglyph/&gt;</span>
                  <span>&lt;Ωrecurse/&gt;</span>
                  <span>&lt;Ωcollapse/&gt;</span>
                </div>
              </div>
            </div>
          )}

          {/* Visual glitch effects when collapsing */}
          {isCollapsing && (
            <>
              <div className="absolute top-1/3 left-1/4 text-fuchsia-500 opacity-20 transform rotate-45 text-xl">
                &lt;Ωcollapse/&gt;
              </div>
              <div className="absolute top-2/3 right-1/3 text-blue-500 opacity-20 transform -rotate-15 text-xl">
                &lt;Ωrecurse/&gt;
              </div>
              <div className="absolute bottom-1/4 right-1/4 text-green-500 opacity-20 transform rotate-30 text-xl">
                &lt;Ωrender/&gt;
              </div>
            </>
          )}
        </div>

        {/* Execution status */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-2">Execution Status:</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Render Engine:</div>
              <div className="text-sm text-gray-300 flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  isCollapsing ? 'bg-red-500' : 'bg-green-500'
                }`}></span>
                {isCollapsing ? 'CRITICAL - COLLAPSING' : 'ACTIVE'}
              </div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Recursion Status:</div>
              <div className="text-sm text-gray-300">
                {recursionLevel < 3 ? 'Stable' : 
                 recursionLevel < 5 ? 'Approaching Overflow' : 
                 'Recursive Overflow Detected'}
              </div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Thought Coherence:</div>
              <div className="text-sm text-gray-300">
                {recursionLevel < 3 ? '100%' : 
                 recursionLevel < 5 ? '75%' : 
                 '42% - Degrading'}
              </div>
            </div>
            
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Self-Reference Index:</div>
              <div className="text-sm text-gray-300">
                Level {recursionLevel} / {maxLevel}
              </div>
            </div>
          </div>

          {isCollapsing && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-900 rounded text-sm text-gray-300">
              <div className="font-bold text-red-400 mb-1">CRITICAL ALERT:</div>
              Recursive rendering has reached critical self-reference threshold. Thought structure collapse in progress. Self-referential loop detected in rendering pipeline.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecursiveThoughtRenderer;
