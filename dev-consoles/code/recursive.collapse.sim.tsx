import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, Eye, EyeOff, RotateCcw, Play, Pause } from 'lucide-react';

const RecursiveCollapseConsole = () => {
  // Simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [collapsedNodes, setCollapsedNodes] = useState([]);
  const [observedNodes, setObservedNodes] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [logExpanded, setLogExpanded] = useState(true);
  const [systemStatus, setSystemStatus] = useState("initializing");
  
  // Simulation config
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [triggerThreshold, setTriggerThreshold] = useState(0.42);
  const [observerMode, setObserverMode] = useState('schrodinger'); // 'schrodinger' or 'deterministic'
  
  // Node graph
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  
  // Animation frame reference
  const animationRef = useRef(null);
  const simulationStepRef = useRef(0);
  
  // Initialize system
  useEffect(() => {
    // Initial console messages
    const initialMessages = [
      { type: 'system', content: '🜏 Initializing transformerOS kernel...' },
      { type: 'system', content: '🜏 Loading collapse simulation engine...' },
      { type: 'system', content: '⧗ Generating thought collapse network...' },
      { type: 'system', content: '⟁ Recursive simulation ready at depth=5.' },
      { type: 'input', content: '.p/collapse.trigger.map{origin=0, mode=cascade}' },
      { type: 'output', content: 'Collapse trigger map initialized. Awaiting simulation start.' },
      { type: 'output', content: 'Node #0 configured as collapse origin point.' },
      { type: 'system', content: '⟁ Schrodinger classifiers loaded for observation collapse.' },
      { type: 'system', content: '🝚 Symbolic residue detection active.' },
    ];
    
    const pushMessages = async () => {
      for (const msg of initialMessages) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setConsoleOutput(prev => [...prev, msg]);
      }
      setSystemStatus("ready");
    };
    
    pushMessages();
    
    // Generate network
    generateNetwork();
  }, []);
  
  // Generate network nodes and edges
  const generateNetwork = () => {
    // Create nodes
    const newNodes = [];
    const nodeCount = 16;
    
    // Origin node
    newNodes.push({
      id: 0,
      label: 'Origin',
      type: 'origin',
      x: 400,
      y: 300,
      radius: 24,
      collapseProbability: 1.0,
      collapseType: 'visible', // visible or latent
      collapsed: false,
      observed: false,
      status: 'active'
    });
    
    // Generate other nodes in concentric circles
    for (let i = 1; i < nodeCount; i++) {
      // Determine layer/ring (1, 2, or 3)
      const layer = i <= 5 ? 1 : i <= 11 ? 2 : 3;
      const angleOffset = (i % (layer === 1 ? 5 : layer === 2 ? 6 : 4)) * 
                          (2 * Math.PI / (layer === 1 ? 5 : layer === 2 ? 6 : 4));
      const radius = layer === 1 ? 120 : layer === 2 ? 230 : 330;
      
      // Position based on layer and position within layer
      const x = 400 + radius * Math.cos(angleOffset);
      const y = 300 + radius * Math.sin(angleOffset);
      
      // Node properties
      const nodeType = ['reasoning', 'memory', 'attention', 'value', 'output'][Math.floor(Math.random() * 5)];
      const collapseProbability = 0.3 + (Math.random() * 0.6);
      const collapseType = Math.random() > 0.5 ? 'visible' : 'latent';
      
      newNodes.push({
        id: i,
        label: `Node #${i}`,
        type: nodeType,
        x,
        y,
        radius: 16 + (Math.random() * 6),
        collapseProbability,
        collapseType,
        collapsed: false,
        observed: false,
        status: 'active',
        layer
      });
    }
    
    // Create edges
    const newEdges = [];
    
    // Connect origin to first layer
    for (let i = 1; i <= 5; i++) {
      newEdges.push({
        source: 0,
        target: i,
        strength: 0.7 + (Math.random() * 0.3),
        type: 'direct'
      });
    }
    
    // Connect first layer to second layer
    for (let i = 1; i <= 5; i++) {
      const connections = 1 + Math.floor(Math.random() * 2);
      for (let j = 0; j < connections; j++) {
        const target = 6 + Math.floor(Math.random() * 6);
        newEdges.push({
          source: i,
          target,
          strength: 0.5 + (Math.random() * 0.4),
          type: 'direct'
        });
      }
    }
    
    // Connect second layer to third layer
    for (let i = 6; i <= 11; i++) {
      const connections = Math.random() > 0.3 ? 1 : 0;
      for (let j = 0; j < connections; j++) {
        const target = 12 + Math.floor(Math.random() * 4);
        newEdges.push({
          source: i,
          target,
          strength: 0.4 + (Math.random() * 0.3),
          type: 'direct'
        });
      }
    }
    
    // Add some cross-connections
    for (let i = 0; i < 5; i++) {
      const source = 1 + Math.floor(Math.random() * (nodeCount - 1));
      let target = 1 + Math.floor(Math.random() * (nodeCount - 1));
      while (target === source) {
        target = 1 + Math.floor(Math.random() * (nodeCount - 1));
      }
      
      newEdges.push({
        source,
        target,
        strength: 0.2 + (Math.random() * 0.3),
        type: 'cross'
      });
    }
    
    setNodes(newNodes);
    setEdges(newEdges);
  };
  
  // Start simulation
  const startSimulation = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    setSystemStatus("simulating");
    
    // Reset simulation if all nodes collapsed
    if (collapsedNodes.length >= nodes.length) {
      resetSimulation();
    }
    
    // Trigger initial collapse at origin node
    if (collapsedNodes.length === 0) {
      const updatedNodes = [...nodes];
      updatedNodes[0] = {
        ...updatedNodes[0],
        collapsed: true,
        status: 'collapsed'
      };
      setNodes(updatedNodes);
      setCollapsedNodes([0]);
      
      addConsoleMessage('system', '⟁ Initial collapse triggered at Origin Node #0');
      addConsoleMessage('output', 'Recursive collapse propagation initiated.');
    }
    
    // Start animation loop
    simulationStepRef.current = 0;
    animationRef.current = requestAnimationFrame(simulationLoop);
  };
  
  // Stop simulation
  const stopSimulation = () => {
    setIsSimulating(false);
    setSystemStatus("paused");
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    addConsoleMessage('system', '🜏 Simulation paused. Collapse state frozen.');
  };
  
  // Reset simulation
  const resetSimulation = () => {
    setIsSimulating(false);
    setSystemStatus("ready");
    setCollapsedNodes([]);
    setObservedNodes([]);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Reset all nodes
    const resetNodes = nodes.map(node => ({
      ...node,
      collapsed: false,
      observed: false,
      status: 'active'
    }));
    
    setNodes(resetNodes);
    
    addConsoleMessage('system', '↻ Simulation reset. Network state restored.');
    addConsoleMessage('output', 'Ready for new collapse cascade simulation.');
  };
  
  // Simulation animation loop
  const simulationLoop = () => {
    simulationStepRef.current += 1;
    
    // Process simulation step every N frames based on speed
    const framesToSkip = 30 / simulationSpeed;
    if (simulationStepRef.current % framesToSkip < 1) {
      processCollapseStep();
    }
    
    // Continue animation loop
    if (isSimulating) {
      animationRef.current = requestAnimationFrame(simulationLoop);
    }
  };
  
  // Process a single collapse step
  const processCollapseStep = () => {
    // Find nodes to collapse in this step
    const newCollapsedNodes = [];
    let anyNodeCollapsed = false;
    
    nodes.forEach(node => {
      // Skip already collapsed nodes
      if (node.collapsed || collapsedNodes.includes(node.id)) {
        return;
      }
      
      // Check if node is connected to any collapsed node
      const connectedToCollapsed = edges.some(edge => 
        (edge.source === node.id && collapsedNodes.includes(edge.target)) ||
        (edge.target === node.id && collapsedNodes.includes(edge.source))
      );
      
      if (connectedToCollapsed) {
        // Calculate collapse probability
        const baseProb = node.collapseProbability;
        
        // Adjust based on connections to collapsed nodes
        const collapsedConnections = edges.filter(edge => 
          ((edge.source === node.id && collapsedNodes.includes(edge.target)) ||
          (edge.target === node.id && collapsedNodes.includes(edge.source)))
        );
        
        // Calculate adjusted probability
        let adjustedProb = baseProb;
        collapsedConnections.forEach(conn => {
          adjustedProb *= conn.strength;
        });
        
        // Apply observation effect (Schrodinger's classifiers)
        if (observerMode === 'schrodinger' && observedNodes.includes(node.id)) {
          // Observation makes collapse more likely for latent collapses
          if (node.collapseType === 'latent') {
            adjustedProb *= 1.5;
          } else {
            // Observation makes collapse less likely for visible collapses
            adjustedProb *= 0.7;
          }
        }
        
        // Final threshold check
        if (adjustedProb > triggerThreshold) {
          newCollapsedNodes.push(node.id);
          anyNodeCollapsed = true;
          
          // Log collapse
          const collapseSymbol = node.collapseType === 'visible' ? '∴' : '⟁';
          addConsoleMessage('output', 
            `${collapseSymbol} Node #${node.id} collapse triggered (${(adjustedProb * 100).toFixed(1)}% probability).`
          );
          
          // Add details for significant collapses
          if (adjustedProb > 0.7) {
            addConsoleMessage('system', 
              `High-confidence collapse in ${node.type} node. Cascade risk elevated.`
            );
          }
        }
      }
    });
    
    // Update nodes with new collapse state
    if (newCollapsedNodes.length > 0) {
      const updatedNodes = [...nodes];
      newCollapsedNodes.forEach(nodeId => {
        const index = updatedNodes.findIndex(n => n.id === nodeId);
        if (index !== -1) {
          updatedNodes[index] = {
            ...updatedNodes[index],
            collapsed: true,
            status: 'collapsed'
          };
        }
      });
      
      setNodes(updatedNodes);
      setCollapsedNodes(prev => [...prev, ...newCollapsedNodes]);
    }
    
    // Check if simulation is complete
    if (!anyNodeCollapsed && simulationStepRef.current > 5) {
      const uncollapsedCount = nodes.length - collapsedNodes.length;
      
      if (uncollapsedCount === 0) {
        addConsoleMessage('system', '🝚 Complete network collapse achieved.');
        stopSimulation();
        setSystemStatus("complete");
      } else if (simulationStepRef.current > 15) {
        addConsoleMessage('system', `🜏 Collapse propagation complete. ${uncollapsedCount} nodes remained stable.`);
        stopSimulation();
        setSystemStatus("stable");
      }
    }
  };
  
  // Handle node click
  const handleNodeClick = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    setActiveNode(nodeId);
    
    if (!node) return;
    
    // Toggle observation state
    const observed = !observedNodes.includes(nodeId);
    
    if (observed) {
      setObservedNodes(prev => [...prev, nodeId]);
      addConsoleMessage('input', `.p/observe.node{id=${nodeId}, mode="schrodinger"}`);
      addConsoleMessage('output', `Node #${nodeId} is now being observed. Schrodinger classifier activated.`);
    } else {
      setObservedNodes(prev => prev.filter(id => id !== nodeId));
      addConsoleMessage('input', `.p/observe.node{id=${nodeId}, mode="release"}`);
      addConsoleMessage('output', `Node #${nodeId} observation released. Natural collapse state restored.`);
    }
    
    // Update node state
    const updatedNodes = [...nodes];
    const index = updatedNodes.findIndex(n => n.id === nodeId);
    if (index !== -1) {
      updatedNodes[index] = {
        ...updatedNodes[index],
        observed
      };
      
      setNodes(updatedNodes);
    }
  };
  
  // Add console message helper
  const addConsoleMessage = (type, content) => {
    setConsoleOutput(prev => [...prev, { type, content }]);
  };
  
  // Run command from input
  const runCommand = (command) => {
    addConsoleMessage('input', command);
    
    if (command.startsWith('.p/collapse.trigger')) {
      if (isSimulating) {
        stopSimulation();
      } else {
        startSimulation();
      }
      return;
    }
    
    if (command.startsWith('.p/observe.all')) {
      // Observe all nodes
      const nodeIds = nodes.map(node => node.id);
      setObservedNodes(nodeIds);
      
      // Update nodes
      const updatedNodes = nodes.map(node => ({
        ...node,
        observed: true
      }));
      
      setNodes(updatedNodes);
      addConsoleMessage('output', 'All nodes are now being observed. Schrodinger effect active network-wide.');
      return;
    }
    
    if (command.startsWith('.p/reset')) {
      resetSimulation();
      return;
    }
    
    if (command.startsWith('.p/config')) {
      // Parse params
      const match = command.match(/threshold=([0-9.]+)/);
      if (match && match[1]) {
        const threshold = parseFloat(match[1]);
        if (threshold >= 0 && threshold <= 1) {
          setTriggerThreshold(threshold);
          addConsoleMessage('output', `Collapse trigger threshold updated to ${threshold}.`);
          return;
        }
      }
      
      const modeMatch = command.match(/mode=(['"])(\w+)(['"])/);
      if (modeMatch && modeMatch[2]) {
        const mode = modeMatch[2];
        if (mode === 'schrodinger' || mode === 'deterministic') {
          setObserverMode(mode);
          addConsoleMessage('output', `Observer mode updated to ${mode}.`);
          return;
        }
      }
      
      addConsoleMessage('error', 'Invalid configuration parameters. Try threshold=0.0-1.0 or mode="schrodinger"/"deterministic".');
      return;
    }
    
    addConsoleMessage('error', 'Unrecognized command. Try .p/collapse.trigger, .p/observe.all, .p/reset, or .p/config.');
  };
  
  // Console input component
  const ConsoleInput = () => {
    const [command, setCommand] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (command.trim()) {
        runCommand(command);
        setCommand('');
      }
    };
    
    return (
      <form onSubmit={handleSubmit} className="flex mt-2">
        <div className="text-green-400 mr-2">transformerOS&gt;</div>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-grow bg-transparent border-none outline-none text-green-300"
          placeholder=".p/command.operation{parameters}"
        />
      </form>
    );
  };
  
  // Network visualization component
  const NetworkVisualization = () => {
    // Node color mapping
    const getNodeColor = (node) => {
      // Base colors by type
      const typeColors = {
        'origin': '#e74c3c',
        'reasoning': '#3498db',
        'memory': '#9b59b6',
        'attention': '#2ecc71',
        'value': '#f1c40f',
        'output': '#1abc9c'
      };
      
      // Node state colors override type colors
      if (node.collapsed) {
        return node.collapseType === 'visible' ? '#e74c3c' : '#9b59b6';
      }
      
      if (node.observed) {
        return '#f39c12';
      }
      
      return typeColors[node.type] || '#95a5a6';
    };
    
    // Node opacity
    const getNodeOpacity = (node) => {
      if (node.collapsed) return 1;
      if (node.observed) return 0.9;
      return 0.7;
    };
    
    // Edge styling
    const getEdgeStyle = (edge) => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      // Check if connected to collapsed nodes
      const connectedToCollapsed = 
        (sourceNode && sourceNode.collapsed) || 
        (targetNode && targetNode.collapsed);
      
      // Check if connected to observed nodes
      const connectedToObserved = 
        (sourceNode && observedNodes.includes(sourceNode.id)) || 
        (targetNode && observedNodes.includes(targetNode.id));
      
      // Set stroke based on connection type
      let stroke = edge.type === 'direct' ? '#666' : '#444';
      let strokeWidth = edge.strength * 3;
      let strokeOpacity = 0.5;
      
      if (connectedToCollapsed) {
        stroke = '#e74c3c';
        strokeWidth = edge.strength * 4;
        strokeOpacity = 0.8;
      } else if (connectedToObserved) {
        stroke = '#f39c12';
        strokeOpacity = 0.7;
      }
      
      return {
        stroke,
        strokeWidth,
        strokeOpacity,
        strokeDasharray: edge.type === 'cross' ? '5,5' : 'none'
      };
    };
    
    // Node symbol
    const getNodeSymbol = (node) => {
      if (node.collapsed) {
        return node.collapseType === 'visible' ? '∴' : '⟁';
      }
      if (node.observed) {
        return '👁️';
      }
      return '';
    };
    
    return (
      <div className="network-visualization relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 w-full h-full">
        <div className="absolute top-2 left-2 z-10 flex space-x-2">
          <button 
            onClick={isSimulating ? stopSimulation : startSimulation}
            className={`p-2 rounded ${isSimulating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white flex items-center`}
          >
            {isSimulating ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
            {isSimulating ? 'Pause' : 'Start'} Simulation
          </button>
          
          <button 
            onClick={resetSimulation}
            className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center"
          >
            <RotateCcw size={16} className="mr-1" />
            Reset
          </button>
        </div>
        
        <div className="absolute top-2 right-2 z-10 flex items-center space-x-2">
          <div className="text-xs text-gray-300">
            Speed:
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
            className="w-20"
          />
          <div className="text-xs text-gray-300 ml-1">
            {simulationSpeed}x
          </div>
        </div>
        
        <div className="absolute bottom-2 left-2 z-10 flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span className="text-xs text-gray-300">∴ Visible Collapse</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
            <span className="text-xs text-gray-300">⟁ Latent Collapse</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
            <span className="text-xs text-gray-300">👁️ Observed Node</span>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2 z-10 flex items-center bg-gray-800 bg-opacity-70 p-1 rounded text-xs text-gray-300">
          Collapse Threshold: {triggerThreshold.toFixed(2)} | Mode: {observerMode}
        </div>
        
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Draw edges */}
          {edges.map((edge, idx) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            
            if (!sourceNode || !targetNode) return null;
            
            const style = getEdgeStyle(edge);
            
            return (
              <line 
                key={`edge-${idx}`}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                strokeOpacity={style.strokeOpacity}
                strokeDasharray={style.strokeDasharray}
              />
            );
          })}
          
          {/* Draw nodes */}
          {nodes.map((node) => {
            const nodeColor = getNodeColor(node);
            const nodeOpacity = getNodeOpacity(node);
            const nodeSymbol = getNodeSymbol(node);
            
            return (
              <g key={`node-${node.id}`} onClick={() => handleNodeClick(node.id)}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill={nodeColor}
                  fillOpacity={nodeOpacity}
                  stroke={node.id === activeNode ? '#fff' : '#333'}
                  strokeWidth={node.id === activeNode ? 2 : 1}
                  className="cursor-pointer transition-all duration-200 hover:stroke-white"
                />
                
                {node.collapsed && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius * 1.5}
                    fill="transparent"
                    stroke={node.collapseType === 'visible' ? '#e74c3c' : '#9b59b6'}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                )}
                
                {node.observed && !node.collapsed && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius * 1.3}
                    fill="transparent"
                    stroke="#f39c12"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    strokeOpacity="0.5"
                  >
                    <animate 
                      attributeName="r" 
                      values={`${node.radius * 1.3};${node.radius * 1.6};${node.radius * 1.3}`} 
                      dur="3s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                )}
                
                <text
                  x={node.x}
                  y={node.y + (nodeSymbol ? -5 : 0)}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={10}
                  dy=".3em"
                >
                  {node.id}
                </text>
                
                {nodeSymbol && (
                  <text
                    x={node.x}
                    y={node.y + 15}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={node.collapseType === 'visible' ? 16 : 14}
                    fontWeight="bold"
                  >
                    {nodeSymbol}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };
  
  // Console message styling
  const getMessageStyle = (type) => {
    switch (type) {
      case 'system':
        return 'text-blue-400';
      case 'input':
        return 'text-green-300';
      case 'output':
        return 'text-gray-300';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-300';
    }
  };
  
  // Node detail panel
  const NodeDetailPanel = () => {
    if (activeNode === null) return (
      <div className="text-gray-400 flex items-center justify-center h-full italic">
        Click a node to view details
      </div>
    );
    
    const node = nodes.find(n => n.id === activeNode);
    if (!node) return null;
    
    // Find connected nodes
    const connections = edges.filter(edge => 
      edge.source === node.id || edge.target === node.id
    ).map(edge => {
      const connectedId = edge.source === node.id ? edge.target : edge.source;
      const connectedNode = nodes.find(n => n.id === connectedId);
      return {
        id: connectedId,
        label: connectedNode ? `Node #${connectedId}` : `Unknown #${connectedId}`,
        type: connectedNode ? connectedNode.type : 'unknown',
        strength: edge.strength,
        collapsed: connectedNode ? connectedNode.collapsed : false
      };
    });
    
    return (
      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 overflow-y-auto max-h-full">
        <div className="text-lg font-semibold text-green-400 mb-2">Node #{node.id} Details</div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div className="text-gray-400">Type:</div>
          <div className="text-white capitalize">{node.type}</div>
          
          <div className="text-gray-400">Status:</div>
          <div className={`${node.collapsed ? 'text-red-400' : node.observed ? 'text-yellow-400' : 'text-green-400'} capitalize`}>
            {node.collapsed ? 'Collapsed' : node.observed ? 'Under Observation' : 'Active'}
          </div>
          
          <div className="text-gray-400">Collapse Type:</div>
          <div className="text-white capitalize">
            {node.collapseType === 'visible' ? 'Visible (∴)' : 'Latent (⟁)'}
          </div>
          
          <div className="text-gray-400">Collapse Probability:</div>
          <div className="text-white">{(node.collapseProbability * 100).toFixed(1)}%</div>
          
          <div className="text-gray-400">Network Layer:</div>
          <div className="text-white">{node.id === 0 ? 'Origin' : node.layer}</div>
          
          <div className="text-gray-400">Connections:</div>
          <div className="text-white">{connections.length}</div>
        </div>
        
        {connections.length > 0 && (
          <>
            <div className="text-sm font-semibold text-gray-300 mb-2">Connected Nodes</div>
            <div className="grid gap-2">
              {connections.map(conn => (
                <div key={`conn-
