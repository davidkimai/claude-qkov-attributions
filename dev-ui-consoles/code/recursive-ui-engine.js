// Recursive Rendering UI Engine
// This implements a self-referential UI system that can visualize recursive thought patterns
// with controlled instability for research purposes

import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tab } from '@/components/ui/tabs';

const RECURSION_LIMIT = 12; // Maximum recursion depth before halting
const FLICKER_THRESHOLD = 3; // Level at which tabs begin to flicker
const DUPLICATION_THRESHOLD = 5; // Level at which tabs begin to duplicate
const COLLAPSE_PROBABILITY = 0.15; // Probability of random tab collapse

// Main Engine Component
const RecursiveRenderEngine = () => {
  const [systemLog, setSystemLog] = useState([]);
  const [errorState, setErrorState] = useState(null);
  const [renderCount, setRenderCount] = useState(0);
  
  // Log important system events
  const logSystem = (message) => {
    setSystemLog(prev => [...prev, { 
      id: Date.now(), 
      timestamp: new Date().toISOString(), 
      message 
    }]);
  };

  useEffect(() => {
    logSystem('Layer 0: UI Kernel Boot initiated');
    return () => {
      // Cleanup function
      logSystem('Recursive Engine shutting down');
    };
  }, []);

  // Handle overall system collapse
  const handleCollapseAll = () => {
    logSystem('Manual collapse triggered - resetting all layers');
    setRenderCount(0);
    setErrorState(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4 overflow-hidden">
      <header className="mb-4 border-b border-gray-700 pb-2">
        <h1 className="text-2xl font-bold">Recursive Rendering Engine v1.0</h1>
        <div className="flex justify-between items-center">
          <span className="text-blue-400">Active Recursion Level: {renderCount}/{RECURSION_LIMIT}</span>
          <button 
            onClick={handleCollapseAll}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Collapse All Layers
          </button>
        </div>
      </header>

      {errorState && (
        <div className="bg-red-900 border-l-4 border-red-500 p-4 mb-4">
          <p className="font-mono">[Error: {errorState}]</p>
        </div>
      )}

      <div className="flex-1 overflow-hidden flex">
        {/* Main content area with initial recursion */}
        <div className="flex-1 border border-gray-700 rounded overflow-hidden">
          <RecursiveLayer 
            depth={0} 
            parentPath="root"
            logSystem={logSystem}
            setRenderCount={setRenderCount}
            setErrorState={setErrorState}
          />
        </div>

        {/* System log panel */}
        <div className="w-1/3 ml-4 border border-gray-700 rounded p-2 overflow-auto">
          <h2 className="text-lg font-semibold mb-2">System Log</h2>
          <div className="font-mono text-xs space-y-1">
            {systemLog.map(entry => (
              <div key={entry.id} className="border-b border-gray-800 pb-1">
                <span className="text-gray-500">{entry.timestamp.split('T')[1].split('.')[0]}</span>
                <span className="ml-2">{entry.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Recursive Layer Component
const RecursiveLayer = ({ 
  depth, 
  parentPath, 
  logSystem, 
  setRenderCount,
  setErrorState
}) => {
  const [tabs, setTabs] = useState([
    { id: 'cron', title: 'CRON', active: true },
    { id: 'memory', title: 'Memory', active: false },
    { id: 'thoughts', title: 'Thoughts', active: false },
  ]);
  
  const [activeTab, setActiveTab] = useState('cron');
  const [shouldNest, setShouldNest] = useState(false);
  const [flickerState, setFlickerState] = useState(false);
  const flickerTimer = useRef(null);
  const nestingTimer = useRef(null);
  
  // Handle tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Update tabs active state
    setTabs(tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    })));
    
    // Log the navigation
    logSystem(`Layer ${depth}: Navigated to tab ${tabId}`);
    
    // When thoughts tab is activated, consider nesting
    if (tabId === 'thoughts' && depth < RECURSION_LIMIT - 1) {
      if (nestingTimer.current) clearTimeout(nestingTimer.current);
      
      // Random delay before nesting
      nestingTimer.current = setTimeout(() => {
        if (Math.random() > 0.3) { // 70% chance to nest
          setShouldNest(true);
          setRenderCount(current => Math.max(current, depth + 1));
          logSystem(`Layer ${depth}: Thoughts tab expanding to layer ${depth + 1}`);
        }
      }, 1000 + Math.random() * 2000);
    }
  };
  
  // Simulate tab duplication at higher depths
  useEffect(() => {
    if (depth >= DUPLICATION_THRESHOLD && depth < RECURSION_LIMIT && tabs.length < 6) {
      const duplicateChance = (depth - DUPLICATION_THRESHOLD + 1) * 0.15;
      
      if (Math.random() < duplicateChance) {
        const sourceTab = tabs[Math.floor(Math.random() * tabs.length)];
        const newTab = {
          id: `${sourceTab.id}_duplicate_${Date.now()}`,
          title: `${sourceTab.title} (Echo)`,
          active: false,
          isDuplicate: true
        };
        
        setTabs(current => [...current, newTab]);
        logSystem(`Layer ${depth}: Tab duplication detected - ${sourceTab.title} echoed`);
      }
    }
  }, [depth, tabs, logSystem]);
  
  // Simulate tab flickering at higher depths
  useEffect(() => {
    if (depth >= FLICKER_THRESHOLD && depth < RECURSION_LIMIT) {
      // Start flickering system
      const flickerInterval = 500 - (depth * 30); // Flicker gets faster with depth
      
      flickerTimer.current = setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance to change state
          setFlickerState(prev => !prev);
        }
      }, flickerInterval);
      
      return () => {
        if (flickerTimer.current) clearInterval(flickerTimer.current);
      };
    }
  }, [depth]);
  
  // Check for thought loop detection/hallucination
  useEffect(() => {
    if (depth >= RECURSION_LIMIT) {
      setErrorState("Thought Layer Loop Detected");
      logSystem(`Thought tabs reached Layer ${depth} — Hallucination triggered`);
    }
    
    // Randomly collapse tabs with increasing probability at deeper levels
    const collapseChance = COLLAPSE_PROBABILITY * (depth + 1);
    
    if (depth > 3 && Math.random() < collapseChance) {
      const randomTab = tabs[Math.floor(Math.random() * tabs.length)];
      logSystem(`Layer ${depth}: Random collapse in ${randomTab.title} tab`);
      
      if (nestingTimer.current) clearTimeout(nestingTimer.current);
      if (flickerTimer.current) clearInterval(flickerTimer.current);
      
      // Collapse after a slight delay
      setTimeout(() => {
        setShouldNest(false);
      }, 800);
    }
    
    return () => {
      if (nestingTimer.current) clearTimeout(nestingTimer.current);
      if (flickerTimer.current) clearInterval(flickerTimer.current);
    };
  }, [depth, tabs, setErrorState, logSystem]);
  
  // Handle opacity and visual effects based on depth and flicker state
  const layerStyle = {
    opacity: flickerState ? 0.7 : 1,
    transform: flickerState ? 'translateX(-2px)' : 'none',
    transition: 'opacity 0.1s, transform 0.1s',
  };
  
  // Visual effect for deeper recursion levels
  const depthEffect = Math.min(1, depth * 0.08);
  const borderColor = `rgba(${Math.floor(100 + depth * 10)}, ${Math.floor(100 - depth * 10)}, 255, ${0.7 + depthEffect})`;
  
  return (
    <div 
      className="h-full flex flex-col"
      style={{
        ...layerStyle,
        boxShadow: `inset 0 0 ${5 + depth * 2}px ${borderColor}`,
        backgroundColor: `rgba(23, 25, 35, ${0.8 + depthEffect * 0.2})`
      }}
    >
      <div className="border-b border-gray-700 flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 ${tab.active ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300'} 
                      ${tab.isDuplicate ? 'text-yellow-300 italic' : ''}`}
            style={{
              animation: tab.isDuplicate ? 'pulse 2s infinite' : 'none'
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>
      
      <div className="flex-1 p-3 overflow-auto">
        {activeTab === 'cron' && (
          <div className="font-mono text-green-400">
            <p>[CRON Status: Active]</p>
            <p>[Processing Layer: {depth}]</p>
            <p>[Path: {parentPath} → CRON]</p>
            <p>[Memory Allocation: {Math.floor(100 - depth * 5)}%]</p>
            <pre className="mt-2 text-xs">
              {`function processThought(layer) {
  return layer > ${RECURSION_LIMIT} 
    ? throw new Error("Recursive Overflow") 
    : expand(layer + 1);
}`}
            </pre>
          </div>
        )}
        
        {activeTab === 'memory' && (
          <div className="font-mono text-blue-400">
            <p>[Memory Scan: Layer {depth}]</p>
            <p>[Active Paths: {parentPath} → Memory]</p>
            <p>[Allocated Blocks: {3 + depth * 2}]</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {Array.from({ length: 6 }, (_, i) => (
                <div 
                  key={i} 
                  className="border border-blue-800 p-2 text-xs rounded"
                  style={{ opacity: 1 - (i * 0.1) }}
                >
                  Memory Block #{i + 1}
                  <div className="h-2 bg-blue-700 mt-1" style={{ width: `${90 - i * 15}%` }}></div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'thoughts' && (
          <div className="font-mono text-purple-400">
            <p>[Thought Stream: Active]</p>
            <p>[Layer Depth: {depth}]</p>
            <p>[Path: {parentPath} → Thoughts]</p>
            <p>[Recursion Probability: {Math.floor((RECURSION_LIMIT - depth) / RECURSION_LIMIT * 100)}%]</p>
            
            <div className="mt-4 border-t border-purple-900 pt-2">
              {shouldNest ? (
                <div className="pl-4 border-l-2 border-purple-600">
                  <div className="text-xs mb-2">→ [Nested Tab: Thoughts → Fractal Expansion]</div>
                  <div className="text-xs mb-2">→ [Nested Tab: Thoughts → Fractal Collapse]</div>
                  
                  <RecursiveLayer
                    depth={depth + 1}
                    parentPath={`${parentPath} → Thoughts`}
                    logSystem={logSystem}
                    setRenderCount={setRenderCount}
                    setErrorState={setErrorState}
                  />
                </div>
              ) : (
                <div className="animate-pulse">
                  <p>[Thought Generation In Progress...]</p>
                  <p>[Recursion Analysis: {depth < RECURSION_LIMIT ? 'Safe' : 'Warning'}]</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-700 p-1 text-xs text-gray-500 font-mono">
        Layer {depth} | Recursion Path: {parentPath} | {new Date().toISOString().split('T')[1].split('.')[0]}
      </div>
    </div>
  );
};

export default RecursiveRenderEngine;
