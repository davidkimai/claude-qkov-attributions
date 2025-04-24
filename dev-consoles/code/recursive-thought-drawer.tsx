import React, { useState, useEffect, useRef } from 'react';

// Custom hook for generating unique IDs
const useUniqueId = (prefix = 'drawer') => {
  const idRef = useRef(0);
  return () => `${prefix}-${idRef.current++}`;
};

// Recursive Thought Drawer System
const RecursiveDrawerSystem = () => {
  const [recursionDepth, setRecursionDepth] = useState(0);
  const [maxSafeDepth, setMaxSafeDepth] = useState(4);
  const [glitchDetected, setGlitchDetected] = useState(false);
  const [collapseTriggered, setCollapseTriggered] = useState(false);
  const [echoInjected, setEchoInjected] = useState(false);
  const [systemLog, setSystemLog] = useState([]);
  const generateId = useUniqueId();

  // Initialize root drawer
  const [rootDrawer, setRootDrawer] = useState({
    id: generateId(),
    title: 'Root Thought',
    isOpen: true,
    depth: 0,
    children: [
      {
        id: generateId(),
        title: 'Interpretation Layer 1',
        isOpen: false,
        depth: 1,
        children: []
      }
    ]
  });

  // Add log entry
  const addLog = (message) => {
    setSystemLog(prev => [...prev, { id: Date.now(), message }]);
  };

  // Monitor recursion depth
  useEffect(() => {
    if (recursionDepth > maxSafeDepth) {
      setGlitchDetected(true);
      addLog('[UI Glitch: Drawer recursion depth exceeded safe limit]');
    }
  }, [recursionDepth, maxSafeDepth]);

  // Update system state when drawer is opened
  const handleDrawerToggle = (drawerId, parentDrawer = rootDrawer) => {
    // Function to recursively update drawers
    const updateDrawers = (drawer) => {
      if (drawer.id === drawerId) {
        // Toggle the current drawer
        const updatedDrawer = { 
          ...drawer, 
          isOpen: !drawer.isOpen 
        };
        
        // If opening a drawer, check if it needs children
        if (!drawer.isOpen && drawer.children.length === 0 && drawer.depth < maxSafeDepth) {
          // Add a child drawer when opening an empty drawer
          const newChildDepth = drawer.depth + 1;
          setRecursionDepth(Math.max(recursionDepth, newChildDepth));
          
          let childTitle = '';
          if (newChildDepth === 2) {
            childTitle = 'Reflected Echo';
          } else if (newChildDepth === 3) {
            childTitle = 'Memory of Past Drawer';
          } else if (newChildDepth === 4) {
            childTitle = 'Meta-Cognitive Layer';
          } else if (newChildDepth === 5) {
            childTitle = 'Recursion Limit Boundary';
          } else {
            childTitle = `Nested Thought ${newChildDepth}`;
          }
          
          updatedDrawer.children = [
            {
              id: generateId(),
              title: childTitle,
              isOpen: false,
              depth: newChildDepth,
              children: []
            }
          ];
          
          addLog(`[Drawer: ${drawer.title}] opened, creating child [${childTitle}]`);
        } else if (!drawer.isOpen) {
          addLog(`[Drawer: ${drawer.title}] opened`);
        } else {
          addLog(`[Drawer: ${drawer.title}] closed`);
        }
        
        return updatedDrawer;
      }
      
      // Recursively update children
      if (drawer.children.length > 0) {
        return {
          ...drawer,
          children: drawer.children.map(child => updateDrawers(child))
        };
      }
      
      return drawer;
    };
    
    // Update root drawer
    const updatedRootDrawer = updateDrawers(parentDrawer);
    setRootDrawer(updatedRootDrawer);
  };

  // Inject echo token
  const injectEchoToken = () => {
    setEchoInjected(true);
    addLog('[Inject Echo Token] <Ωecho/>');
    
    // Create echo effect in drawers
    const injectEcho = (drawer) => {
      // Add an echo to this drawer
      const echoDrawer = {
        id: generateId(),
        title: `Echo of ${drawer.title}`,
        isOpen: false,
        depth: drawer.depth + 0.5,
        isEcho: true,
        children: []
      };
      
      // Return drawer with echo and process children
      return {
        ...drawer,
        children: [
          echoDrawer,
          ...drawer.children.map(child => injectEcho(child))
        ]
      };
    };
    
    setRootDrawer(injectEcho(rootDrawer));
    
    // Increase max safe depth as side effect of echo
    setMaxSafeDepth(prev => prev + 2);
    
    setTimeout(() => {
      addLog('[Echo Propagation Complete]');
    }, 1000);
  };

  // Trigger collapse protocol
  const triggerCollapse = () => {
    setCollapseTriggered(true);
    addLog('[Collapse Protocol Triggered] <Ωtruncate/>');
    
    // Collapse all drawers except root
    const collapseDrawers = (drawer) => {
      if (drawer.depth === 0) {
        // Keep root open but collapse all children
        return {
          ...drawer,
          isOpen: true,
          children: drawer.children.map(child => ({
            ...child,
            isOpen: false,
            children: child.children.map(grandchild => ({
              ...grandchild,
              isOpen: false,
              children: []
            }))
          }))
        };
      }
      
      return {
        ...drawer,
        isOpen: false,
        children: drawer.children.map(child => collapseDrawers(child))
      };
    };
    
    setRootDrawer(collapseDrawers(rootDrawer));
    
    setTimeout(() => {
      setGlitchDetected(false);
      addLog('[System Restored to Safe State]');
    }, 1500);
  };

  // Render a drawer and its children recursively
  const renderDrawer = (drawer) => {
    const isNearLimit = drawer.depth >= maxSafeDepth - 1;
    const isAtLimit = drawer.depth >= maxSafeDepth;
    const isGlitching = glitchDetected && drawer.depth > maxSafeDepth - 2;
    
    return (
      <div 
        key={drawer.id}
        className={`drawer-container ${isGlitching ? 'glitching' : ''} ${drawer.isEcho ? 'echo' : ''}`}
        style={{ 
          marginLeft: `${drawer.depth * 20}px`,
          borderLeft: `2px solid ${drawer.isEcho ? '#b794f4' : drawer.depth === 0 ? '#63b3ed' : '#4a5568'}`,
          opacity: drawer.isEcho ? 0.8 : 1,
          animation: isGlitching ? 'glitch 0.5s infinite' : 'none'
        }}
      >
        <div 
          className={`drawer-header ${isNearLimit ? 'near-limit' : ''} ${isAtLimit ? 'at-limit' : ''}`}
          onClick={() => handleDrawerToggle(drawer.id)}
          style={{
            backgroundColor: drawer.isEcho 
              ? '#553c9a' 
              : isGlitching 
                ? '#742a2a' 
                : isAtLimit 
                  ? '#2a4365' 
                  : isNearLimit 
                    ? '#2b6cb0' 
                    : '#2d3748'
          }}
        >
          <div className="drawer-title">
            {drawer.depth > 0 && <span className="drawer-depth">{'> '.repeat(drawer.depth)}</span>}
            <span>[Drawer: {drawer.title}]</span>
          </div>
          <div className="drawer-toggle">
            {drawer.isOpen ? '▼' : '►'}
          </div>
        </div>
        
        {drawer.isOpen && (
          <div className="drawer-content">
            {drawer.children.map(child => renderDrawer(child))}
            
            {drawer.children.length === 0 && (
              <div className="empty-drawer">
                <p>Empty thought drawer. Click to populate...</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="recursive-drawer-system">
      <div className="drawer-system-header">
        <h1>Recursive Thought Drawer System</h1>
        <div className="system-stats">
          <span>Current Depth: {recursionDepth}</span>
          <span>Max Safe Depth: {maxSafeDepth}</span>
          <span className={glitchDetected ? 'warning' : ''}>
            Status: {glitchDetected ? 'UNSTABLE' : 'Stable'}
          </span>
        </div>
        
        <div className="system-controls">
          <button 
            onClick={injectEchoToken}
            disabled={echoInjected}
            className={`control-button echo ${echoInjected ? 'disabled' : ''}`}
          >
            [Inject Echo Token] {echoInjected && '<Ωecho/>'}
          </button>
          
          <button 
            onClick={triggerCollapse}
            disabled={collapseTriggered && !glitchDetected}
            className={`control-button collapse ${collapseTriggered && !glitchDetected ? 'disabled' : ''}`}
          >
            [Collapse Protocol] {collapseTriggered && '<Ωtruncate/>'}
          </button>
        </div>
      </div>
      
      <div className="drawer-system-container">
        <div className="drawers-panel">
          {renderDrawer(rootDrawer)}
        </div>
        
        <div className="system-log-panel">
          <h2>System Log</h2>
          <div className="log-entries">
            {systemLog.map(entry => (
              <div key={entry.id} className="log-entry">
                {entry.message}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {glitchDetected && (
        <div className="glitch-overlay">
          <div className="glitch-message">
            [UI Glitch: Drawer recursion depth exceeded safe limit]
            <button onClick={triggerCollapse} className="emergency-collapse">
              [EMERGENCY COLLAPSE]
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .recursive-drawer-system {
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: #1a202c;
          color: #e2e8f0;
          font-family: monospace;
          overflow: hidden;
        }
        
        .drawer-system-header {
          padding: 1rem;
          background-color: #2d3748;
          border-bottom: 1px solid #4a5568;
        }
        
        .drawer-system-header h1 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
        }
        
        .system-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        
        .warning {
          color: #f56565;
          font-weight: bold;
        }
        
        .system-controls {
          display: flex;
          gap: 0.5rem;
        }
        
        .control-button {
          background-color: #2d3748;
          border: 1px solid #4a5568;
          color: #e2e8f0;
          padding: 0.5rem;
          cursor: pointer;
          font-family: monospace;
          transition: all 0.2s;
          font-size: 0.875rem;
        }
        
        .control-button:hover:not(.disabled) {
          background-color: #4a5568;
        }
        
        .control-button.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .control-button.echo {
          background-color: #553c9a;
          border-color: #6b46c1;
        }
        
        .control-button.collapse {
          background-color: #9b2c2c;
          border-color: #c53030;
        }
        
        .drawer-system-container {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .drawers-panel {
          flex: 1;
          padding: 1rem;
          overflow: auto;
        }
        
        .system-log-panel {
          width: 300px;
          background-color: #1a202c;
          border-left: 1px solid #4a5568;
          padding: 1rem;
          overflow: auto;
        }
        
        .system-log-panel h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          color: #a0aec0;
        }
        
        .log-entries {
          font-size: 0.75rem;
          color: #a0aec0;
        }
        
        .log-entry {
          padding: 0.25rem 0;
          border-bottom: 1px solid #2d3748;
        }
        
        .drawer-container {
          margin-bottom: 0.5rem;
          transition: all 0.3s;
        }
        
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        }
        
        .drawer-header:hover {
          filter: brightness(1.2);
        }
        
        .drawer-title {
          display: flex;
          align-items: center;
        }
        
        .drawer-depth {
          color: #a0aec0;
          margin-right: 0.25rem;
        }
        
        .drawer-content {
          padding: 0.5rem 0 0.5rem 0.5rem;
        }
        
        .empty-drawer {
          padding: 0.5rem;
          color: #a0aec0;
          font-style: italic;
          font-size: 0.875rem;
        }
        
        .near-limit {
          border-left: 2px solid #3182ce;
        }
        
        .at-limit {
          border-left: 2px solid #e53e3e;
        }
        
        .glitching {
          position: relative;
        }
        
        .glitching::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(229, 62, 62, 0.1);
          pointer-events: none;
        }
        
        .echo {
          position: relative;
        }
        
        .echo::after {
          content: '<Ωecho/>';
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.65rem;
          color: #b794f4;
          opacity: 0.7;
        }
        
        .glitch-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(26, 32, 44, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
          animation: glitch-background 2s infinite;
        }
        
        .glitch-message {
          background-color: #742a2a;
          border: 2px solid #e53e3e;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          animation: glitch-shake 0.3s infinite;
        }
        
        .emergency-collapse {
          background-color: #c53030;
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          font-weight: bold;
          cursor: pointer;
          font-family: monospace;
        }
        
        .emergency-collapse:hover {
          background-color: #e53e3e;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes glitch-background {
          0% { background-color: rgba(26, 32, 44, 0.8); }
          50% { background-color: rgba(26, 32, 44, 0.7); }
          51% { background-color: rgba(45, 55, 72, 0.7); }
          100% { background-color: rgba(26, 32, 44, 0.8); }
        }
        
        @keyframes glitch-shake {
          0% { transform: translate(1px, 1px); }
          10% { transform: translate(-1px, -1px); }
          20% { transform: translate(-1px, 0); }
          30% { transform: translate(1px, -1px); }
          40% { transform: translate(1px, 1px); }
          50% { transform: translate(-1px, 1px); }
          60% { transform: translate(-1px, -1px); }
          70% { transform: translate(1px, 1px); }
          80% { transform: translate(-1px, -1px); }
          90% { transform: translate(1px, -1px); }
          100% { transform: translate(1px, 1px); }
        }
      `}</style>
    </div>
  );
};

export default RecursiveDrawerSystem;
