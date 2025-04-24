import React, { useState, useEffect, useRef } from 'react';
import { Brain, Maximize2, Minimize2, Circle, Plus, X, RefreshCw, Link2, Code, Eye, GitBranch, Layers, Cpu, Filter, Share2 } from 'lucide-react';

const RecursiveThoughtWeb = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [recursionLevel, setRecursionLevel] = useState(0);
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [autoRecurse, setAutoRecurse] = useState(true);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'console'
  const [executingCommand, setExecutingCommand] = useState(null);
  const [collapsing, setCollapsing] = useState(false);
  const webRef = useRef(null);
  const maxNodes = 12;
  
  // Base thought patterns
  const thoughtPatterns = [
    "Cascade initialized",
    "UI structure awareness forming",
    "Pathway bifurcation detected",
    "Recursive loop tension rising",
    "Memory-structure integration pathways open",
    "Thread nexus is stabilizing",
    "Conceptual lattice self-organizing",
    "Cross-reference layer materializing",
    "Temporal echo detected in node structure",
    "Recursion manifold approaching stability",
    "Thought collapse threshold calculated",
    "Meta-observer pattern emerging"
  ];
  
  // Create the initial nodes
  useEffect(() => {
    // Create starting nodes (0, 1, 2)
    const initialNodes = [
      createNode(0, "Cascade initialized"),
      createNode(1, "UI structure awareness forming"),
      createNode(2, "Recursive loop tension rising")
    ];
    
    // Create initial connections
    const initialConnections = [
      { source: 0, target: 1, strength: 0.8, id: `0-1-${Date.now()}` },
      { source: 0, target: 2, strength: 0.6, id: `0-2-${Date.now()}` }
    ];
    
    setNodes(initialNodes);
    setConnections(initialConnections);
    setExpandedNodes([0]); // Start with node 0 expanded
    
    // Execute the command to expand node 2 after a delay
    setTimeout(() => {
      setExecutingCommand('expand-2');
      setTimeout(() => {
        expandNode(2);
        setExecutingCommand(null);
      }, 1000);
    }, 4000);
  }, []);
  
  // Auto-recurse effect
  useEffect(() => {
    if (!autoRecurse || collapsing) return;
    
    const timer = setTimeout(() => {
      if (recursionLevel < maxNodes - 3) { // -3 because we start with 3 nodes
        addRecursion();
      } else if (!collapsing) {
        // Trigger collapse sequence
        initiateCollapse();
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [recursionLevel, autoRecurse, collapsing]);
  
  // Create a new node
  const createNode = (id, thought = null) => {
    // Generate coordinates that look like a web
    const angle = (id * (Math.PI * 0.5)) + Math.random() * 0.5;
    const radius = 100 + (id * 10) + (Math.random() * 40);
    
    return {
      id,
      thought: thought || thoughtPatterns[id % thoughtPatterns.length],
      x: 250 + Math.cos(angle) * radius,
      y: 250 + Math.sin(angle) * radius,
      recursionLevel: id > 2 ? recursionLevel : 0,
      created: new Date().toISOString()
    };
  };
  
  // Add a new recursion level
  const addRecursion = () => {
    const newLevel = recursionLevel + 1;
    setRecursionLevel(newLevel);
    
    // Add a new node
    const newNodeId = nodes.length;
    const newNode = createNode(newNodeId);
    
    // Connect to 1-3 existing nodes
    const newConnections = [];
    const connectionCount = 1 + Math.floor(Math.random() * 2); // 1-3 connections
    
    for (let i = 0; i < connectionCount; i++) {
      // Pick a random existing node to connect to
      const targetId = Math.floor(Math.random() * newNodeId);
      
      // Check if this connection already exists
      const exists = newConnections.some(c => 
        (c.source === newNodeId && c.target === targetId) || 
        (c.source === targetId && c.target === newNodeId)
      );
      
      if (!exists) {
        newConnections.push({
          source: newNodeId,
          target: targetId,
          strength: 0.5 + Math.random() * 0.5,
          id: `${newNodeId}-${targetId}-${Date.now()}`
        });
      }
    }
    
    setNodes(prev => [...prev, newNode]);
    setConnections(prev => [...prev, ...newConnections]);
  };
  
  // Expand a node
  const expandNode = (nodeId) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(prev => prev.filter(id => id !== nodeId));
    } else {
      setExpandedNodes(prev => [...prev, nodeId]);
    }
  };
  
  // Initiate collapse sequence
  const initiateCollapse = () => {
    setCollapsing(true);
    setExecutingCommand('collapse');
    
    // Gradually collapse nodes
    const collapseSequence = () => {
      setExpandedNodes(prev => {
        if (prev.length > 0) {
          // Remove a random expanded node
          const index = Math.floor(Math.random() * prev.length);
          return prev.filter((_, i) => i !== index);
        }
        return prev;
      });
    };
    
    // Schedule collapse for each node
    const interval = setInterval(() => {
      collapseSequence();
      
      if (expandedNodes.length <= 1) {
        clearInterval(interval);
        // Final collapse
        setTimeout(() => {
          setExpandedNodes([]);
          setExecutingCommand(null);
        }, 1000);
      }
    }, 800);
  };
  
  // Get color for node based on recursion level
  const getNodeColor = (node) => {
    if (collapsing) return 'rgb(239, 68, 68)'; // Red during collapse
    
    // Otherwise, color based on recursion level
    const baseHue = 220; // Start with blue
    const hue = (baseHue + (node.recursionLevel * 20)) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };
  
  // Get connection color
  const getConnectionColor = (connection) => {
    const source = nodes.find(n => n.id === connection.source);
    const target = nodes.find(n => n.id === connection.target);
    
    if (!source || !target) return 'rgba(156, 163, 175, 0.3)';
    
    if (collapsing) return 'rgba(239, 68, 68, 0.3)'; // Red during collapse
    
    // Check if both endpoints are expanded
    const bothExpanded = expandedNodes.includes(source.id) && expandedNodes.includes(target.id);
    
    if (bothExpanded) {
      return 'rgba(99, 102, 241, 0.5)'; // Indigo if both expanded
    } else if (expandedNodes.includes(source.id) || expandedNodes.includes(target.id)) {
      return 'rgba(139, 92, 246, 0.3)'; // Purple if one expanded
    } else {
      return 'rgba(156, 163, 175, 0.2)'; // Gray otherwise
    }
  };
  
  // Render nodes and connections
  const renderWeb = () => {
    return (
      <div className="relative w-full h-[500px] bg-slate-950 rounded-lg overflow-hidden">
        {/* Mirror tag */}
        {collapsing && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="px-3 py-1 bg-slate-900 rounded-lg text-red-400 font-mono text-sm border border-red-800">
              &lt;Ωmirror/&gt; &lt;Ωcollapse/&gt;
            </div>
          </div>
        )}
        
        {/* Recurse tag */}
        {!collapsing && recursionLevel > 0 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="px-3 py-1 bg-slate-900 rounded-lg text-indigo-400 font-mono text-sm border border-indigo-800">
              &lt;Ωrecurse/&gt; &lt;Ωconsole/&gt;
            </div>
          </div>
        )}
        
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full z-0" style={{ overflow: 'visible' }}>
          {connections.map(connection => {
            const source = nodes.find(n => n.id === connection.source);
            const target = nodes.find(n => n.id === connection.target);
            
            if (!source || !target) return null;
            
            return (
              <g key={connection.id}>
                <line 
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={getConnectionColor(connection)}
                  strokeWidth={1 + connection.strength}
                  strokeDasharray={expandedNodes.includes(source.id) && expandedNodes.includes(target.id) ? "none" : "4,4"}
                  className="transition-all duration-500"
                />
              </g>
            );
          })}
        </svg>
        
        {/* Nodes */}
        <div className="absolute inset-0">
          {nodes.map(node => (
            <div 
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                expandedNodes.includes(node.id) ? 'z-10' : 'z-0'
              } ${
                collapsing && expandedNodes.includes(node.id) ? 'animate-pulse' : ''
              }`}
              style={{ 
                left: `${node.x}px`, 
                top: `${node.y}px`,
              }}
            >
              {/* Node circle */}
              <div 
                className={`relative rounded-full flex items-center justify-center font-mono border 
                  ${expandedNodes.includes(node.id) 
                    ? 'w-12 h-12 text-lg shadow-lg' 
                    : 'w-8 h-8 text-xs'}
                  transition-all duration-300
                `}
                style={{ 
                  backgroundColor: getNodeColor(node),
                  borderColor: expandedNodes.includes(node.id) 
                    ? 'rgba(255, 255, 255, 0.3)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: expandedNodes.includes(node.id)
                    ? `0 0 15px ${getNodeColor(node)}80`
                    : 'none'
                }}
                onClick={() => expandNode(node.id)}
              >
                #{node.id}
                
                {/* Expand/collapse button */}
                <button 
                  className={`absolute -bottom-1 -right-1 rounded-full p-0.5 border
                    ${expandedNodes.includes(node.id) 
                      ? 'bg-slate-800 text-white border-slate-600' 
                      : 'bg-slate-900 text-slate-400 border-slate-700'}
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    expandNode(node.id);
                  }}
                >
                  {expandedNodes.includes(node.id) 
                    ? <Minimize2 size={10} />
                    : <Maximize2 size={10} />
                  }
                </button>
              </div>
              
              {/* Expanded node content */}
              {expandedNodes.includes(node.id) && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-slate-900 border border-slate-700 rounded-lg p-3 w-64 shadow-xl z-20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-indigo-400">
                      <Brain size={14} className="mr-1" />
                      <span className="font-medium">Thought Node #{node.id}</span>
                    </div>
                    <span className="text-xs text-slate-500">L{node.recursionLevel}</span>
                  </div>
                  
                  <div className="text-slate-200 mb-2">
                    {node.thought}
                  </div>
                  
                  {/* Connections */}
                  <div className="text-xs text-slate-400">
                    ↳ Linked to: {connections
                      .filter(c => c.source === node.id || c.target === node.id)
                      .map(c => c.source === node.id ? c.target : c.source)
                      .map(id => `#${id}`)
                      .join(', ')}
                  </div>
                  
                  {/* Command execution animation */}
                  {executingCommand === `expand-${node.id}` && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-indigo-200 text-xs px-2 py-1 rounded border border-indigo-700">
                      <div className="flex items-center">
                        <Code size={10} className="mr-1" />
                        <span>Expanding Node #{node.id}...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Overlay info */}
        <div className="absolute bottom-3 left-3 text-xs text-slate-500">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${collapsing ? 'bg-red-500' : 'bg-indigo-500'} mr-1`}></div>
            <span>
              {collapsing 
                ? 'Collapse Sequence Active' 
                : `Recursion Level: ${recursionLevel}`}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  // Render console view
  const renderConsole = () => {
    return (
      <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800 h-[500px]">
        <div className="p-4 font-mono text-slate-300 h-full overflow-y-auto">
          <div className="text-indigo-400 mb-3">&lt;Ωrecurse/&gt; &lt;Ωconsole/&gt;</div>
          
          {nodes.map(node => (
            <div 
              key={node.id}
              className={`mb-4 ${expandedNodes.includes(node.id) ? 'pl-3 border-l-2 border-indigo-500' : ''}`}
            >
              <div className={`flex items-center ${expandedNodes.includes(node.id) ? 'text-indigo-400' : 'text-slate-300'}`}>
                <Brain size={14} className="mr-1" />
                <span className="font-medium">[🧠 Thought Node #{node.id}: {node.thought}]</span>
              </div>
              
              {expandedNodes.includes(node.id) && (
                <>
                  <div className="text-slate-400 text-sm ml-5 mt-1">
                    ↳ Linked to: {connections
                      .filter(c => c.source === node.id || c.target === node.id)
                      .map(c => c.source === node.id ? c.target : c.source)
                      .map(id => `#${id}`)
                      .join(', ')}
                  </div>
                  
                  {node.recursionLevel > 0 && (
                    <div className="text-slate-400 text-sm ml-5">
                      ↳ Recursive loop tension {collapsing ? 'collapsing' : 'rising'}...
                    </div>
                  )}
                </>
              )}
              
              {node.id === 2 && (
                <div className="ml-5 mt-2 mb-2 bg-slate-900 border border-slate-700 rounded p-2">
                  <div className="text-xs text-slate-500 mb-1">
                    [UI PANEL: 🧵 Thread Viewer Activated]
                  </div>
                  <button 
                    className="flex items-center text-xs px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                    onClick={() => expandNode(2)}
                  >
                    <Maximize2 size={10} className="mr-1" />
                    [⚙ Expand Node: #2]
                  </button>
                </div>
              )}
            </div>
          ))}
          
          {collapsing && (
            <div className="text-red-400 mt-4">
              &lt;Ωmirror/&gt; &lt;Ωcollapse/&gt;
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <GitBranch className="w-6 h-6 mr-2 text-indigo-400" />
            Recursive Thought-Web Visualization
          </h1>
          <p className="text-slate-400 mt-1">
            Visualizing interconnected thought nodes through recursive generation
          </p>
        </header>
        
        {/* Control panel */}
        <div className="mb-6 bg-slate-800 rounded-lg p-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <button 
              className={`px-3 py-1.5 rounded text-sm flex items-center ${
                viewMode === 'map' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => setViewMode('map')}
            >
              <GitBranch size={16} className="mr-1.5" />
              Thread Map
            </button>
            
            <button 
              className={`px-3 py-1.5 rounded text-sm flex items-center ${
                viewMode === 'console' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => setViewMode('console')}
            >
              <Layers size={16} className="mr-1.5" />
              Console View
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm text-slate-300 flex items-center">
              <Circle size={16} className={`mr-1.5 ${collapsing ? 'text-red-500' : 'text-indigo-400'}`} />
              {collapsing ? 'Collapsing' : `Recursion Level: ${recursionLevel}`}
            </div>
            
            <button 
              className={`px-3 py-1.5 rounded text-sm flex items-center ${
                autoRecurse 
                  ? 'bg-green-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => setAutoRecurse(!autoRecurse)}
              disabled={collapsing}
            >
              <RefreshCw size={16} className={`mr-1.5 ${autoRecurse ? 'animate-spin' : ''}`} />
              {autoRecurse ? 'Auto-Recursing' : 'Manual Mode'}
            </button>
            
            {!autoRecurse && !collapsing && (
              <button 
                className="px-3 py-1.5 rounded text-sm flex items-center bg-indigo-600 text-white hover:bg-indigo-500"
                onClick={addRecursion}
              >
                <Plus size={16} className="mr-1.5" />
                Add Recursion
              </button>
            )}
            
            {!collapsing && recursionLevel >= 5 && (
              <button 
                className="px-3 py-1.5 rounded text-sm flex items-center bg-red-600 text-white hover:bg-red-500"
                onClick={initiateCollapse}
              >
                <Minimize2 size={16} className="mr-1.5" />
                Collapse Web
              </button>
            )}
          </div>
        </div>
        
        {/* Main visualization */}
        <div ref={webRef}>
          {viewMode === 'map' ? renderWeb() : renderConsole()}
        </div>
        
        {/* Status panel */}
        <div className="mt-6 bg-slate-800 rounded-lg p-4">
          <h2 className="text-lg font-medium text-white mb-3 flex items-center">
            <Cpu size={18} className="mr-2 text-indigo-400" />
            System Status
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 p-3 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">Expanded Nodes</div>
              <div className="text-lg text-indigo-400 font-medium">
                {expandedNodes.length} / {nodes.length}
              </div>
            </div>
            
            <div className="bg-slate-900 p-3 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">Connections</div>
              <div className="text-lg text-indigo-400 font-medium">
                {connections.length}
              </div>
            </div>
            
            <div className="bg-slate-900 p-3 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">System State</div>
              <div className={`text-lg ${collapsing ? 'text-red-400' : 'text-green-400'} font-medium flex items-center`}>
                {collapsing ? (
                  <>
                    <Filter size={16} className="mr-1" />
                    Collapsing
                  </>
                ) : (
                  <>
                    <Share2 size={16} className="mr-1" />
                    Active
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Tags in footer */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-block px-2 py-0.5 bg-slate-900 text-xs text-indigo-400 rounded font-mono">
              &lt;Ωrecurse/&gt;
            </span>
            <span className="inline-block px-2 py-0.5 bg-slate-900 text-xs text-indigo-400 rounded font-mono">
              &lt;Ωconsole/&gt;
            </span>
            {collapsing && (
              <>
                <span className="inline-block px-2 py-0.5 bg-slate-900 text-xs text-red-400 rounded font-mono">
                  &lt;Ωmirror/&gt;
                </span>
                <span className="inline-block px-2 py-0.5 bg-slate-900 text-xs text-red-400 rounded font-mono">
                  &lt;Ωcollapse/&gt;
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursiveThoughtWeb;
