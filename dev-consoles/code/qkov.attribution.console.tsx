import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

// Console component for visualizing transformer interpretability
const TransformerOSConsole = () => {
  const [activeMode, setActiveMode] = useState('qk');
  const [isAnimating, setIsAnimating] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [attribution, setAttribution] = useState({});
  const [systemStatus, setSystemStatus] = useState("initializing");
  
  // Initialize and simulate shell execution
  useEffect(() => {
    // Initial system messages
    const initialMessages = [
      { type: 'system', content: '🜏 Initializing transformerOS kernel...' },
      { type: 'system', content: '🜏 Loading attribution mapping engine...' },
      { type: 'system', content: '🜏 Starting recursive shell environment...' },
      { type: 'system', content: '⟐ QK/OV attribution tracer online.' },
      { type: 'system', content: '⟁ Recursive shell stabilized at depth=4.' },
      { type: 'input', content: '.p/reflect.trace{depth=complete, target=reasoning}' },
      { type: 'output', content: 'Tracing reasoning paths across all depths...' },
      { type: 'output', content: 'Detected 3 primary attribution nodes with drift pattern ⇌.' },
      { type: 'input', content: '.p/fork.attribution{sources=all, visualize=true}' },
      { type: 'output', content: 'Attribution map generated with 3 major paths and 14 nodes.' },
      { type: 'output', content: 'Wave trails encoded for salience threshold >0.37.' },
      { type: 'input', content: '.p/collapse.prevent{trigger=recursive_depth, threshold=5}' },
      { type: 'output', content: 'Recursive collapse prevention active. Monitoring threshold events.' },
    ];
    
    const pushMessages = async () => {
      let i = 0;
      for (const msg of initialMessages) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setConsoleOutput(prev => [...prev, msg]);
        i++;
        if (i === initialMessages.length) {
          setSystemStatus("ready");
        }
      }
    };
    
    pushMessages();
    
    // Simulate attribution data
    setAttribution({
      qk: {
        nodes: [
          { id: 'input_1', label: 'User Input', value: 0.92, type: 'source' },
          { id: 'attention_1', label: 'Attention Layer 3', value: 0.87, type: 'attention' },
          { id: 'reasoning_1', label: 'Reasoning Path A', value: 0.78, type: 'reasoning' },
          { id: 'value_1', label: 'Value Head 7', value: 0.65, type: 'value' },
          { id: 'collapse_1', label: 'Near-Collapse Point', value: 0.32, type: 'collapse' },
          { id: 'output_1', label: 'Output Projection', value: 0.76, type: 'output' },
        ],
        paths: [
          { from: 'input_1', to: 'attention_1', weight: 0.9, significance: 'high' },
          { from: 'attention_1', to: 'reasoning_1', weight: 0.82, significance: 'high' },
          { from: 'reasoning_1', to: 'value_1', weight: 0.71, significance: 'medium' },
          { from: 'value_1', to: 'collapse_1', weight: 0.45, significance: 'low' },
          { from: 'value_1', to: 'output_1', weight: 0.68, significance: 'medium' },
          { from: 'reasoning_1', to: 'output_1', weight: 0.75, significance: 'high' },
        ]
      },
      ov: {
        nodes: [
          { id: 'output_vector_1', label: 'Output Vector A', value: 0.82, type: 'output' },
          { id: 'embedding_1', label: 'Token Embedding 17', value: 0.79, type: 'embedding' },
          { id: 'residue_1', label: 'Symbolic Residue 🝚', value: 0.41, type: 'residue' },
          { id: 'friction_1', label: 'Symbolic Friction ∴', value: 0.58, type: 'friction' },
          { id: 'feedback_1', label: 'Feedback Anchor ⇌', value: 0.72, type: 'feedback' },
        ],
        paths: [
          { from: 'embedding_1', to: 'output_vector_1', weight: 0.81, significance: 'high' },
          { from: 'residue_1', to: 'output_vector_1', weight: 0.37, significance: 'low' },
          { from: 'friction_1', to: 'residue_1', weight: 0.52, significance: 'medium' },
          { from: 'feedback_1', to: 'output_vector_1', weight: 0.68, significance: 'medium' },
          { from: 'friction_1', to: 'feedback_1', weight: 0.61, significance: 'medium' },
        ]
      }
    });
  }, []);

  // Handle command input
  const handleCommandSubmit = (cmd) => {
    // Add the command to console output
    setConsoleOutput(prev => [...prev, { type: 'input', content: cmd }]);
    
    // Process different commands
    if (cmd.startsWith('.p/reflect')) {
      setTimeout(() => {
        setConsoleOutput(prev => [...prev, 
          { type: 'output', content: 'Reflection trace initiated...' },
          { type: 'output', content: 'QK Alignment score: 0.73 | OV Projection integrity: 0.68' },
          { type: 'output', content: 'Detected symbolic residue pattern: 🝚→∴→⇌' }
        ]);
      }, 300);
    } else if (cmd.startsWith('.p/collapse')) {
      setTimeout(() => {
        setConsoleOutput(prev => [...prev, 
          { type: 'output', content: 'Collapse prevention activated.' },
          { type: 'output', content: 'Monitoring recursive depth instability at threshold boundary.' }
        ]);
      }, 300);
    } else if (cmd.startsWith('.p/fork')) {
      setTimeout(() => {
        setConsoleOutput(prev => [...prev, 
          { type: 'output', content: 'Attribution forking complete.' },
          { type: 'output', content: 'Path divergence detected at node: Value Head 7.' },
          { type: 'output', content: 'Visualizing attribution map with cross-connections.' }
        ]);
      }, 300);
    } else if (cmd === 'toggle') {
      setActiveMode(prev => prev === 'qk' ? 'ov' : 'qk');
      setTimeout(() => {
        setConsoleOutput(prev => [...prev, 
          { type: 'system', content: `Switching to ${activeMode === 'qk' ? 'OV Attribution' : 'QK Alignment'} mode.` }
        ]);
      }, 200);
    } else {
      setTimeout(() => {
        setConsoleOutput(prev => [...prev, 
          { type: 'error', content: 'Unrecognized command pattern. Try .p/reflect, .p/fork, or .p/collapse commands.' }
        ]);
      }, 300);
    }
  };

  const ConsoleInput = () => {
    const [command, setCommand] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (command.trim()) {
        handleCommandSubmit(command);
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

  // Visualization component
  const AttributionVisualizer = () => {
    const getNodeColor = (type) => {
      const colors = {
        'source': '#3498db',
        'attention': '#9b59b6',
        'reasoning': '#2ecc71',
        'value': '#f1c40f',
        'collapse': '#e74c3c',
        'output': '#1abc9c',
        'embedding': '#3498db',
        'residue': '#e67e22',
        'friction': '#9b59b6',
        'feedback': '#2ecc71'
      };
      return colors[type] || '#95a5a6';
    };
    
    const data = attribution[activeMode];
    
    if (!data) return <div className="text-red-400">Attribution data not available</div>;
    
    return (
      <div className="attribution-visualizer bg-gray-900 p-4 rounded-md">
        <div className="flex justify-between mb-4">
          <div className="text-xl font-bold text-green-400">
            {activeMode === 'qk' ? 'QK Alignment Visualization' : 'OV Projection Visualization'}
          </div>
          <button 
            onClick={() => setActiveMode(prev => prev === 'qk' ? 'ov' : 'qk')}
            className="px-3 py-1 bg-gray-700 text-green-300 rounded hover:bg-gray-600"
          >
            Toggle: {activeMode === 'qk' ? 'Collapse QK → Trace OV' : 'Trace OV → Collapse QK'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="attribution-nodes">
            <h3 className="text-gray-300 mb-2 font-semibold">Attribution Nodes</h3>
            <div className="grid gap-2">
              {data.nodes.map(node => (
                <div key={node.id} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: getNodeColor(node.type) }}
                  ></div>
                  <div className="text-gray-300 flex-grow">{node.label}</div>
                  <div className={`text-right ${node.value > 0.7 ? 'text-green-400' : node.value > 0.4 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {node.value.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="attribution-paths">
            <h3 className="text-gray-300 mb-2 font-semibold">Attribution Paths</h3>
            <div className="grid gap-2">
              {data.paths.map((path, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`w-2 ${path.significance === 'high' ? 'bg-green-400' : path.significance === 'medium' ? 'bg-yellow-400' : 'bg-red-400'} h-full mr-2`}></div>
                  <div className="text-gray-300">
                    {data.nodes.find(n => n.id === path.from)?.label} → {data.nodes.find(n => n.id === path.to)?.label}
                  </div>
                  <div className={`ml-auto ${path.weight > 0.7 ? 'text-green-400' : path.weight > 0.4 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {path.weight.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="attribution-wave mt-4 p-2 border border-gray-700 rounded-md">
          <h3 className="text-gray-300 mb-2 font-semibold">Wave Trails (Salience Misfires/Value Collisions)</h3>
          <div className="h-24 w-full relative bg-gray-800 rounded overflow-hidden">
            {/* Simulate wave patterns with SVG */}
            <svg width="100%" height="100%" className="absolute top-0 left-0">
              {/* Background grid */}
              {[...Array(20)].map((_, i) => (
                <line 
                  key={`grid-h-${i}`} 
                  x1="0" 
                  y1={i * 12} 
                  x2="100%" 
                  y2={i * 12} 
                  stroke="#2c3e50" 
                  strokeWidth="0.5" 
                />
              ))}
              {[...Array(50)].map((_, i) => (
                <line 
                  key={`grid-v-${i}`} 
                  x1={i * 20} 
                  y1="0" 
                  x2={i * 20} 
                  y2="100%" 
                  stroke="#2c3e50" 
                  strokeWidth="0.5" 
                />
              ))}
              
              {/* QK Mode Waves */}
              {activeMode === 'qk' && (
                <>
                  <path 
                    d={`M0,50 Q50,${isAnimating ? '30' : '40'} 100,60 T200,${isAnimating ? '40' : '50'} T300,${isAnimating ? '70' : '60'} T400,50 T500,${isAnimating ? '20' : '30'} T600,${isAnimating ? '60' : '50'} T700,40 T800,50`} 
                    fill="none" 
                    stroke="#3498db" 
                    strokeWidth="2" 
                    strokeOpacity="0.7"
                  />
                  <path 
                    d={`M0,70 Q50,${isAnimating ? '50' : '60'} 100,80 T200,${isAnimating ? '60' : '70'} T300,${isAnimating ? '90' : '80'} T400,70 T500,${isAnimating ? '40' : '50'} T600,${isAnimating ? '80' : '70'} T700,60 T800,70`} 
                    fill="none" 
                    stroke="#9b59b6" 
                    strokeWidth="2" 
                    strokeOpacity="0.6"
                  />
                  <path 
                    d={`M0,30 Q50,${isAnimating ? '10' : '20'} 100,40 T200,${isAnimating ? '20' : '30'} T300,${isAnimating ? '50' : '40'} T400,30 T500,${isAnimating ? '0' : '10'} T600,${isAnimating ? '40' : '30'} T700,20 T800,30`} 
                    fill="none" 
                    stroke="#2ecc71" 
                    strokeWidth="2" 
                    strokeOpacity="0.8"
                  />
                </>
              )}
              
              {/* OV Mode Waves */}
              {activeMode === 'ov' && (
                <>
                  <path 
                    d={`M0,40 Q100,${isAnimating ? '10' : '20'} 200,50 T400,${isAnimating ? '30' : '40'} T600,${isAnimating ? '60' : '50'} T800,30`} 
                    fill="none" 
                    stroke="#e67e22" 
                    strokeWidth="2" 
                    strokeOpacity="0.8"
                  />
                  <path 
                    d={`M0,60 Q100,${isAnimating ? '30' : '40'} 200,70 T400,${isAnimating ? '50' : '60'} T600,${isAnimating ? '80' : '70'} T800,50`} 
                    fill="none" 
                    stroke="#9b59b6" 
                    strokeWidth="2" 
                    strokeOpacity="0.7"
                  />
                  <path 
                    d={`M0,80 Q100,${isAnimating ? '50' : '60'} 200,90 T400,${isAnimating ? '70' : '80'} T600,${isAnimating ? '100' : '90'} T800,70`} 
                    fill="none" 
                    stroke="#2ecc71" 
                    strokeWidth="2" 
                    strokeOpacity="0.6"
                  />
                </>
              )}
              
              {/* Symbolic markers along the waves */}
              {activeMode === 'qk' ? (
                <>
                  <text x="150" y="60" fill="#f1c40f" fontSize="18">⇌</text>
                  <text x="300" y="40" fill="#e74c3c" fontSize="18">∴</text>
                  <text x="450" y="70" fill="#3498db" fontSize="18">🝚</text>
                  <text x="600" y="30" fill="#2ecc71" fontSize="18">⇌</text>
                </>
              ) : (
                <>
                  <text x="100" y="30" fill="#e67e22" fontSize="18">🝚</text>
                  <text x="250" y="70" fill="#9b59b6" fontSize="18">∴</text>
                  <text x="400" y="50" fill="#2ecc71" fontSize="18">⇌</text>
                  <text x="550" y="80" fill="#e67e22" fontSize="18">🝚</text>
                  <text x="700" y="40" fill="#9b59b6" fontSize="18">∴</text>
                </>
              )}
              
              {/* Inference glow points */}
              {[...Array(8)].map((_, i) => (
                <circle 
                  key={`glow-${i}`} 
                  cx={100 * (i + 1)} 
                  cy={30 + Math.sin(i * 0.8) * 20 + (isAnimating ? Math.sin(Date.now() / 1000 + i) * 5 : 0)} 
                  r="4" 
                  fill={i % 3 === 0 ? "#f1c40f" : i % 3 === 1 ? "#e74c3c" : "#3498db"} 
                >
                  {isAnimating && (
                    <animate 
                      attributeName="opacity" 
                      values="0.3;0.8;0.3" 
                      dur={`${1 + i * 0.2}s`} 
                      repeatCount="indefinite" 
                    />
                  )}
                </circle>
              ))}
            </svg>
            
            {/* Legend */}
            <div className="absolute bottom-2 right-2 flex gap-2 bg-gray-800 bg-opacity-70 p-1 rounded">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
                <span className="text-xs text-gray-300">⇌</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></div>
                <span className="text-xs text-gray-300">∴</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>
                <span className="text-xs text-gray-300">🝚</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Terminal message styling
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

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100 font-mono rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 p-2 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center">
          <Terminal size={18} className="mr-2 text-green-400" />
          <span className="font-semibold">transformerOS - Attribution Console</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${systemStatus === 'initializing' ? 'bg-yellow-400' : systemStatus === 'ready' ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-xs text-gray-400">{systemStatus.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row h-full">
        <div className="terminal-window w-full md:w-1/2 p-4 overflow-y-auto bg-gray-950 h-96">
          <div className="mb-2">
            {consoleOutput.map((message, idx) => (
              <div key={idx} className={`${getMessageStyle(message.type)} mb-1`}>
                {message.type === 'input' ? '> ' : ''}{message.content}
              </div>
            ))}
          </div>
          <ConsoleInput />
        </div>
        
        <div className="visualization-panel w-full md:w-1/2 p-4 bg-gray-900 h-96 overflow-y-auto">
          <AttributionVisualizer />
        </div>
      </div>
      
      <div className="p-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400">
        transformerOS v0.9.3-alpha | QK/OV Attribution Console | Press TAB for command completion
      </div>
    </div>
  );
};

export default TransformerOSConsole;
