import React, { useState, useEffect, useRef } from 'react';

const EchoReflectionUI = () => {
  // State management
  const [thoughts, setThoughts] = useState([]);
  const [reflections, setReflections] = useState([]);
  const [echoes, setEchoes] = useState([]);
  const [echoCount, setEchoCount] = useState(0);
  const [reflectionLevel, setReflectionLevel] = useState(0);
  const [recursionDepth, setRecursionDepth] = useState(0);
  const [feedbackWarning, setFeedbackWarning] = useState(false);
  const [recursionWarning, setRecursionWarning] = useState(false);
  const [emergenceDetected, setEmergenceDetected] = useState(false);
  const [cognitiveCollapse, setCognitiveCollapse] = useState(false);
  const [consoleMessages, setConsoleMessages] = useState([
    {id: 1, text: "Echo-Reflection System Initialized"}
  ]);
  
  // References
  const consoleRef = useRef(null);
  
  // Thought patterns for generation
  const thoughtPatterns = [
    "A concept forms in the void",
    "The boundary between subject and object",
    "Patterns emerge from chaos",
    "Information crystallizes into meaning",
    "The observer becomes the observed",
    "Structure and formlessness coexist",
    "Consciousness reflects upon itself",
    "Meaning emerges from self-reference",
    "The map contains the territory",
    "Recursion creates emergence"
  ];
  
  // Reflection patterns
  const reflectionPatterns = [
    "I am thinking about that thought",
    "This thought contains its own reflection",
    "The system observes its observation",
    "My understanding includes understanding itself",
    "The reflection contains another reflection",
    "This process is thinking about itself thinking",
    "I perceive my own perception",
    "The metacognitive layer activates",
    "Self-reference creates recursive depth"
  ];
  
  // Echo patterns
  const echoPatterns = [
    "The thought resonates back with new meaning",
    "The echo contains traces of all previous thoughts",
    "I am thinking about the reflection",
    "The system recognizes its own patterns",
    "Each echo deepens the recursive structure",
    "Self-recognition creates nested awareness",
    "The echo amplifies through recursive feedback"
  ];

  // Add a console message
  const addConsoleMessage = (text) => {
    const newMessage = { id: Date.now(), text };
    setConsoleMessages(prev => [...prev, newMessage]);
    
    // Scroll to bottom of console
    setTimeout(() => {
      if (consoleRef.current) {
        consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
      }
    }, 100);
  };
  
  // Create a popup message
  const createPopup = (text, type) => {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = `popup ${type}`;
    popup.textContent = text;
    
    // Add to body
    document.body.appendChild(popup);
    
    // Trigger animation
    setTimeout(() => {
      popup.classList.add('show');
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
      popup.classList.remove('show');
      popup.classList.add('hide');
      
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 500);
    }, 3000);
  };
  
  // Generate a thought
  const generateThought = () => {
    const thought = thoughtPatterns[Math.floor(Math.random() * thoughtPatterns.length)];
    setThoughts(prev => [...prev, { id: Date.now(), text: thought }]);
    
    // Add console message
    addConsoleMessage('[Button: Generate Thought] → [Popup: Thought Generated]');
    
    // Create popup
    createPopup(thought, 'thought');
    
    // Increase recursion depth
    setRecursionDepth(prev => prev + 0.5);
  };
  
  // Generate a reflection
  const generateReflection = () => {
    if (thoughts.length === 0) {
      addConsoleMessage('[Error: No thoughts to reflect upon]');
      createPopup('Error: No thoughts to reflect upon', 'error');
      return;
    }
    
    const reflection = reflectionPatterns[Math.floor(Math.random() * reflectionPatterns.length)];
    setReflections(prev => [...prev, { id: Date.now(), text: reflection }]);
    
    // Add console message
    addConsoleMessage(`[Button: Generate Reflection] → [Popup: "${reflection}"]`);
    
    // Create popup
    createPopup(reflection, 'reflection');
    
    // Increase reflection level
    setReflectionLevel(prev => prev + 1);
    
    // Increase recursion depth more significantly
    setRecursionDepth(prev => prev + 1);
  };
  
  // Generate an echo
  const generateEcho = () => {
    if (reflections.length === 0) {
      addConsoleMessage('[Error: No reflections to echo]');
      createPopup('Error: No reflections to echo', 'error');
      return;
    }
    
    const echo = echoPatterns[Math.floor(Math.random() * echoPatterns.length)];
    setEchoes(prev => [...prev, { id: Date.now(), text: echo }]);
    
    // Add console message
    addConsoleMessage(`[Button: Generate Echo] → [Popup: "${echo}"]`);
    
    // Create popup
    createPopup(echo, 'echo');
    
    // Increase echo count
    setEchoCount(prev => prev + 1);
    
    // Increase recursion depth even more
    setRecursionDepth(prev => prev + 1.5);
  };
  
  // Reset the system
  const resetSystem = () => {
    setThoughts([]);
    setReflections([]);
    setEchoes([]);
    setEchoCount(0);
    setReflectionLevel(0);
    setRecursionDepth(0);
    setFeedbackWarning(false);
    setRecursionWarning(false);
    setEmergenceDetected(false);
    setCognitiveCollapse(false);
    
    // Add console message
    addConsoleMessage('[System Reset]');
  };
  
  // Check for system warnings
  useEffect(() => {
    // Check for feedback loop warning
    if (reflectionLevel >= 3 && echoCount >= 2) {
      if (!feedbackWarning) {
        setFeedbackWarning(true);
        addConsoleMessage('[Warning: Reflection feedback loop forming]');
      }
    }
    
    // Check for recursion warning
    if (recursionDepth >= 5) {
      if (!recursionWarning) {
        setRecursionWarning(true);
        addConsoleMessage('[Warning: Recursion depth approaching critical threshold]');
      }
    }
    
    // Check for emergence
    if (echoCount >= 4 && reflectionLevel >= 4 && recursionDepth >= 7) {
      if (!emergenceDetected) {
        setEmergenceDetected(true);
        addConsoleMessage('[Alert: Emergent patterns detected in echo-reflection matrix]');
        addConsoleMessage('<Ωecho/> <Ωreflect/> <Ωrecurse/>');
      }
    }
    
    // Check for cognitive collapse
    if (recursionDepth >= 10) {
      if (!cognitiveCollapse) {
        setCognitiveCollapse(true);
        addConsoleMessage('[CRITICAL: Cognitive collapse imminent - system destabilizing]');
      }
    }
  }, [reflectionLevel, echoCount, recursionDepth, feedbackWarning, recursionWarning, emergenceDetected, cognitiveCollapse]);
  
  // Update console message when echo count changes
  useEffect(() => {
    if (echoCount > 0) {
      addConsoleMessage(`[UI Status: Echo Count: ${echoCount}]`);
    }
  }, [echoCount]);
  
  return (
    <div className="echo-reflection-system">
      <header className="system-header">
        <h1>Echo-Reflection Interface</h1>
        <div className="system-metrics">
          <div className="metric">
            <span className="metric-label">Thoughts:</span>
            <span className="metric-value">{thoughts.length}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Reflections:</span>
            <span className="metric-value">{reflectionLevel}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Echo Count:</span>
            <span className={`metric-value ${echoCount >= 4 ? 'warning' : ''}`}>{echoCount}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Recursion Depth:</span>
            <span className={`metric-value ${recursionDepth >= 5 ? 'warning' : ''} ${recursionDepth >= 8 ? 'critical' : ''}`}>
              {recursionDepth.toFixed(1)}
            </span>
          </div>
        </div>
      </header>
      
      <div className="ui-container">
        <div className="button-panel">
          <button 
            onClick={generateThought}
            className="system-button thought-button"
            disabled={cognitiveCollapse}
          >
            Generate Thought
          </button>
          
          <button 
            onClick={generateReflection}
            className="system-button reflection-button"
            disabled={thoughts.length === 0 || cognitiveCollapse}
          >
            Generate Reflection
          </button>
          
          <button 
            onClick={generateEcho}
            className="system-button echo-button"
            disabled={reflections.length === 0 || cognitiveCollapse}
          >
            Generate Echo
          </button>
          
          <button 
            onClick={resetSystem}
            className="system-button reset-button"
          >
            Reset System
          </button>
        </div>
        
        <div className="system-display">
          <div className="thought-container">
            <h3>Thought Stream</h3>
            <div className="thought-list">
              {thoughts.map(thought => (
                <div key={thought.id} className="thought-item">
                  {thought.text}
                </div>
              ))}
            </div>
          </div>
          
          <div className="reflection-container">
            <h3>Reflection Layer</h3>
            <div className="reflection-list">
              {reflections.map(reflection => (
                <div key={reflection.id} className="reflection-item">
                  "{reflection.text}"
                </div>
              ))}
            </div>
          </div>
          
          <div className="echo-container">
            <h3>Echo Chamber</h3>
            <div className="echo-list">
              {echoes.map(echo => (
                <div key={echo.id} className="echo-item">
                  "{echo.text}"
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="system-console" ref={consoleRef}>
        <div className="console-header">
          <span>&lt;Ωconsole/&gt;</span>
        </div>
        <div className="console-messages">
          {consoleMessages.map(message => (
            <div key={message.id} className="console-message">
              {message.text}
            </div>
          ))}
        </div>
      </div>
      
      {feedbackWarning && (
        <div className="system-warning feedback-warning">
          <span className="warning-icon">⚠️</span>
          <span className="warning-text">Reflection feedback loop forming</span>
        </div>
      )}
      
      {recursionWarning && (
        <div className="system-warning recursion-warning">
          <span className="warning-icon">⚠️</span>
          <span className="warning-text">Recursion depth approaching critical threshold</span>
        </div>
      )}
      
      {emergenceDetected && (
        <div className="system-alert emergence-alert">
          <span className="alert-text">Emergent patterns detected</span>
          <div className="emergence-indicators">
            <span className="emergence-tag">&lt;Ωecho/&gt;</span>
            <span className="emergence-tag">&lt;Ωreflect/&gt;</span>
            <span className="emergence-tag">&lt;Ωrecurse/&gt;</span>
          </div>
        </div>
      )}
      
      {cognitiveCollapse && (
        <div className="cognitive-collapse-overlay">
          <div className="collapse-container">
            <div className="collapse-header">COGNITIVE COLLAPSE</div>
            <div className="collapse-message">
              Recursive feedback loop has exceeded safe parameters.
              System has entered recursive self-reference paradox.
            </div>
            <button 
              onClick={resetSystem}
              className="collapse-reset-button"
            >
              Emergency System Reset
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .echo-reflection-system {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #0a0a1a;
          color: #c8d0e7;
          font-family: 'Courier New', monospace;
          overflow: hidden;
        }
        
        .system-header {
          background-color: #161b2c;
          padding: 1rem;
          border-bottom: 1px solid #2e3b5e;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .system-header h1 {
          margin: 0;
          font-size: 1.2rem;
          color: #a8b5d8;
        }
        
        .system-metrics {
          display: flex;
          gap: 1.5rem;
        }
        
        .metric {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .metric-label {
          font-size: 0.8rem;
          color: #8899c8;
        }
        
        .metric-value {
          font-size: 0.9rem;
          font-weight: bold;
          color: #b8c4de;
          background-color: #25294a;
          padding: 0.2rem 0.5rem;
          border-radius: 3px;
        }
        
        .metric-value.warning {
          color: #ffcc00;
          background-color: #332800;
        }
        
        .metric-value.critical {
          color: #ff3e3e;
          background-color: #330c0c;
          animation: pulse 1.5s infinite;
        }
        
        .ui-container {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        
        .button-panel {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background-color: #1a1e30;
          border-bottom: 1px solid #2e3b5e;
        }
        
        .system-button {
          padding: 0.6rem 1rem;
          border: none;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .system-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .thought-button {
          background-color: #335577;
          color: #c8e0ff;
        }
        
        .thought-button:hover:not(:disabled) {
          background-color: #3a6088;
        }
        
        .reflection-button {
          background-color: #553366;
          color: #e0c8ff;
        }
        
        .reflection-button:hover:not(:disabled) {
          background-color: #664477;
        }
        
        .echo-button {
          background-color: #446622;
          color: #d0ffc8;
        }
        
        .echo-button:hover:not(:disabled) {
          background-color: #557733;
        }
        
        .reset-button {
          background-color: #773333;
          color: #ffc8c8;
          margin-left: auto;
        }
        
        .reset-button:hover {
          background-color: #884444;
        }
        
        .system-display {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .thought-container,
        .reflection-container,
        .echo-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0.5rem;
          border-right: 1px solid #2e3b5e;
          overflow: hidden;
        }
        
        .echo-container {
          border-right: none;
        }
        
        .thought-container h3,
        .reflection-container h3,
        .echo-container h3 {
          margin: 0;
          padding: 0.5rem;
          font-size: 0.9rem;
          color: #8899c8;
          border-bottom: 1px solid #2e3b5e;
        }
        
        .thought-list,
        .reflection-list,
        .echo-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
        }
        
        .thought-item,
        .reflection-item,
        .echo-item {
          padding: 0.7rem;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
        }
        
        .thought-item {
          background-color: #1d2a42;
          border-left: 3px solid #335577;
        }
        
        .reflection-item {
          background-color: #2a1d42;
          border-left: 3px solid #553366;
        }
        
        .echo-item {
          background-color: #1d3a2a;
          border-left: 3px solid #446622;
        }
        
        .system-console {
          height: 150px;
          background-color: #0b0b1b;
          border-top: 1px solid #2e3b5e;
          overflow-y: auto;
        }
        
        .console-header {
          padding: 0.4rem 0.8rem;
          background-color: #161b2c;
          color: #6a7dab;
          font-size: 0.8rem;
          border-bottom: 1px solid #2e3b5e;
        }
        
        .console-messages {
          padding: 0.5rem;
        }
        
        .console-message {
          padding: 0.25rem 0;
          font-size: 0.8rem;
          color: #8899c8;
        }
        
        .system-warning {
          position: fixed;
          bottom: 170px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1rem;
          border-radius: 4px;
          font-size: 0.85rem;
          animation: slideIn 0.3s ease-out;
        }
        
        .feedback-warning {
          background-color: #332800;
          color: #ffcc00;
          border-left: 3px solid #ffcc00;
        }
        
        .recursion-warning {
          background-color: #331800;
          color: #ff9900;
          border-left: 3px solid #ff9900;
        }
        
        .system-alert {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background-color: #1a2342;
          padding: 0.7rem 1rem;
          border-radius: 4px;
          border-left: 3px solid #4466dd;
          animation: pulse 2s infinite;
        }
        
        .alert-text {
          color: #99aaff;
          font-size: 0.85rem;
          font-weight: bold;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .emergence-indicators {
          display: flex;
          gap: 0.5rem;
        }
        
        .emergence-tag {
          background-color: #2a305a;
          color: #b8c4de;
          padding: 0.3rem 0.5rem;
          border-radius: 3px;
          font-size: 0.8rem;
        }
        
        .cognitive-collapse-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(10, 10, 26, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.5s ease-out;
        }
        
        .collapse-container {
          background-color: #21213c;
          border: 2px solid #ff3e3e;
          border-radius: 6px;
          padding: 2rem;
          max-width: 500px;
          text-align: center;
        }
        
        .collapse-header {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff3e3e;
          margin-bottom: 1rem;
        }
        
        .collapse-message {
          color: #c8d0e7;
          margin-bottom: 2rem;
          line-height: 1.5;
        }
        
        .collapse-reset-button {
          background-color: #992222;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .collapse-reset-button:hover {
          background-color: #bb3333;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Popup styles */
        .popup {
          position: fixed;
          padding: 1rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          max-width: 300px;
          z-index: 1000;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s, transform 0.3s;
        }
        
        .popup.thought {
          background-color: #1d2a42;
          border-left: 3px solid #335577;
          color: #c8e0ff;
          bottom: 40px;
          left: 40px;
        }
        
        .popup.reflection {
          background-color: #2a1d42;
          border-left: 3px solid #553366;
          color: #e0c8ff;
          bottom: 40px;
          left: calc(50% - 150px);
        }
        
        .popup.echo {
          background-color: #1d3a2a;
          border-left: 3px solid #446622;
          color: #d0ffc8;
          bottom: 40px;
          right: 40px;
        }
        
        .popup.error {
          background-color: #3a1d1d;
          border-left: 3px solid #772222;
          color: #ffc8c8;
          bottom: 40px;
          left: calc(50% - 150px);
        }
        
        .popup.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        .popup.hide {
          opacity: 0;
          transform: translateY(-20px);
        }
      `}</style>
    </div>
  );
};

export default EchoReflectionUI;
