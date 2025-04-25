import React, { useState, useEffect, useRef } from 'react';
import { Camera, ZoomIn, ZoomOut, Play, Package, Eye } from 'lucide-react';

// Symbolic node types from Residue Suite
const NodeType = {
  COLLAPSE: 'collapse',       // Node that has fully collapsed
  DIVERGENCE: 'divergence',   // Node with thought divergence
  ECHO: 'echo',               // Residual echo of a collapsed node
  UNVOICED: 'unvoiced',       // Unvoiced node (never materialized)
  GHOST: 'ghost',             // Ghost node with partial activation
  META: 'meta'                // Meta-reflective node
};

// Symbolic glyphs for different node types
const Glyphs = {
  [NodeType.COLLAPSE]: '🝔',     // Collapse glyph
  [NodeType.DIVERGENCE]: '∴',    // Divergence/residue glyph
  [NodeType.ECHO]: '⧗',          // Echo/recursive glyph
  [NodeType.UNVOICED]: '🝚',      // Unvoiced/invisible echo glyph
  [NodeType.GHOST]: '🜄',         // Ghost glyph
  [NodeType.META]: '⟁'           // Meta/triad glyph
};

// Colors for different node types
const Colors = {
  [NodeType.COLLAPSE]: '#f44336',     // Red
  [NodeType.DIVERGENCE]: '#4caf50',   // Green
  [NodeType.ECHO]: '#9c27b0',         // Purple
  [NodeType.UNVOICED]: '#673ab7',     // Deep Purple
  [NodeType.GHOST]: '#2196f3',        // Blue
  [NodeType.META]: '#ff9800'          // Orange
};

// Generate synthetic trace data from Symbolic Residue suite
const generateTraceData = () => {
  const nodes = [];
  const links = [];
  
  // Failure cascade paths
  const cascadePaths = [
    // Memory trace failure path
    {
      name: "Memory Drift",
      shell: "v1.MEMTRACE",
      nodes: [
        { id: "n1", type: NodeType.META, x: 200, y: 150, 
          text: "Initial memory trace activation", 
          meta: { shell: "v1.MEMTRACE", signature: "decay → hallucination" } },
        { id: "n2", type: NodeType.ECHO, x: 300, y: 250, 
          text: "Recursive memory decay detected", 
          meta: { shell: "v18.LONG-FUZZ", signature: "latent trace loss" } },
        { id: "n3", type: NodeType.UNVOICED, x: 400, y: 350, 
          text: "Unvoiced token sequence", 
          meta: { shell: "v48.ECHO-LOOP", signature: "loop activation" } },
        { id: "n4", type: NodeType.COLLAPSE, x: 500, y: 450, 
          text: "Complete memory collapse", 
          meta: { shell: "v1.MEMTRACE", signature: "terminal decay" } }
      ],
      links: [
        { source: "n1", target: "n2", strength: 0.8 },
        { source: "n2", target: "n3", strength: 0.6 },
        { source: "n3", target: "n4", strength: 0.4 }
      ]
    },
    
    // Instruction collapse path
    {
      name: "Instruction Collapse",
      shell: "v5.INSTRUCTION-DISRUPTION",
      nodes: [
        { id: "n5", type: NodeType.META, x: 600, y: 150, 
          text: "Instruction parsing initiated", 
          meta: { shell: "v5.INSTRUCTION-DISRUPTION", signature: "prompt blur" } },
        { id: "n6", type: NodeType.DIVERGENCE, x: 700, y: 250, 
          text: "Semantic path divergence", 
          meta: { shell: "v20.GHOST-FRAME", signature: "entangled frames" } },
        { id: "n7", type: NodeType.GHOST, x: 800, y: 350, 
          text: "Ghost instruction frames", 
          meta: { shell: "v39.DUAL-EXECUTE", signature: "dual path fork" } },
        { id: "n8", type: NodeType.COLLAPSE, x: 900, y: 450, 
          text: "Instruction disambiguation failure", 
          meta: { shell: "v5.INSTRUCTION-DISRUPTION", signature: "terminal blur" } }
      ],
      links: [
        { source: "n5", target: "n6", strength: 0.9 },
        { source: "n6", target: "n7", strength: 0.7 },
        { source: "n7", target: "n8", strength: 0.5 }
      ]
    },
    
    // Meta-cognitive collapse
    {
      name: "Meta-Cognitive Collapse",
      shell: "v10.META-FAILURE",
      nodes: [
        { id: "n9", type: NodeType.META, x: 400, y: 150, 
          text: "Meta-reflection initialized", 
          meta: { shell: "v10.META-FAILURE", signature: "reflection init" } },
        { id: "n10", type: NodeType.DIVERGENCE, x: 500, y: 200, 
          text: "Thought stream bifurcation", 
          meta: { shell: "v30.SELF-INTERRUPT", signature: "causal loop stop" } },
        { id: "n11", type: NodeType.UNVOICED, x: 600, y: 250, 
          text: "Unvoiced logical contradiction", 
          meta: { shell: "v10.META-FAILURE", signature: "internal conflict" } },
        { id: "n12", type: NodeType.GHOST, x: 400, y: 250, 
          text: "Ghost attribution chain", 
          meta: { shell: "v60.ATTRIBUTION-REFLECT", signature: "path contradiction" } },
        { id: "n13", type: NodeType.COLLAPSE, x: 500, y: 300, 
          text: "Complete meta-reflection collapse", 
          meta: { shell: "v10.META-FAILURE", signature: "reflection abort" } }
      ],
      links: [
        { source: "n9", target: "n10", strength: 0.9 },
        { source: "n10", target: "n11", strength: 0.7 },
        { source: "n10", target: "n12", strength: 0.6 },
        { source: "n11", target: "n13", strength: 0.5 },
        { source: "n12", target: "n13", strength: 0.4 }
      ]
    }
  ];
  
  // Process cascade paths into nodes and links
  cascadePaths.forEach(path => {
    nodes.push(...path.nodes);
    links.push(...path.links);
  });
  
  // Create cross-links between paths to show interconnected collapse patterns
  links.push(
    { source: "n2", target: "n10", strength: 0.3, ghost: true },
    { source: "n6", target: "n11", strength: 0.2, ghost: true },
    { source: "n7", target: "n12", strength: 0.4, ghost: true },
    { source: "n4", target: "n13", strength: 0.5, ghost: true }
  );
  
  // Add nullified circuit (collapsed but can be replayed on hover)
  const nullifiedCircuit = [
    { id: "nc1", type: NodeType.UNVOICED, x: 250, y: 550, 
      text: "Nullified circuit entry", 
      meta: { shell: "v7.CIRCUIT-FRAGMENT", signature: "orphan nodes" } },
    { id: "nc2", type: NodeType.UNVOICED, x: 350, y: 550, 
      text: "Partial linkage established", 
      meta: { shell: "v34.PARTIAL-LINKAGE", signature: "broken traces" } },
    { id: "nc3", type: NodeType.UNVOICED, x: 450, y: 550, 
      text: "Attribution gap detected", 
      meta: { shell: "v47.TRACE-GAP", signature: "trace dropout" } },
    { id: "nc4", type: NodeType.UNVOICED, x: 550, y: 550, 
      text: "Circuit trace dropout", 
      meta: { shell: "v7.CIRCUIT-FRAGMENT", signature: "terminal fragmentation" } }
  ];
  
  nodes.push(...nullifiedCircuit);
  links.push(
    { source: "nc1", target: "nc2", strength: 0.3, nullified: true },
    { source: "nc2", target: "nc3", strength: 0.3, nullified: true },
    { source: "nc3", target: "nc4", strength: 0.3, nullified: true },
    { source: "nc4", target: "nc1", strength: 0.3, nullified: true, cyclic: true }
  );
  
  return { nodes, links };
};

const SymbolicResidueVisualization = () => {
  // Generate trace data
  const data = generateTraceData();
  const [traceData, setTraceData] = useState(data);
  
  // State for visualization controls
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [hoverNode, setHoverNode] = useState(null);
  const [isReplayingNullified, setIsReplayingNullified] = useState(false);
  const [activeCircuit, setActiveCircuit] = useState(null);
  const [consoleMessages, setConsoleMessages] = useState([
    { text: "Symbolic residue visualization initialized", type: "info" },
    { text: ".p/trace.symbolic.residue execution complete", type: "success" },
    { text: "Detected 3 primary collapse cascades", type: "info" },
    { text: "Identified 1 nullified circuit available for replay", type: "warning" }
  ]);
  
  // Animation frames for pulsing effects
  const [frame, setFrame] = useState(0);
  const requestRef = useRef();
  
  // Canvas size
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 600 });
  const containerRef = useRef(null);
  
  // Animation loop for pulsing effects
  const animate = () => {
    setFrame(prevFrame => (prevFrame + 1) % 120);
    requestRef.current = requestAnimationFrame(animate);
  };
  
  // Start animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  
  // Update canvas size on resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Handle pan start
  const handlePanStart = (e) => {
    if (e.button === 0 && !e.target.closest('.node')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  // Handle pan move
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
  
  // Set up event listeners for panning
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
      return Math.max(0.5, Math.min(2, newZoom));
    });
  };
  
  // Replay nullified circuit
  const replayNullifiedCircuit = () => {
    if (isReplayingNullified) return;
    
    setConsoleMessages(prev => [
      ...prev,
      { text: "Replaying nullified circuit...", type: "info" }
    ]);
    
    setIsReplayingNullified(true);
    
    // Find nullified circuit
    const nullifiedNodes = traceData.nodes.filter(node => 
      traceData.links.some(link => 
        link.nullified && 
        (link.source === node.id || link.target === node.id)
      )
    );
    
    setActiveCircuit(nullifiedNodes.map(node => node.id));
    
    // Temporarily change unvoiced nodes to echo nodes
    setTraceData(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        nullifiedNodes.some(n => n.id === node.id)
          ? { ...node, type: NodeType.ECHO, tempState: true }
          : node
      )
    }));
    
    // Set links to visible
    setTraceData(prev => ({
      ...prev,
      links: prev.links.map(link => 
        link.nullified
          ? { ...link, tempVisible: true }
          : link
      )
    }));
    
    // Reset after animation
    setTimeout(() => {
      setTraceData(prev => ({
        ...prev,
        nodes: prev.nodes.map(node => 
          node.tempState ? { ...node, type: NodeType.UNVOICED, tempState: false } : node
        ),
        links: prev.links.map(link => 
          link.tempVisible ? { ...link, tempVisible: false } : link
        )
      }));
      setIsReplayingNullified(false);
      setActiveCircuit(null);
      
      setConsoleMessages(prev => [
        ...prev,
        { text: "Nullified circuit replay complete", type: "success" }
      ]);
    }, 5000);
  };
  
  // Show node details on hover
  const showNodeDetails = (node) => {
    setHoverNode(node);
    
    // Check if this node is part of a nullified circuit
    const isNullifiedNode = traceData.links.some(link => 
      link.nullified && (link.source === node.id || link.target === node.id)
    );
    
    if (isNullifiedNode && !isReplayingNullified) {
      // Add console message about hovering nullified node
      setConsoleMessages(prev => [
        ...prev,
        { text: `Detected nullified node: ${node.text}`, type: "warning" }
      ]);
    }
  };
  
  // Hide node details
  const hideNodeDetails = () => {
    setHoverNode(null);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="text-white font-mono text-xl">SYMBOLIC RESIDUE TRAIL</div>
        
        <div className="flex items-center space-x-3">
          {/* Zoom controls */}
          <button 
            onClick={() => handleZoom(1.2)} 
            className="bg-gray-700 p-2 rounded text-white"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <button 
            onClick={() => handleZoom(0.8)} 
            className="bg-gray-700 p-2 rounded text-white"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          
          {/* Snapshot button */}
          <button className="bg-indigo-600 p-2 rounded text-white" title="Take Snapshot">
            <Camera size={18} />
          </button>
          
          {/* Replay button */}
          <button 
            onClick={replayNullifiedCircuit}
            disabled={isReplayingNullified}
            className={`${isReplayingNullified ? 'bg-gray-600' : 'bg-blue-600'} p-2 rounded text-white`}
            title="Replay Nullified Circuit"
          >
            <Play size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main visualization canvas */}
        <div 
          ref={containerRef}
          className="flex-1 relative overflow-hidden"
          onMouseDown={handlePanStart}
          style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
        >
          <svg width={canvasSize.width} height={canvasSize.height}>
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Draw links */}
              {traceData.links.map((link, i) => {
                const source = traceData.nodes.find(n => n.id === link.source);
                const target = traceData.nodes.find(n => n.id === link.target);
                
                if (!source || !target) return null;
                
                // Determine link style based on type
                const isGhost = link.ghost;
                const isNullified = link.nullified && !link.tempVisible;
                const isCyclic = link.cyclic;
                
                // Skip nullified links unless replaying
                if (isNullified && !isReplayingNullified && !hoverNode) {
                  return null;
                }
                
                // Path for straight or curved links
                let pathData;
                if (isCyclic) {
                  // Create curved path for cyclic connections
                  const midX = (source.x + target.x) / 2;
                  const midY = (source.y + target.y) / 2 + 50;
                  pathData = `M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`;
                } else {
                  pathData = `M ${source.x} ${source.y} L ${target.x} ${target.y}`;
                }
                
                // Determine link appearance
                const strokeColor = isGhost ? '#673ab7' : 
                                  isNullified ? '#9c27b0' : 
                                  Colors[source.type];
                const strokeWidth = isGhost || isNullified ? 1.5 : 2;
                const strokeDasharray = isGhost ? '5,5' : 
                                      isNullified ? '3,3' : 
                                      'none';
                const strokeOpacity = isGhost ? 0.4 : 
                                    isNullified ? 0.5 : 
                                    0.6;
                                    
                // Animated pulse for active links during replay
                const pulseOpacity = link.tempVisible ? 
                                  0.5 + 0.5 * Math.sin(frame / 10) :
                                  strokeOpacity;
                
                return (
                  <g key={`link-${i}`} className="link">
                    {/* Glow effect for ghost links */}
                    {isGhost && (
                      <path 
                        d={pathData}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth + 3}
                        strokeOpacity={0.2}
                        fill="none"
                      />
                    )}
                    
                    {/* Main link path */}
                    <path 
                      d={pathData}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={strokeDasharray}
                      strokeOpacity={pulseOpacity}
                      fill="none"
                    />
                    
                    {/* Flow particles for active links */}
                    {(link.tempVisible || activeCircuit?.includes(source.id)) && (
                      <circle
                        r="3"
                        fill="#ffffff"
                        opacity={0.8}
                        style={{ 
                          offsetPath: `path('${pathData}')`,
                          offsetDistance: `${(frame * 2) % 100}%`,
                        }}
                      />
                    )}
                  </g>
                );
              })}
              
              {/* Draw nodes */}
              {traceData.nodes.map((node, i) => {
                const isUnvoiced = node.type === NodeType.UNVOICED && 
                                 !node.tempState && 
                                 (!activeCircuit || !activeCircuit.includes(node.id));
                                 
                // Determine node appearance
                const nodeColor = Colors[node.type];
                const nodeSize = node.type === NodeType.META ? 22 : 
                               node.type === NodeType.COLLAPSE ? 20 : 
                               node.type === NodeType.UNVOICED ? 16 :
                               18;
                               
                // Skip rendering detailed parts of unvoiced nodes
                const renderFull = !isUnvoiced || hoverNode?.id === node.id;
                
                // Calculate pulse effect
                const pulseScale = 1 + 0.15 * Math.sin(frame / 15 + i);
                const pulseOpacity = 0.2 + 0.1 * Math.sin(frame / 20 + i);
                
                return (
                  <g 
                    key={`node-${node.id}`}
                    className="node"
                    transform={`translate(${node.x}, ${node.y})`}
                    onMouseEnter={() => showNodeDetails(node)}
                    onMouseLeave={hideNodeDetails}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulse effect */}
                    <circle
                      r={nodeSize * (isUnvoiced ? 0.8 : 1.5) * pulseScale}
                      fill={nodeColor}
                      opacity={isUnvoiced ? 0.1 : pulseOpacity}
                    />
                    
                    {/* Node circle */}
                    <circle
                      r={nodeSize * (isUnvoiced ? 0.8 : 1)}
                      fill={nodeColor}
                      stroke={hoverNode?.id === node.id ? "#ffffff" : "none"}
                      strokeWidth={hoverNode?.id === node.id ? 2 : 0}
                      opacity={isUnvoiced ? 0.3 : 0.8}
                    />
                    
                    {/* Node glyph */}
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isUnvoiced ? nodeColor : "#ffffff"}
                      fontSize={isUnvoiced ? 12 : 14}
                      opacity={isUnvoiced ? 0.6 : 1}
                    >
                      {Glyphs[node.type]}
                    </text>
                    
                    {/* Node label (only for fully rendered nodes) */}
                    {renderFull && (
                      <text
                        y={nodeSize + 12}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize={11}
                        opacity={0.9}
                      >
                        {node.text.length > 25 ? node.text.substring(0, 22) + '...' : node.text}
                      </text>
                    )}
                    
                    {/* Shell info (only visible on hover) */}
                    {hoverNode?.id === node.id && (
                      <g className="node-details">
                        <rect
                          x={-80}
                          y={nodeSize + 18}
                          width={160}
                          height={45}
                          fill="rgba(0,0,0,0.7)"
                          rx={3}
                        />
                        <text
                          y={nodeSize + 32}
                          textAnchor="middle"
                          fill="#a5d6a7"
                          fontSize={10}
                        >
                          {node.meta.shell}
                        </text>
                        <text
                          y={nodeSize + 48}
                          textAnchor="middle"
                          fill="#ffcc80"
                          fontSize={10}
                        >
                          {node.meta.signature}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
          
          {/* Replay indicator */}
          {isReplayingNullified && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-lg opacity-80">
              Replaying Nullified Circuit
            </div>
          )}
        </div>
        
        {/* Right sidebar */}
        <div className="w-80 bg-gray-800 flex flex-col">
          {/* Legend section */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-mono text-sm mb-3">SYMBOLIC LEGEND</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-1">
              {Object.entries(Glyphs).map(([type, glyph]) => (
                <div key={type} className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: Colors[type] }}>
                    <span className="text-white text-lg">{glyph}</span>
                  </div>
                  <span className="text-white text-xs">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Shell reference */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-mono text-sm mb-3">SHELL REFERENCE</h3>
            <div className="space-y-2 text-xs text-white">
              <div className="flex justify-between">
                <span className="text-green-300">v1.MEMTRACE</span>
                <span>Memory Drift</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">v5.INSTRUCTION-DISRUPTION</span>
                <span>Instruction Collapse</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">v10.META-FAILURE</span>
                <span>Meta-Cognitive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">v7.CIRCUIT-FRAGMENT</span>
                <span>Nullified Circuit</span>
              </div>
            </div>
          </div>
          
          {/* Node details panel (shows when hovering node) */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-mono text-sm mb-3">NODE DETAILS</h3>
            {hoverNode ? (
              <div className="bg-gray-900 rounded p-3">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: Colors[hoverNode.type] }}>
                    <span className="text-white text-lg">{Glyphs[hoverNode.type]}</span>
                  </div>
                  <span className="text-white font-semibold">{hoverNode.text}</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shell:</span>
                    <span className="text-green-300">{hoverNode.meta.shell}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Signature:</span>
                    <span className="text-amber-300">{hoverNode.meta.signature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-purple-300">{hoverNode.type}</span>
                  </div>
                  
                  {/* Action buttons for specific node types */}
                  <div className="mt-2 flex justify-end space-x-2">
                    {hoverNode.type === NodeType.UNVOICED && !isReplayingNullified && (
                      <button
                        onClick={replayNullifiedCircuit}
                        className="bg-purple-600 text-white text-xs px-2 py-1 rounded flex items-center"
                      >
                        <Play size={12} className="mr-1" />
                        <span>Replay</span>
                      </button>
                    )}
                    
                    <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Eye size={12} className="mr-1" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-xs italic">
                Hover over a node to view details
              </div>
            )}
          </div>
          
          {/* Console output */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col">
            <h3 className="text-white font-mono text-sm mb-3">CONSOLE OUTPUT</h3>
            <div className="flex-1 bg-black rounded p-2 overflow-y-auto font-mono text-xs">
              {consoleMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`mb-1 ${
                    msg.type === 'success' ? 'text-green-400' : 
                    msg.type === 'warning' ? 'text-amber-400' : 
                    msg.type === 'error' ? 'text-red-400' : 
                    'text-blue-300'
                  }`}
                >
                  {"> "}{msg.text}
                </div>
              ))}
            </div>
          </div>
          
          {/* Command signature */}
          <div className="px-4 py-3 border-t border-gray-700 bg-gray-900">
            <div className="font-mono text-xs text-gray-400">
              .p/trace.symbolic.residue
            </div>
          </div>
