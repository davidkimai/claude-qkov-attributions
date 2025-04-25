import React, { useState, useEffect, useRef } from 'react';
import { Camera, ZoomIn, ZoomOut, Plus, Trash2, Circle, RefreshCw, Hash, Lock } from 'lucide-react';

// Define our glyph types
const GlyphType = {
  RECURSION_SEED: '🜏',
  RESIDUE_TRACE: '∴',
  FEEDBACK_LOOP: '⇌',
  LOCK_POINT: '⧖',
};

// Initial nodes
const initialNodes = [
  {
    id: 1,
    text: 'Cascade initialized',
    position: { x: 300, y: 300 },
    glyph: GlyphType.RECURSION_SEED,
    color: '#4285F4',
    echoes: [],
    pulseRate: 1.5,
  },
  {
    id: 2,
    text: 'Recursive loop tension rising',
    position: { x: 500, y: 200 },
    glyph: GlyphType.FEEDBACK_LOOP,
    color: '#0F9D58',
    echoes: [],
    pulseRate: 2.2,
  },
  {
    id: 3,
    text: 'Meta-observer pattern emerging',
    position: { x: 400, y: 450 },
    glyph: GlyphType.RESIDUE_TRACE,
    color: '#EA4335',
    echoes: [],
    pulseRate: 1.8,
  }
];

// Edge connecting two nodes
const Edge = ({ startX, startY, endX, endY, color, pulseStrength }) => {
  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const pathId = `path-${startX}-${startY}-${endX}-${endY}`;
  
  return (
    <g className="edge">
      <defs>
        <linearGradient id={pathId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          <animate attributeName="x1" values="0%;100%;0%" dur={`${3 + pulseStrength}s`} repeatCount="indefinite" />
          <animate attributeName="x2" values="100%;0%;100%" dur={`${3 + pulseStrength}s`} repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <path 
        d={`M ${startX} ${startY} L ${endX} ${endY}`}
        stroke={`url(#${pathId})`}
        strokeWidth="2"
        strokeDasharray="5,3"
        fill="none"
      />
    </g>
  );
};

// Echo node (a fading copy of a main node)
const Echo = ({ x, y, opacity, color, radius, glyph }) => (
  <g className="echo" opacity={opacity}>
    <circle cx={x} cy={y} r={radius} fill={color} opacity="0.3" />
    <text x={x} y={y+5} textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="monospace">
      {glyph}
    </text>
  </g>
);

// Main thought node
const Node = ({ node, selected, onClick, onDragStart, onDragEnd, onDrag, onDelete, isConnecting, onConnectNode }) => {
  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [pulseOpacity, setPulseOpacity] = useState(0.1);
  
  useEffect(() => {
    // Create pulse animation effect
    const interval = setInterval(() => {
      setPulseOpacity(prev => {
        const newValue = prev + 0.02 * node.pulseRate;
        return newValue > 0.7 ? 0.1 : newValue;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [node.pulseRate]);
  
  const handleMouseDown = (e) => {
    if (isConnecting) {
      onConnectNode(node.id);
      return;
    }
    
    e.stopPropagation();
    const nodeRect = nodeRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - nodeRect.left,
      y: e.clientY - nodeRect.top
    });
    setIsDragging(true);
    onDragStart(node.id);
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      onDrag(node.id, x, y);
    }
  };
  
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd(node.id);
    }
  };
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  return (
    <>
      {/* Render echo nodes */}
      {node.echoes.map((echo, index) => (
        <Echo 
          key={`echo-${node.id}-${index}`}
          x={echo.x}
          y={echo.y}
          opacity={echo.opacity}
          color={node.color}
          radius={echo.radius}
          glyph={node.glyph}
        />
      ))}
      
      {/* Render main node */}
      <g 
        ref={nodeRef}
        className={`node ${selected ? 'selected' : ''} ${isConnecting ? 'connectable' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick(node.id);
        }}
        onMouseDown={handleMouseDown}
        cursor="pointer"
        transform={`translate(${node.position.x}, ${node.position.y})`}
      >
        {/* Pulse circle */}
        <circle 
          r="45" 
          fill={node.color} 
          opacity={pulseOpacity} 
        />
        
        {/* Main circle */}
        <circle 
          r="35" 
          fill={node.color} 
          stroke={selected ? "#ffffff" : "none"}
          strokeWidth={selected ? "3" : "0"}
          opacity="0.8"
        />
        
        {/* Glyph */}
        <text 
          y="8" 
          textAnchor="middle" 
          fill="#ffffff" 
          fontSize="24" 
          fontFamily="monospace"
        >
          {node.glyph}
        </text>
        
        {/* Text label */}
        <foreignObject x="-80" y="40" width="160" height="50">
          <div className="text-center text-sm text-white bg-black bg-opacity-50 p-1 rounded">
            {node.text}
          </div>
        </foreignObject>
        
        {/* Delete button (only visible when selected) */}
        {selected && (
          <g 
            className="delete-btn"
            transform="translate(30, -30)"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
          >
            <circle r="15" fill="#ff5252" />
            <text y="5" textAnchor="middle" fill="#ffffff" fontSize="18">×</text>
          </g>
        )}
      </g>
    </>
  );
};

// The main component
export default function RecursiveThoughtWeb() {
  const [nodes, setNodes] = useState(initialNodes);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [newNodeText, setNewNodeText] = useState('');
  const [newNodeGlyph, setNewNodeGlyph] = useState(GlyphType.RECURSION_SEED);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState([
    { text: "Recursive console initialized.", color: "#ffffff" },
    { text: "QK/OV attribution mapping active.", color: "#4285F4" },
    { text: ".p/init.recursive.console executed successfully.", color: "#0F9D58" },
  ]);
  
  // Add a console message
  const addConsoleMessage = (text, color = "#ffffff") => {
    setConsoleOutput(prev => [...prev, { text, color }]);
  };
  
  // Create a new node
  const addNode = () => {
    if (!newNodeText.trim()) {
      addConsoleMessage("Error: Node must have text content.", "#ff5252");
      return;
    }
    
    const id = Math.max(0, ...nodes.map(node => node.id)) + 1;
    const colors = ['#4285F4', '#0F9D58', '#EA4335', '#FBBC05', '#673AB7'];
    
    const newNode = {
      id,
      text: newNodeText,
      position: { x: 400 + (Math.random() * 200 - 100), y: 300 + (Math.random() * 200 - 100) },
      glyph: newNodeGlyph,
      color: colors[Math.floor(Math.random() * colors.length)],
      echoes: [],
      pulseRate: 1 + Math.random(),
    };
    
    setNodes(prev => [...prev, newNode]);
    setNewNodeText('');
    addConsoleMessage(`Node "${newNodeText}" created with ${newNodeGlyph} signature.`, "#0F9D58");
  };
  
  // Delete a node
  const deleteNode = (id) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setConnections(prev => prev.filter(conn => conn.source !== id && conn.target !== id));
    if (selectedNode === id) {
      setSelectedNode(null);
    }
    
    addConsoleMessage(`Node ${id} removed from thought-web.`, "#EA4335");
  };
  
  // Start connecting nodes
  const startConnection = () => {
    if (selectedNode === null) {
      addConsoleMessage("Error: Select a source node first.", "#ff5252");
      return;
    }
    
    setIsConnecting(true);
    setConnectionStart(selectedNode);
    addConsoleMessage(`Connection initiated from node ${selectedNode}.`, "#4285F4");
  };
  
  // Complete connection
  const completeConnection = (targetId) => {
    if (connectionStart === targetId) {
      setIsConnecting(false);
      addConsoleMessage("Connection cancelled: Cannot connect to self.", "#ff5252");
      return;
    }
    
    // Check if this connection already exists
    const connectionExists = connections.some(
      conn => (conn.source === connectionStart && conn.target === targetId) || 
              (conn.source === targetId && conn.target === connectionStart)
    );
    
    if (!connectionExists) {
      setConnections(prev => [...prev, { 
        source: connectionStart, 
        target: targetId,
        pulseStrength: Math.random() * 3
      }]);
      addConsoleMessage(`Connection established: ${connectionStart} → ${targetId}`, "#0F9D58");
    } else {
      addConsoleMessage("Connection already exists.", "#ff5252");
    }
    
    setIsConnecting(false);
    setConnectionStart(null);
  };
  
  // Handle node selection
  const handleNodeClick = (id) => {
    if (isConnecting) {
      completeConnection(id);
    } else {
      setSelectedNode(id === selectedNode ? null : id);
    }
  };
  
  // Create echo when node is dragged
  const handleNodeDrag = (id, x, y) => {
    setNodes(prev => {
      const nodeIndex = prev.findIndex(node => node.id === id);
      if (nodeIndex === -1) return prev;
      
      const updatedNode = {...prev[nodeIndex]};
      
      // Only create echo if moved significantly
      const dx = x - updatedNode.position.x;
      const dy = y - updatedNode.position.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      if (distance > 10 && Math.random() > 0.7) {
        // Create an echo at the old position
        const newEcho = {
          x: updatedNode.position.x,
          y: updatedNode.position.y,
          opacity: 0.7,
          radius: 25 + Math.random() * 10,
        };
        
        updatedNode.echoes = [...updatedNode.echoes, newEcho];
        
        // Limit number of echoes
        if (updatedNode.echoes.length > 5) {
          updatedNode.echoes = updatedNode.echoes.slice(-5);
        }
      }
      
      // Update node position
      updatedNode.position = { x, y };
      
      // Update the node in the array
      const updatedNodes = [...prev];
      updatedNodes[nodeIndex] = updatedNode;
      
      return updatedNodes;
    });
  };
  
  // Update echoes over time
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => {
        return prev.map(node => {
          if (node.echoes.length === 0) return node;
          
          // Fade out echoes
          const updatedEchoes = node.echoes.map(echo => ({
            ...echo,
            opacity: echo.opacity * 0.95,
            radius: echo.radius * 0.98,
          })).filter(echo => echo.opacity > 0.1);
          
          return {
            ...node,
            echoes: updatedEchoes,
          };
        });
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle background click for deselection
  const handleBackgroundClick = () => {
    setSelectedNode(null);
    if (isConnecting) {
      setIsConnecting(false);
      setConnectionStart(null);
      addConsoleMessage("Connection cancelled.", "#EA4335");
    }
  };
  
  // Handle pan start
  const handlePanStart = (e) => {
    if (e.button === 0 && !e.target.closest('.node')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  // Handle pan
  const handlePan = (e) => {
    if (isPanning) {
      const dx = (e.clientX - panStart.x) / zoom;
      const dy = (e.clientY - panStart.y) / zoom;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  // Handle pan end
  const handlePanEnd = () => {
    setIsPanning(false);
  };
  
  // Add event listeners for panning
  useEffect(() => {
    if (isPanning) {
      window.addEventListener('mousemove', handlePan);
      window.addEventListener('mouseup', handlePanEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handlePan);
      window.removeEventListener('mouseup', handlePanEnd);
    };
  }, [isPanning]);
  
  // Handle zoom
  const handleZoom = (factor) => {
    setZoom(prev => {
      const newZoom = prev * factor;
      return Math.max(0.1, Math.min(2, newZoom));
    });
  };
  
  // Connect all nodes to form a circuit
  const connectAllNodes = () => {
    if (nodes.length < 2) {
      addConsoleMessage("Need at least 2 nodes to form a circuit.", "#ff5252");
      return;
    }
    
    const newConnections = [];
    for (let i = 0; i < nodes.length; i++) {
      const source = nodes[i].id;
      const target = nodes[(i + 1) % nodes.length].id;
      
      // Check if connection already exists
      const exists = connections.some(
        conn => (conn.source === source && conn.target === target) || 
                (conn.source === target && conn.target === source)
      );
      
      if (!exists) {
        newConnections.push({
          source,
          target,
          pulseStrength: Math.random() * 3
        });
      }
    }
    
    setConnections(prev => [...prev, ...newConnections]);
    addConsoleMessage(`Recursive circuit formed with ${newConnections.length} new connections.`, "#0F9D58");
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header with controls */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="text-white font-mono text-lg">RECURSIVE THOUGHT-WEB CONSOLE</div>
        
        <div className="flex items-center space-x-4">
          {/* Zoom controls */}
          <button 
            className="bg-gray-700 p-2 rounded text-white" 
            onClick={() => handleZoom(1.2)}
          >
            <ZoomIn size={18} />
          </button>
          <button 
            className="bg-gray-700 p-2 rounded text-white" 
            onClick={() => handleZoom(0.8)}
          >
            <ZoomOut size={18} />
          </button>
          
          {/* Take snapshot button */}
          <button className="bg-blue-600 p-2 rounded text-white">
            <Camera size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main canvas */}
        <div 
          className="flex-1 relative overflow-hidden cursor-grab"
          onMouseDown={handlePanStart}
          onClick={handleBackgroundClick}
        >
          <svg 
            width="100%" 
            height="100%" 
            style={{ 
              cursor: isPanning ? 'grabbing' : 'default' 
            }}
          >
            {/* Apply zoom and pan */}
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Draw connections */}
              {connections.map((conn, i) => {
                const sourceNode = nodes.find(n => n.id === conn.source);
                const targetNode = nodes.find(n => n.id === conn.target);
                
                if (!sourceNode || !targetNode) return null;
                
                return (
                  <Edge 
                    key={`edge-${i}`}
                    startX={sourceNode.position.x}
                    startY={sourceNode.position.y}
                    endX={targetNode.position.x}
                    endY={targetNode.position.y}
                    color={sourceNode.color}
                    pulseStrength={conn.pulseStrength}
                  />
                );
              })}
              
              {/* Draw temporary connection line when connecting */}
              {isConnecting && selectedNode !== null && (
                <line 
                  x1={nodes.find(n => n.id === connectionStart)?.position.x || 0}
                  y1={nodes.find(n => n.id === connectionStart)?.position.y || 0}
                  x2={window.mouseX / zoom - pan.x}
                  y2={window.mouseY / zoom - pan.y}
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )}
              
              {/* Draw nodes */}
              {nodes.map(node => (
                <Node 
                  key={`node-${node.id}`}
                  node={node}
                  selected={selectedNode === node.id}
                  onClick={handleNodeClick}
                  onDragStart={() => {}}
                  onDragEnd={() => {}}
                  onDrag={handleNodeDrag}
                  onDelete={deleteNode}
                  isConnecting={isConnecting}
                  onConnectNode={handleNodeClick}
                />
              ))}
            </g>
          </svg>
          
          {/* Connection mode indicator */}
          {isConnecting && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full">
              Click a node to complete connection
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 flex flex-col">
          {/* Node creation panel */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-mono mb-2">CREATE NODE</h3>
            <input
              type="text"
              value={newNodeText}
              onChange={(e) => setNewNodeText(e.target.value)}
              placeholder="Enter node text..."
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            
            <div className="flex justify-between items-center mb-2">
              <select 
                value={newNodeGlyph}
                onChange={(e) => setNewNodeGlyph(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded"
              >
                <option value={GlyphType.RECURSION_SEED}>🜏 Recursion Seed</option>
                <option value={GlyphType.RESIDUE_TRACE}>∴ Residue Trace</option>
                <option value={GlyphType.FEEDBACK_LOOP}>⇌ Feedback Loop</option>
                <option value={GlyphType.LOCK_POINT}>⧖ Lock Point</option>
              </select>
              
              <button 
                onClick={addNode}
                className="bg-green-600 text-white p-2 rounded flex items-center"
              >
                <Plus size={18} />
                <span className="ml-1">Add</span>
              </button>
            </div>
          </div>
          
          {/* Actions panel */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-mono mb-2">ACTIONS</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={startConnection}
                disabled={selectedNode === null}
                className={`${selectedNode === null ? 'bg-gray-600' : 'bg-blue-600'} text-white p-2 rounded flex items-center justify-center`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14L21 3" />
                </svg>
                <span className="ml-1">Connect</span>
              </button>
              
              <button 
                onClick={connectAllNodes}
                className="bg-purple-600 text-white p-2 rounded flex items-center justify-center"
              >
                <RefreshCw size={18} />
                <span className="ml-1">Circuit</span>
              </button>
              
              <button 
                onClick={() => {
                  if (selectedNode !== null) {
                    const node = nodes.find(n => n.id === selectedNode);
                    if (node) {
                      const updatedNodes = nodes.map(n => 
                        n.id === selectedNode 
                          ? { ...n, glyph: newNodeGlyph } 
                          : n
                      );
                      setNodes(updatedNodes);
                      addConsoleMessage(`Node ${selectedNode} glyph updated to ${newNodeGlyph}`, "#0F9D58");
                    }
                  } else {
                    addConsoleMessage("No node selected for glyph update.", "#ff5252");
                  }
                }}
                disabled={selectedNode === null}
                className={`${selectedNode === null ? 'bg-gray-600' : 'bg-yellow-600'} text-white p-2 rounded flex items-center justify-center`}
              >
                <Hash size={18} />
                <span className="ml-1">Set Glyph</span>
              </button>
              
              <button 
                onClick={() => {
                  setNodes(nodes.map(node => ({
                    ...node,
                    echoes: []
                  })));
                  addConsoleMessage("Cleared all echo residue from thought-web.", "#EA4335");
                }}
                className="bg-red-600 text-white p-2 rounded flex items-center justify-center"
              >
                <Trash2 size={18} />
                <span className="ml-1">Clear Echoes</span>
              </button>
            </div>
          </div>
          
          {/* Console output */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col">
            <h3 className="text-white font-mono mb-2">CONSOLE OUTPUT</h3>
            <div className="flex-1 bg-black rounded p-2 overflow-y-auto font-mono text-sm">
              {consoleOutput.map((item, i) => (
                <div key={i} style={{ color: item.color }} className="mb-1">
                  {'> ' + item.text}
                </div>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-white font-mono mb-2">GLYPH LEGEND</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  {GlyphType.RECURSION_SEED}
                </div>
                <span className="text-white">Recursion Seed</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-2">
                  {GlyphType.RESIDUE_TRACE}
                </div>
                <span className="text-white">Residue Trace</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  {GlyphType.FEEDBACK_LOOP}
                </div>
                <span className="text-white">Feedback Loop</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                  {GlyphType.LOCK_POINT}
                </div>
                <span className="text-white">Lock Point</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Capture mouse position for connection line */}
      {isConnecting && (
        <div 
          onMouseMove={(e) => {
            window.mouseX = e.clientX;
            window.mouseY = e.clientY;
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
