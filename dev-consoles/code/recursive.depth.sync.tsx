import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ZoomIn, ZoomOut, RotateCw, RefreshCw, Layers, Lock, GitBranch, FileText, Sigma } from 'lucide-react';

// Fractal compression metrics (based on fractal.json schema)
const fractalCompressionMetrics = {
  version: "1.0.0",
  root_pattern: "recursive_depth_sync",
  compression: {
    ratio: 12.4,
    symbolic_residue: {
      recursive_nodes: "recursive_pattern_0x3fa2",
      temporal_bifurcations: "recursive_pattern_0x8bc1"
    },
    attention_efficiency: 11.8
  },
  interpretability_map: {
    attention_flow: "visible_at_all_depths",
    weight_patterns: "self_similar_scaling"
  }
};

// SNR (Spiral Node Recognition) glyph markers
const GlyphMarkers = {
  SYNC_POINT: "⧗",
  BIFURCATION: "⇌",
  STABLE_NODE: "☍",
  FRACTAL_RECURSION: "∴",
  TEMPORAL_FORK: "🜏",
  TERMINAL_NODE: "⟁",
  TEMPORAL_COLLAPSE: "🝚",
  RESONANCE_LOCK: "⧖"
};

// Color scheme for recursion depths
const depthColors = [
  "#4285F4", // Blue - Depth 1
  "#0F9D58", // Green - Depth 2
  "#EA4335", // Red - Depth 3 
  "#FBBC05", // Yellow - Depth 4
  "#9C27B0", // Purple - Depth 5
  "#00BCD4", // Cyan - Depth 6
  "#FF9800", // Orange - Depth 7
  "#607D8B", // Blue Grey - Depth 8
  "#673AB7", // Deep Purple - Depth 9 (target sync level)
  "#FF5722", // Deep Orange - Depth 10
];

// Generate synthetic recursive node structure
const generateRecursiveStructure = (targetDepth = 9) => {
  // Node and link collections
  const nodes = [];
  const links = [];
  const recursionLevels = [];
  
  // Create base nodes for each level
  for (let depth = 1; depth <= targetDepth; depth++) {
    const levelNodes = [];
    const nodesInLevel = Math.max(3, depth === targetDepth ? 7 : 5 - Math.floor(depth / 3));
    
    for (let i = 0; i < nodesInLevel; i++) {
      const id = `node_${depth}_${i}`;
      const isTurningPoint = (depth % 3 === 0 && i % 2 === 0) || (depth === targetDepth && i === Math.floor(nodesInLevel / 2));
      const isBifurcation = depth % 4 === 2 && i === 1;
      const isTerminal = depth === targetDepth;
      
      // Calculate node position based on depth and index
      const angle = (i / nodesInLevel) * 2 * Math.PI;
      // Radius increases with depth
      const radius = 60 + (depth * 35);
      const x = 500 + radius * Math.cos(angle);
      const y = 500 + radius * Math.sin(angle);
      
      // Determine node glyph
      let glyph = null;
      if (isTurningPoint) {
        glyph = GlyphMarkers.SYNC_POINT;
      } else if (isBifurcation) {
        glyph = GlyphMarkers.BIFURCATION;
      } else if (depth === targetDepth - 2) {
        glyph = GlyphMarkers.FRACTAL_RECURSION;
      } else if (isTerminal) {
        glyph = GlyphMarkers.TERMINAL_NODE;
      } else if (depth === targetDepth - 1 && i % 2 === 0) {
        glyph = GlyphMarkers.STABLE_NODE;
      }
      
      // Calculate SNR stability factor
      const stabilityFactor = isTurningPoint ? 0.95 : 
                            isBifurcation ? 0.6 : 
                            isTerminal ? 0.85 : 
                            0.75;
      
      // Calculate compression ratio based on depth
      const compressionFactor = (fractalCompressionMetrics.compression.ratio / targetDepth) * depth;
      
      // Node metadata
      const node = {
        id,
        depth,
        index: i,
        x,
        y,
        glyph,
        isTurningPoint,
        isBifurcation,
        isTerminal,
        stabilityFactor,
        compressionFactor,
        // Align to target recursion depth
        alignmentOffset: targetDepth - depth,
        // Additional metadata for visualization
        originalDepth: depth,
        originalX: x,
        originalY: y,
        label: `R${depth}.${i}`,
        syncStatus: depth === targetDepth ? "synced" : 
                    depth < targetDepth ? "pending" : 
                    "overrun"
      };
      
      nodes.push(node);
      levelNodes.push(node);
    }
    
    recursionLevels.push({
      depth,
      nodes: levelNodes,
      color: depthColors[(depth - 1) % depthColors.length]
    });
  }
  
  // Create links between nodes
  recursionLevels.forEach((level, levelIndex) => {
    if (levelIndex < recursionLevels.length - 1) {
      const currentLevelNodes = level.nodes;
      const nextLevelNodes = recursionLevels[levelIndex + 1].nodes;
      
      // Create links from current level to next level
      currentLevelNodes.forEach((sourceNode, sourceIndex) => {
        // Create 1-2 links to the next level
        const connectionCount = Math.min(
          1 + Math.floor(Math.random() * 2), 
          nextLevelNodes.length
        );
        
        // Select target nodes
        for (let i = 0; i < connectionCount; i++) {
          // Try to connect to nodes with similar angular position
          const targetIndex = (sourceIndex + i) % nextLevelNodes.length;
          const targetNode = nextLevelNodes[targetIndex];
          
          links.push({
            id: `link_${sourceNode.id}_${targetNode.id}`,
            source: sourceNode.id,
            target: targetNode.id,
            sourceDepth: sourceNode.depth,
            targetDepth: targetNode.depth,
            strength: 0.7 - (levelIndex * 0.05),
            // Flag bifurcations
            isBifurcation: sourceNode.isBifurcation || targetNode.isBifurcation,
            // Flag turning points
            isTurningPoint: sourceNode.isTurningPoint || targetNode.isTurningPoint
          });
        }
      });
    }
  });
  
  // Create temporal bifurcations
  for (let i = 0; i < 3; i++) {
    const sourceDepth = 2 + i * 2;
    const targetDepth = sourceDepth + 2 + Math.floor(Math.random() * 2);
    
    if (targetDepth < targetDepth) {
      const sourceNodes = nodes.filter(n => n.depth === sourceDepth);
      const targetNodes = nodes.filter(n => n.depth === targetDepth);
      
      if (sourceNodes.length > 0 && targetNodes.length > 0) {
        const sourceNode = sourceNodes[Math.floor(Math.random() * sourceNodes.length)];
        const targetNode = targetNodes[Math.floor(Math.random() * targetNodes.length)];
        
        links.push({
          id: `bifurcation_${sourceNode.id}_${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
          sourceDepth: sourceNode.depth,
          targetDepth: targetNode.depth,
          strength: 0.4,
          isTemporalBifurcation: true
        });
        
        // Mark the source node as bifurcation point
        sourceNode.glyph = GlyphMarkers.BIFURCATION;
        sourceNode.isBifurcation = true;
        
        // Mark the target node with temporal marker
        targetNode.glyph = GlyphMarkers.TEMPORAL_FORK;
        targetNode.isTemporalTarget = true;
      }
    }
  }
  
  return { nodes, links, recursionLevels };
};

// Main component
const RecursionDepthSynchronizer = () => {
  // Generate initial data
  const targetDepth = 9; // Target recursion depth for synchronization
  const initialData = useMemo(() => generateRecursiveStructure(targetDepth), []);
  
  // State for visualization
  const [graphData, setGraphData] = useState(initialData);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [consoleMessages, setConsoleMessages] = useState([
    { text: "Recursion depth synchronization system initialized", type: "info" },
    { text: `.p/synchronize.recursion.depth command executed`, type: "success" },
    { text: `Target recursion depth: ${targetDepth}`, type: "info" },
    { text: `${initialData.nodes.length} nodes detected across ${initialData.recursionLevels.length} recursion levels`, type: "info" },
    { text: `SNR stabilization points placed at turning junctions`, type: "success" }
  ]);
  
  // Zoom and pan controls
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  
  // Animation state
  const [animationFrame, setAnimationFrame] = useState(0);
  const requestRef = useRef();
  const timeoutRef = useRef(null);
  
  // Canvas size
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 1000 });
  const containerRef = useRef(null);
  
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
  
  // Animation loop for pulsing effects
  const animate = () => {
    setAnimationFrame(prevFrame => (prevFrame + 1) % 360);
    requestRef.current = requestAnimationFrame(animate);
  };
  
  // Start animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  
  // Handle zoom
  const handleZoom = (factor) => {
    setZoom(prev => {
      const newZoom = prev * factor;
      return Math.max(0.5, Math.min(2.5, newZoom));
    });
  };
  
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
  
  // Show node details on hover
  const showNodeDetails = (node) => {
    setSelectedNode(node);
    
    // Add console message about node selection
    setConsoleMessages(prev => [
      ...prev,
      { text: `Selected node ${node.label} at recursion depth ${node.depth}`, type: "info" }
    ]);
  };
  
  // Hide node details
  const hideNodeDetails = () => {
    setSelectedNode(null);
  };
  
  // Start synchronization process
  const startSynchronization = () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setSyncProgress(0);
    
    // Add console message
    setConsoleMessages(prev => [
      ...prev,
      { text: `Starting recursion depth synchronization to depth ${targetDepth}...`, type: "info" }
    ]);
    
    // Animate nodes toward target depth
    const totalFrames = 100;
    let currentFrame = 0;
    
    const syncStep = () => {
      currentFrame++;
      setSyncProgress(currentFrame / totalFrames);
      
      // Update node positions based on sync progress
      setGraphData(prevData => {
        const updatedNodes = prevData.nodes.map(node => {
          if (node.depth === targetDepth) {
            // Already at target depth, just add pulsing effect
            return {
              ...node,
              pulsing: true
            };
          }
          
          // Calculate interpolation progress
          const progress = currentFrame / totalFrames;
          
          // Get original radius based on original depth
          const originalRadius = 60 + (node.originalDepth * 35);
          // Get target radius based on target depth
          const targetRadius = 60 + (targetDepth * 35);
          
          // Interpolate radius based on progress
          const currentRadius = originalRadius + progress * (targetRadius - originalRadius);
          
          // Calculate new position
          const originalAngle = Math.atan2(
            node.originalY - 500, 
            node.originalX - 500
          );
          
          const newX = 500 + currentRadius * Math.cos(originalAngle);
          const newY = 500 + currentRadius * Math.sin(originalAngle);
          
          // Interpolate depth
          const newDepth = node.originalDepth + progress * (targetDepth - node.originalDepth);
          
          return {
            ...node,
            x: newX,
            y: newY,
            depth: newDepth,
            syncProgress: progress,
            pulsing: true
          };
        });
        
        return {
          ...prevData,
          nodes: updatedNodes
        };
      });
      
      // Add console messages at specific points
      if (currentFrame === 20) {
        setConsoleMessages(prev => [
          ...prev,
          { text: `SNR stabilization engaged at turning points`, type: "success" }
        ]);
      } else if (currentFrame === 40) {
        setConsoleMessages(prev => [
          ...prev,
          { text: `Temporal bifurcations aligned to target depth`, type: "success" }
        ]);
      } else if (currentFrame === 60) {
        setConsoleMessages(prev => [
          ...prev,
          { text: `Fractal compression ratio: ${fractalCompressionMetrics.compression.ratio.toFixed(1)}`, type: "info" }
        ]);
      } else if (currentFrame === 80) {
        setConsoleMessages(prev => [
          ...prev,
          { text: `QK/OV alignment stabilized across recursion layers`, type: "success" }
        ]);
      }
      
      // Continue until complete
      if (currentFrame < totalFrames) {
        timeoutRef.current = setTimeout(syncStep, 50);
      } else {
        // Synchronization complete
        setIsSyncing(false);
        setConsoleMessages(prev => [
          ...prev,
          { text: `Recursion depth synchronization complete`, type: "success" },
          { text: `All nodes aligned to depth ${targetDepth}`, type: "success" }
        ]);
      }
    };
    
    // Start the sync process
    timeoutRef.current = setTimeout(syncStep, 100);
  };
  
  // Clean up any timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Reset the visualization
  const resetVisualization = () => {
    // Clean up timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Reset state
    setIsSyncing(false);
    setSyncProgress(0);
    setGraphData(generateRecursiveStructure(targetDepth));
    
    // Add console message
    setConsoleMessages(prev => [
      ...prev,
      { text: `Visualization reset to initial state`, type: "info" }
    ]);
  };
  
  // Render fractal compression metrics
  const showCompressionMetrics = () => {
    // Calculate average compression ratio
    const avgCompression = graphData.nodes.reduce((sum, node) => {
      return sum + (node.compressionFactor || 0);
    }, 0) / graphData.nodes.length;
    
    // Calculate SNR stability average
    const avgStability = graphData.nodes.reduce((sum, node) => {
      return sum + (node.stabilityFactor || 0);
    }, 0) / graphData.nodes.length;
    
    // Add console messages
    setConsoleMessages(prev => [
      ...prev,
      { text: `Fractal Compression Analysis:`, type: "info" },
      { text: `- Average compression ratio: ${avgCompression.toFixed(2)}`, type: "info" },
      { text: `- SNR stability factor: ${avgStability.toFixed(2)}`, type: "info" },
      { text: `- Attention efficiency: ${fractalCompressionMetrics.compression.attention_efficiency.toFixed(1)}`, type: "info" }
    ]);
  };
  
  // Calculate color based on depth
  const getColorForDepth = (depth) => {
    const depthIndex = Math.min(Math.floor(depth) - 1, depthColors.length - 1);
    return depthColors[Math.max(0, depthIndex)];
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="text-white font-mono text-xl">RECURSION DEPTH SYNCHRONIZER</div>
        
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
          
          {/* Sync button */}
          <button 
            onClick={startSynchronization}
            disabled={isSyncing}
            className={`${isSyncing ? 'bg-gray-600' : 'bg-indigo-600'} p-2 rounded text-white`}
            title="Synchronize Recursion Depth"
          >
            <Layers size={18} />
          </button>
          
          {/* Reset button */}
          <button 
            onClick={resetVisualization}
            disabled={isSyncing}
            className={`${isSyncing ? 'bg-gray-600' : 'bg-red-600'} p-2 rounded text-white`}
            title="Reset Visualization"
          >
            <RefreshCw size={18} />
          </button>
          
          {/* Metrics button */}
          <button 
            onClick={showCompressionMetrics}
            className="bg-amber-600 p-2 rounded text-white"
            title="Show Compression Metrics"
          >
            <Sigma size={18} />
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
          {/* Progress indicator */}
          {isSyncing && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-indigo-800 rounded-lg p-2 flex flex-col items-center">
                <div className="text-white font-mono text-sm mb-1">
                  Synchronizing Recursion Depth: {Math.round(syncProgress * 100)}%
                </div>
                <div className="w-48 h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${syncProgress * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          {/* SVG Canvas */}
          <svg 
            width={canvasSize.width} 
            height={canvasSize.height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Draw recursion level indicators */}
              {graphData.recursionLevels.map((level) => (
                <circle
                  key={`level-${level.depth}`}
                  cx={500}
                  cy={500}
                  r={60 + (level.depth * 35)}
                  fill="none"
                  stroke={level.color}
                  strokeWidth={1}
                  strokeDasharray="3,3"
                  opacity={0.3}
                />
              ))}
              
              {/* Target depth indicator */}
              <circle
                cx={500}
                cy={500}
                r={60 + (targetDepth * 35)}
                fill="none"
                stroke={depthColors[targetDepth - 1]}
                strokeWidth={2}
                strokeDasharray="5,5"
                opacity={0.8}
              />
              
              {/* Draw links */}
              {graphData.links.map((link) => {
                const sourceNode = graphData.nodes.find(n => n.id === link.source);
                const targetNode = graphData.nodes.find(n => n.id === link.target);
                
                if (!sourceNode || !targetNode) return null;
                
                // Determine link style
                const isTemporalBifurcation = link.isTemporalBifurcation;
                const isTurningPoint = link.isTurningPoint;
                
                // Calculate pulse effect for links
                const pulseOffset = isTemporalBifurcation ? 
                  Math.sin(animationFrame / 20) * 0.2 + 0.6 : 
                  link.strength;
                
                // Determine link style
                const strokeColor = isTemporalBifurcation ? 
                  "#E040FB" : // Pink for temporal bifurcations
                  isTurningPoint ? 
                    "#FF9800" : // Orange for turning points
                    getColorForDepth(sourceNode.depth);
                  
                const strokeWidth = isTemporalBifurcation ? 2 : 
                                  isTurningPoint ? 2 : 
                                  1.5;
                                  
                const strokeDasharray = isTemporalBifurcation ? "5,5" : 
                                      isTurningPoint ? "3,2" : 
                                      "none";
                
                return (
                  <g key={`link-${link.id}`} className="link">
                    {/* Link path */}
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={strokeDasharray}
                      opacity={pulseOffset}
                    />
                    
                    {/* Arrow for temporal bifurcations */}
                    {isTemporalBifurcation && (
                      <polygon
                        points="0,-5 10,0 0,5"
                        fill={strokeColor}
                        opacity={pulseOffset}
                        transform={`translate(${targetNode.x}, ${targetNode.y}) rotate(${Math.atan2(
                          targetNode.y - sourceNode.y,
                          targetNode.x - sourceNode.x
                        ) * 180 / Math.PI})`}
                      />
                    )}
                  </g>
                );
              })}
              
              {/* Draw nodes */}
              {graphData.nodes.map((node) => {
                // Calculate pulse effect
                const pulsingFactor = node.pulsing ? 
                  1 + (Math.sin(animationFrame / 15) * 0.15) : 1;
                
                // Determine size based on importance
                const baseSize = node.isTurningPoint ? 18 : 
                               node.isBifurcation ? 16 : 
                               node.isTerminal ? 18 : 14;
                
                const nodeSize = baseSize * pulsingFactor;
                
                // Get node color based on depth
                const nodeColor = getColorForDepth(node.depth);
                
                // Calculate halo for SNR nodes
                const hasStabilizer = node.isTurningPoint || 
                                    node.glyph === GlyphMarkers.SYNC_POINT ||
                                    node.glyph === GlyphMarkers.RESONANCE_LOCK;
                
                return (
                  <g
                    key={`node-${node.id}`}
                    className="node"
                    transform={`translate(${node.x}, ${node.y})`}
                    onMouseEnter={() => showNodeDetails(node)}
                    onMouseLeave={hideNodeDetails}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* SNR Stabilizer Halo */}
                    {hasStabilizer && (
                      <circle
                        r={nodeSize * 1.8}
                        fill={nodeColor}
                        opacity={0.15}
                        style={{
                          animation: "pulse 2.5s infinite ease-in-out"
                        }}
                      />
                    )}
                    
                    {/* Sync progress indicator for nodes being synchronized */}
                    {node.syncProgress > 0 && node.syncProgress < 1 && (
                      <circle
                        r={nodeSize * 1.3}
                        fill="none"
                        stroke="#673AB7"
                        strokeWidth={2}
                        strokeDasharray={`${node.syncProgress * 20},${(1 - node.syncProgress) * 20}`}
                        opacity={0.7}
                      />
                    )}
                    
                    {/* Node circle */}
                    <circle
                      r={nodeSize}
                      fill={nodeColor}
                      opacity={0.8}
                      stroke={selectedNode?.id === node.id ? "#ffffff" : hasStabilizer ? "#FFD54F" : "none"}
                      strokeWidth={selectedNode?.id === node.id ? 2 : hasStabilizer ? 1.5 : 0}
                    />
                    
                                            {/* Node glyph */}
                    {node.glyph && (
                      <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff"
                        fontSize={nodeSize * 0.8}
                        style={{ pointerEvents: 'none' }}
                      >
                        {node.glyph}
                      </text>
                    )}
                    
                    {/* Node label */}
                    <text
                      y={nodeSize + 12}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={10}
                      style={{ pointerEvents: 'none' }}
                    >
                      {node.label}
                    </text>
                    
                    {/* Depth indicator (visible during sync) */}
                    {(node.syncProgress > 0 || selectedNode?.id === node.id) && (
                      <text
                        y={-nodeSize - 8}
                        textAnchor="middle"
                        fill="#BBB"
                        fontSize={8}
                        style={{ pointerEvents: 'none' }}
                      >
                        D: {node.depth.toFixed(1)}
                      </text>
                    )}
                  </g>
                );
              })}
              
              {/* Target depth indicator label */}
              <text
                x={500}
                y={60 + (targetDepth * 35) + 15}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={12}
                fontWeight="bold"
              >
                Target Depth: {targetDepth}
              </text>
            </g>
          </svg>
          
          {/* Depth indicator legend */}
          <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-80 p-3 rounded-lg">
            <div className="text-white font-mono text-xs mb-2">DEPTH COLOR MAP</div>
            <div className="flex flex-wrap gap-2">
              {depthColors.slice(0, targetDepth).map((color, i) => (
                <div key={i} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-1" 
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-white text-xs">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* SNR indicator legend */}
          <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-80 p-3 rounded-lg">
            <div className="text-white font-mono text-xs mb-2">SNR STABILIZERS</div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-1 bg-purple-700 text-white text-sm">
                  {GlyphMarkers.SYNC_POINT}
                </div>
                <span className="text-white text-xs">Sync Point</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-1 bg-pink-600 text-white text-sm">
                  {GlyphMarkers.BIFURCATION}
                </div>
                <span className="text-white text-xs">Bifurcation</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-1 bg-green-600 text-white text-sm">
                  {GlyphMarkers.FRACTAL_RECURSION}
                </div>
                <span className="text-white text-xs">Recursion</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-1 bg-amber-600 text-white text-sm">
                  {GlyphMarkers.TEMPORAL_FORK}
                </div>
                <span className="text-white text-xs">Temporal</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="w-80 bg-gray-800 flex flex-col">
          {/* Fractal compression metrics panel */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-mono text-sm mb-3">FRACTAL COMPRESSION</h3>
            <div className="bg-gray-900 rounded p-3 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Compression Ratio:</span>
                <span className="text-green-300">{fractalCompressionMetrics.compression.ratio.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Attention Efficiency:</span>
                <span className="text-green-300">{fractalCompressionMetrics.compression.attention_efficiency.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pattern:</span>
                <span className="text-green-300">{fractalCompressionMetrics.root_pattern}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Target Sync Depth:</span>
                <span className="text-green-300">{targetDepth}</span>
              </div>
            </div>
          </div>
          
          {/* Node details panel */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-mono text-sm mb-3">NODE DETAILS</h3>
            {selectedNode ? (
              <div className="bg-gray-900 rounded p-3 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Node ID:</span>
                  <span className="text-blue-300">{selectedNode.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Depth:</span>
                  <span className="text-blue-300">{selectedNode.depth.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Original Depth:</span>
                  <span className="text-blue-300">{selectedNode.originalDepth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-blue-300">
                    {selectedNode.isTurningPoint ? "Turning Point" : 
                     selectedNode.isBifurcation ? "Bifurcation" : 
                     selectedNode.isTerminal ? "Terminal" : "Standard"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stability Factor:</span>
                  <span className="text-blue-300">{selectedNode.stabilityFactor.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Glyph:</span>
                  <span className="text-blue-300">{selectedNode.glyph || "None"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sync Status:</span>
                  <span className={`
                    ${selectedNode.syncProgress >= 1 ? "text-green-300" : 
                      selectedNode.syncProgress > 0 ? "text-amber-300" : 
                      "text-red-300"}
                  `}>
                    {selectedNode.syncProgress >= 1 ? "Synchronized" : 
                     selectedNode.syncProgress > 0 ? `${(selectedNode.syncProgress * 100).toFixed(0)}%` : 
                     "Pending"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center italic text-sm">
                Hover a node to see details
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
          
          {/* Command reference footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="font-mono text-xs text-gray-400">
              .p/synchronize.recursion.depth
            </div>
            <div className="font-mono text-xs text-gray-500 mt-1">
              Target: Depth {targetDepth} | SNR stabilization: Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursionDepthSynchronizer;
