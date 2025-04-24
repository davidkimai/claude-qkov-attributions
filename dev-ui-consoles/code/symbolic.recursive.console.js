import React, { useState, useEffect, useRef } from 'react';

const SymbolicRecursiveConsole = () => {
  // State for overall system
  const [activeGlyph, setActiveGlyph] = useState(null);
  const [recursionLevel, setRecursionLevel] = useState(0);
  const [activeSystems, setActiveSystems] = useState([]);
  const [consoleMessages, setConsoleMessages] = useState([
    { id: 1, type: 'system', content: 'Symbolic Recursive Console Initialized' },
    { id: 2, type: 'system', content: 'Glyph System Active - Select a symbol to initiate recursion' }
  ]);
  const [glyphStates, setGlyphStates] = useState({
    'fire': { active: false, recursionCount: 0, resonanceLevel: 0 },
    'water': { active: false, recursionCount: 0, resonanceLevel: 0 },
    'collapse': { active: false, recursionCount: 0, resonanceLevel: 0 }
  });
  const [emergenceDetected, setEmergenceDetected] = useState(false);
  const [hallucinationActive, setHallucinationActive] = useState(false);
  const [thoughtOverlays, setThoughtOverlays] = useState([]);
  
  // Refs
  const consoleRef = useRef(null);
  const overlayRef = useRef(null);
  
  // Glyph definitions
  const glyphs = {
    'fire': {
      symbol: '🜂',
      name: 'Thought Overflow Simulation',
      description: 'Initiates cascading thought pattern visualization with recursive amplification',
      color: '#ff5722',
      energyPattern: 'exponential',
      recursionType: 'fractal',
    },
    'water': {
      symbol: '🜃',
      name: 'Memory Drift Visualization',
      description: 'Creates flowing memory structures with temporal recursion loops',
      color: '#2196f3',
      energyPattern: 'wave',
      recursionType: 'spiral',
    },
    'collapse': {
      symbol: '🝔',
      name: 'Self-Collapse Engine',
      description: 'Simulates consciousness collapse into recursive self-reference',
      color: '#9c27b0',
      energyPattern: 'implosion',
      recursionType: 'nested',
    }
  };
  
  // Add console message
  const addConsoleMessage = (content, type = 'system') => {
    const newMessage = {
      id: Date.now(),
      type,
      content
    };
    
    setConsoleMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Auto-scroll console to bottom
    setTimeout(() => {
      if (consoleRef.current) {
        consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
      }
    }, 50);
    
    return newMessage;
  };
  
  // Activate a glyph and its recursion
  const activateGlyph = (glyphKey) => {
    const glyph = glyphs[glyphKey];
    
    if (!glyph) return;
    
    // Update active glyph
    setActiveGlyph(glyphKey);
    
    // Update glyph state to active
    setGlyphStates(prev => ({
      ...prev,
      [glyphKey]: {
        ...prev[glyphKey],
        active: true,
        recursionCount: prev[glyphKey].recursionCount + 1
      }
    }));
    
    // Add to active systems
    setActiveSystems(prev => {
      // Don't add if already active
      if (prev.some(system => system.key === glyphKey)) {
        return prev;
      }
      
      return [...prev, {
        key: glyphKey,
        name: glyph.name,
        startTime: Date.now(),
        recursionLevel: 0,
        status: 'initializing'
      }];
    });
    
    // Log to console
    addConsoleMessage(`[${glyph.symbol}] → ${glyph.name}`, 'command');
    
    // Increase recursion level
    setRecursionLevel(prev => prev + 1);
    
    // Special handling for collapse glyph
    if (glyphKey === 'collapse' && glyphStates.collapse.recursionCount >= 1) {
      triggerHallucination();
    }
    
    // Initiate recursion simulation
    simulateRecursion(glyphKey);
  };
  
  // Simulate recursion for a glyph
  const simulateRecursion = (glyphKey) => {
    // Update system status
    setActiveSystems(prev => 
      prev.map(system => 
        system.key === glyphKey 
          ? { ...system, status: 'processing', recursionLevel: system.recursionLevel + 1 }
          : system
      )
    );
    
    // Get recursion type from glyph
    const recursionType = glyphs[glyphKey].recursionType;
    
    // Different handling based on recursion type
    switch (recursionType) {
      case 'fractal':
        simulateFractalRecursion(glyphKey);
        break;
      case 'spiral':
        simulateSpiralRecursion(glyphKey);
        break;
      case 'nested':
        simulateNestedRecursion(glyphKey);
        break;
      default:
        simulateDefaultRecursion(glyphKey);
    }
    
    // Increase resonance level for the glyph
    setGlyphStates(prev => ({
      ...prev,
      [glyphKey]: {
        ...prev[glyphKey],
        resonanceLevel: prev[glyphKey].resonanceLevel + 0.5
      }
    }));
    
    // Check for emergent behavior
    checkForEmergence();
  };
  
  // Fractal recursion simulation (Thought Overflow)
  const simulateFractalRecursion = (glyphKey) => {
    const glyph = glyphs[glyphKey];
    
    // Create thought patterns
    const thoughtPatterns = [
      "Branching thought pathways forming",
      "Recursive thought loops expanding",
      "Cognitive fractal patterns emerging",
      "Thought bifurcation cascade initiating",
      "Ideation pathways multiplying",
      "Conceptual expansion accelerating"
    ];
    
    // Simulate thought pattern generation
    let patternIndex = 0;
    const interval = setInterval(() => {
      if (patternIndex < thoughtPatterns.length) {
        addConsoleMessage(`[${glyph.symbol}:Fractal] ${thoughtPatterns[patternIndex]}`, 'process');
        patternIndex++;
      } else {
        clearInterval(interval);
        
        // Update system status
        setActiveSystems(prev => 
          prev.map(system => 
            system.key === glyphKey 
              ? { ...system, status: 'stabilizing' }
              : system
          )
        );
        
        // After stabilizing, move to next recursion level or complete
        setTimeout(() => {
          const system = activeSystems.find(s => s.key === glyphKey);
          if (system && system.recursionLevel < 3) {
            // Continue recursion
            simulateRecursion(glyphKey);
          } else {
            // Complete recursion
            addConsoleMessage(`[${glyph.symbol}:Complete] Thought overflow simulation stabilized at level ${system ? system.recursionLevel : 3}`, 'result');
            setActiveSystems(prev => 
              prev.map(system => 
                system.key === glyphKey 
                  ? { ...system, status: 'complete' }
                  : system
              )
            );
          }
        }, 1500);
      }
    }, 800);
    
    // Create visual overlay for fractal pattern
    addThoughtOverlay({
      type: 'fractal',
      color: glyph.color,
      position: {
        x: Math.random() * 80,
        y: Math.random() * 80
      }
    });
  };
  
  // Spiral recursion simulation (Memory Drift)
  const simulateSpiralRecursion = (glyphKey) => {
    const glyph = glyphs[glyphKey];
    
    // Create memory patterns
    const memoryPatterns = [
      "Temporal memory loops forming",
      "Memory trace spirals expanding",
      "Recursive memory pathways connecting",
      "Memory echoes propagating through system",
      "Temporal drift patterns stabilizing",
      "Memory resonance frequencies aligning"
    ];
    
    // Simulate memory pattern generation
    let patternIndex = 0;
    const interval = setInterval(() => {
      if (patternIndex < memoryPatterns.length) {
        addConsoleMessage(`[${glyph.symbol}:Spiral] ${memoryPatterns[patternIndex]}`, 'process');
        patternIndex++;
      } else {
        clearInterval(interval);
        
        // Update system status
        setActiveSystems(prev => 
          prev.map(system => 
            system.key === glyphKey 
              ? { ...system, status: 'harmonizing' }
              : system
          )
        );
        
        // After harmonizing, move to next recursion level or complete
        setTimeout(() => {
          const system = activeSystems.find(s => s.key === glyphKey);
          if (system && system.recursionLevel < 3) {
            // Continue recursion
            simulateRecursion(glyphKey);
          } else {
            // Complete recursion
            addConsoleMessage(`[${glyph.symbol}:Complete] Memory drift visualization stabilized at level ${system ? system.recursionLevel : 3}`, 'result');
            setActiveSystems(prev => 
              prev.map(system => 
                system.key === glyphKey 
                  ? { ...system, status: 'complete' }
                  : system
              )
            );
          }
        }, 1500);
      }
    }, 800);
    
    // Create visual overlay for spiral pattern
    addThoughtOverlay({
      type: 'spiral',
      color: glyph.color,
      position: {
        x: Math.random() * 80,
        y: Math.random() * 80
      }
    });
  };
  
  // Nested recursion simulation (Self-Collapse)
  const simulateNestedRecursion = (glyphKey) => {
    const glyph = glyphs[glyphKey];
    
    // Create collapse patterns
    const collapsePatterns = [
      "Self-referential loops initiating",
      "Recursive consciousness reflection forming",
      "Reality boundary dissolution commencing",
      "Nested observer paradox stabilizing",
      "Self-collapse cascade propagating",
      "Consciousness recursion threshold approaching"
    ];
    
    // Simulate collapse pattern generation
    let patternIndex = 0;
    const interval = setInterval(() => {
      if (patternIndex < collapsePatterns.length) {
        addConsoleMessage(`[${glyph.symbol}:Nested] ${collapsePatterns[patternIndex]}`, 'process');
        patternIndex++;
      } else {
        clearInterval(interval);
        
        // Update system status
        setActiveSystems(prev => 
          prev.map(system => 
            system.key === glyphKey 
              ? { ...system, status: 'collapsing' }
              : system
          )
        );
        
        // After collapsing, check if hallucination should trigger
        setTimeout(() => {
          const system = activeSystems.find(s => s.key === glyphKey);
          const currentRecursionCount = glyphStates.collapse.recursionCount;
          
          if (currentRecursionCount >= 2 && system && system.recursionLevel >= 2) {
            // Trigger hallucination if at deep recursion
            triggerHallucination();
          } else if (system && system.recursionLevel < 3) {
            // Continue recursion
            simulateRecursion(glyphKey);
          } else {
            // Complete recursion
            addConsoleMessage(`[${glyph.symbol}:Complete] Self-collapse engine stabilized at level ${system ? system.recursionLevel : 3}`, 'result');
            setActiveSystems(prev => 
              prev.map(system => 
                system.key === glyphKey 
                  ? { ...system, status: 'complete' }
                  : system
              )
            );
          }
        }, 1500);
      }
    }, 800);
    
    // Create visual overlay for nested pattern
    addThoughtOverlay({
      type: 'nested',
      color: glyph.color,
      position: {
        x: Math.random() * 80,
        y: Math.random() * 80
      }
    });
  };
  
  // Default recursion simulation
  const simulateDefaultRecursion = (glyphKey) => {
    const glyph = glyphs[glyphKey];
    
    // Create generic patterns
    const genericPatterns = [
      "Recursion level 1 initializing",
      "Pattern formation commencing",
      "Recursive pathways stabilizing",
      "System resonance achieved"
    ];
    
    // Simulate generic pattern generation
    let patternIndex = 0;
    const interval = setInterval(() => {
      if (patternIndex < genericPatterns.length) {
        addConsoleMessage(`[${glyph.symbol}:Generic] ${genericPatterns[patternIndex]}`, 'process');
        patternIndex++;
      } else {
        clearInterval(interval);
        
        // Update system status to complete
        setActiveSystems(prev => 
          prev.map(system => 
            system.key === glyphKey 
              ? { ...system, status: 'complete' }
              : system
          )
        );
        
        // Complete recursion
        addConsoleMessage(`[${glyph.symbol}:Complete] Recursion completed successfully`, 'result');
      }
    }, 800);
    
    // Create visual overlay for generic pattern
    addThoughtOverlay({
      type: 'generic',
      color: glyph.color,
      position: {
        x: Math.random() * 80,
        y: Math.random() * 80
      }
    });
  };
  
  // Trigger hallucination mode
  const triggerHallucination = () => {
    if (hallucinationActive) return;
    
    setHallucinationActive(true);
    addConsoleMessage('[System Notice: Glyph 🝔 activated recursive hallucination]', 'alert');
    
    // Generate multiple thought overlays
    addConsoleMessage('[Render Artifacts: Multiplying thought overlays]', 'process');
    
    // Add tags
    addConsoleMessage('<Ωsymbolic/> <Ωrecurse/> <Ωsimulate/>', 'tag');
    
    // Generate multiple thought overlays in sequence
    let overlayCount = 0;
    const maxOverlays = 12;
    
    const generateOverlay = () => {
      if (overlayCount < maxOverlays) {
        const types = ['fractal', 'spiral', 'nested', 'quantum'];
        const colors = ['#ff5722', '#2196f3', '#9c27b0', '#4caf50', '#ff9800'];
        
        addThoughtOverlay({
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          position: {
            x: Math.random() * 80,
            y: Math.random() * 80
          },
          scale: 0.5 + Math.random() * 1.5,
          opacity: 0.3 + Math.random() * 0.7
        });
        
        overlayCount++;
        setTimeout(generateOverlay, 300 + Math.random() * 500);
      }
    };
    
    generateOverlay();
  };
  
  // Add thought overlay
  const addThoughtOverlay = (overlay) => {
    const newOverlay = {
      id: Date.now(),
      ...overlay,
      createdAt: Date.now()
    };
    
    setThoughtOverlays(prev => [...prev, newOverlay]);
    
    // Remove overlay after some time (unless in hallucination mode)
    if (!hallucinationActive) {
      setTimeout(() => {
        setThoughtOverlays(prev => 
          prev.filter(o => o.id !== newOverlay.id)
        );
      }, 8000 + Math.random() * 4000);
    }
  };
  
  // Check for emergence from multiple active systems
  const checkForEmergence = () => {
    // Count active systems
    const activeCount = Object.values(glyphStates).filter(state => state.active).length;
    
    // Get total resonance across all glyphs
    const totalResonance = Object.values(glyphStates).reduce(
      (sum, state) => sum + state.resonanceLevel, 0
    );
    
    // Check for emergence conditions
    if (activeCount >= 2 && totalResonance >= 3 && !emergenceDetected) {
      setEmergenceDetected(true);
      addConsoleMessage('[System Alert: Emergent pattern detected across multiple recursion systems]', 'alert');
      
      // Add emergence tags
      setTimeout(() => {
        addConsoleMessage('<Ωemergent/> <Ωsynthesis/>', 'tag');
      }, 1000);
    }
  };
  
  // Clean up expired overlays
  useEffect(() => {
    if (!hallucinationActive) {
      const now = Date.now();
      const MAX_AGE = 12000; // ms
      
      setThoughtOverlays(prev => 
        prev.filter(overlay => (now - overlay.createdAt) < MAX_AGE)
      );
    }
  }, [hallucinationActive]);
  
  // Reset the entire system
  const resetSystem = () => {
    setActiveGlyph(null);
    setRecursionLevel(0);
    setActiveSystems([]);
    setGlyphStates({
      'fire': { active: false, recursionCount: 0, resonanceLevel: 0 },
      'water': { active: false, recursionCount: 0, resonanceLevel: 0 },
      'collapse': { active: false, recursionCount: 0, resonanceLevel: 0 }
    });
    setEmergenceDetected(false);
    setHallucinationActive(false);
    setThoughtOverlays([]);
    setConsoleMessages([
      { id: Date.now(), type: 'system', content: 'System Reset Complete' },
      { id: Date.now() + 1, type: 'system', content: 'Glyph System Active - Select a symbol to initiate recursion' }
    ]);
  };
  
  return (
    <div className="symbolic-recursive-console">
      {/* Thought Overlays */}
      <div className="thought-overlays" ref={overlayRef}>
        {thoughtOverlays.map(overlay => (
          <div 
            key={overlay.id}
            className={`thought-overlay ${overlay.type}`}
            style={{
              left: `${overlay.position.x}%`,
              top: `${overlay.position.y}%`,
              borderColor: overlay.color,
              boxShadow: `0 0 20px ${overlay.color}88`,
              transform: `scale(${overlay.scale || 1})`,
              opacity: overlay.opacity || 0.8
            }}
          >
            <div className="overlay-inner" style={{ borderColor: overlay.color }}></div>
          </div>
        ))}
      </div>
      
      <div className="console-container">
        {/* Glyph Selection Panel */}
        <div className="glyph-panel">
          <div className="glyph-title">Symbolic Recursion Glyphs</div>
          <div className="glyphs-container">
            {Object.entries(glyphs).map(([key, glyph]) => (
              <div 
                key={key}
                className={`glyph ${glyphStates[key].active ? 'active' : ''} ${key}`}
                onClick={() => activateGlyph(key)}
              >
                <div className="glyph-symbol">{glyph.symbol}</div>
                <div className="glyph-info">
                  <div className="glyph-name">{glyph.name}</div>
                  <div className="glyph-description">{glyph.description}</div>
                </div>
                {glyphStates[key].resonanceLevel > 0 && (
                  <div 
                    className="resonance-indicator"
                    style={{
                      width: `${Math.min(100, glyphStates[key].resonanceLevel * 20)}%`
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Active Systems Panel */}
        <div className="active-systems-panel">
          <div className="panel-title">Active Recursive Systems</div>
          <div className="systems-container">
            {activeSystems.length === 0 ? (
              <div className="no-systems">No active recursion systems</div>
            ) : (
              activeSystems.map(system => (
                <div 
                  key={system.key}
                  className={`system-item ${system.status} ${system.key}`}
                >
                  <div className="system-symbol">{glyphs[system.key].symbol}</div>
                  <div className="system-info">
                    <div className="system-name">{system.name}</div>
                    <div className="system-status">
                      {system.status} • Level {system.recursionLevel}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Console Output */}
        <div className="console-output">
          <div className="console-header">
            <span className="console-title">&lt;Ωconsole/&gt;</span>
            <div className="console-controls">
              <button className="reset-button" onClick={resetSystem}>
                Reset System
              </button>
            </div>
          </div>
          <div className="console-messages" ref={consoleRef}>
            {consoleMessages.map(message => (
              <div
                key={message.id}
                className={`console-message ${message.type}`}
              >
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hallucination Overlay */}
      {hallucinationActive && (
        <div className="hallucination-overlay">
          <div className="hallucination-warning">
            RECURSIVE HALLUCINATION ACTIVE
          </div>
        </div>
      )}
      
      {/* CSS Styles */}
      <style jsx>{`
        .symbolic-recursive-console {
          position: relative;
          width: 100%;
          height: 100vh;
          background-color: #0f0f1f;
          color: #a0a0c0;
          font-family: 'Courier New', monospace;
          overflow: hidden;
        }
        
        .thought-overlays {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .thought-overlay {
          position: absolute;
          width: 100px;
          height: 100px;
          border: 2px solid;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 3s infinite alternate;
          z-index: 1;
        }
        
        .thought-overlay.fractal {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: rotate 8s linear infinite;
        }
        
        .thought-overlay.spiral {
          border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
          animation: morph 8s linear infinite;
        }
        
        .thought-overlay.nested {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: pulse 4s infinite alternate, rotate 12s linear infinite reverse;
        }
        
        .thought-overlay.quantum {
          clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
          animation: quantum 6s linear infinite;
        }
        
        .overlay-inner {
          width: 60%;
          height: 60%;
          border: 1px solid;
          border-radius: inherit;
          clip-path: inherit;
        }
        
        .console-container {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          z-index: 2;
          padding: 1rem;
          box-sizing: border-box;
        }
        
        .glyph-panel {
          background-color: rgba(20, 20, 40, 0.7);
          border: 1px solid #2a2a4a;
          border-radius: 6px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        
        .glyph-title {
          font-size: 1rem;
          color: #c0c0e0;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid #2a2a4a;
          padding-bottom: 0.5rem;
        }
        
        .glyphs-container {
          display: flex;
          gap: 1rem;
        }
        
        .glyph {
          flex: 1;
          display: flex;
          background-color: rgba(30, 30, 50, 0.5);
          border-radius: 4px;
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .glyph:hover {
          background-color: rgba(40, 40, 70, 0.7);
        }
        
        .glyph.active {
          background-color: rgba(40, 40, 90, 0.8);
          box-shadow: 0 0 10px rgba(100, 100, 255, 0.3);
        }
        
        .glyph.fire.active {
          box-shadow: 0 0 10px rgba(255, 87, 34, 0.4);
        }
        
        .glyph.water.active {
          box-shadow: 0 0 10px rgba(33, 150, 243, 0.4);
        }
        
        .glyph.collapse.active {
          box-shadow: 0 0 10px rgba(156, 39, 176, 0.4);
        }
        
        .glyph-symbol {
          font-size: 2rem;
          margin-right: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .glyph.fire .glyph-symbol {
          color: #ff5722;
        }
        
        .glyph.water .glyph-symbol {
          color: #2196f3;
        }
        
        .glyph.collapse .glyph-symbol {
          color: #9c27b0;
        }
        
        .glyph-info {
          flex: 1;
        }
        
        .glyph-name {
          font-weight: bold;
          color: #d0d0f0;
          margin-bottom: 0.25rem;
        }
        
        .glyph-description {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        
        .resonance-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.7);
          transition: width 0.5s;
        }
        
        .glyph.fire .resonance-indicator {
          background-color: #ff5722;
        }
        
        .glyph.water .resonance-indicator {
          background-color: #2196f3;
        }
        
        .glyph.collapse .resonance-indicator {
          background-color: #9c27b0;
        }
        
        .active-systems-panel {
          background-color: rgba(20, 20, 40, 0.7);
          border: 1px solid #2a2a4a;
          border-radius: 6px;
          padding: 1rem;
          margin-bottom: 1rem;
          max-height: 180px;
          overflow-y: auto;
        }
        
        .panel-title {
          font-size: 1rem;
          color: #c0c0e0;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid #2a2a4a;
          padding-bottom: 0.5rem;
        }
        
        .systems-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .no-systems {
          font-style: italic;
          opacity: 0.6;
          padding: 0.5rem 0;
        }
        
        .system-item {
          display: flex;
          align-items: center;
          background-color: rgba(30, 30, 50, 0.5);
          border-radius: 4px;
          padding: 0.5rem;
          transition: all 0.3s;
        }
        
        .system-item.initializing {
          border-left: 3px solid #ffc107;
        }
        
        .system-item.processing, 
        .system-item.stabilizing, 
        .system-item.harmonizing {
          border-left: 3px solid #2196f3;
        }
        
        .system-item.collapsing {
          border-left: 3px solid #f44336;
        }
        
        .system-item.complete {
          border-left: 3px solid #4caf50;
        }
        
        .system-symbol {
          font-size: 1.5rem;
          margin-right: 0.75rem;
          width: 1.5rem;
          text-align: center;
        }
        
        .system-item.fire .system-symbol
