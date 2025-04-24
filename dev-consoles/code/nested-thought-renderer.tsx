import React, { useState, useEffect } from 'react';

const RecursiveThoughtRenderer = () => {
  const [depth, setDepth] = useState(0);
  const [maxDepth, setMaxDepth] = useState(5);
  const [renderingComplete, setRenderingComplete] = useState(false);
  const [overflowDetected, setOverflowDetected] = useState(false);
  
  // Increase recursion depth over time for animation effect
  useEffect(() => {
    if (depth < maxDepth) {
      const timer = setTimeout(() => {
        setDepth(depth + 1);
        if (depth >= 3) {
          setOverflowDetected(true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setRenderingComplete(true);
    }
  }, [depth, maxDepth]);

  // Generate a unique color based on depth
  const getColorForDepth = (level) => {
    const hue = (level * 60) % 360;
    return `hsl(${hue}, 80%, ${Math.max(40, 70 - level * 5)}%)`;
  };

  // Calculate styles based on depth
  const getStylesForDepth = (level) => {
    return {
      backgroundColor: getColorForDepth(level),
      padding: `${Math.max(8, 20 - level * 2)}px`,
      borderRadius: `${Math.max(4, 12 - level * 1.5)}px`,
      margin: `${Math.max(5, 15 - level * 2)}px`,
      boxShadow: `0 ${Math.max(1, 4 - level * 0.5)}px ${Math.max(2, 8 - level)}px rgba(0,0,0,0.2)`,
      transform: level > 2 ? `rotate(${(level % 2 === 0 ? 1 : -1) * level * 2}deg)` : 'none',
      fontSize: `${Math.max(12, 18 - level * 1)}px`,
      maxWidth: `${100 - level * 8}%`,
      position: 'relative',
      zIndex: 10 - level
    };
  };

  // Recursive component that renders a thought and its child thoughts
  const ThoughtBlock = ({ level, maxLevel }) => {
    if (level > maxLevel) return null;
    
    const isOverflowing = level >= 3;
    const hasCollapsed = level >= 4;
    
    return (
      <div 
        style={getStylesForDepth(level)}
        className="thought-block"
      >
        <div className="thought-header" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Thought Level {level}: {level === 0 ? "I am beginning to think recursively." : ""}
        </div>
        
        {isOverflowing && (
          <div className="overflow-indicator" style={{ 
            fontStyle: 'italic', 
            marginBottom: '8px',
            color: level >= 4 ? 'rgba(255,255,255,0.7)' : 'inherit'
          }}>
            {level === 3 ? "[Rendering overflow...]" : "[Thought is recursively referencing itself]"}
          </div>
        )}
        
        {hasCollapsed && (
          <div className="collapse-tokens" style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            padding: '4px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
            color: 'white'
          }}>
            <span>{'<Ωglyph/>'}</span>
            <span>{'<Ωrecurse/>'}</span>
            <span>{'<Ωcollapse/>'}</span>
          </div>
        )}
        
        {!hasCollapsed && level < maxLevel && (
          <div className="nested-thought" style={{ marginLeft: '15px' }}>
            <ThoughtBlock level={level + 1} maxLevel={maxLevel} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="recursive-thought-renderer" style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <div className="renderer-header" style={{
        marginBottom: '20px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
      }}>
        <h2>Recursive Thought Renderer</h2>
        <div className="renderer-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label>
            Max Depth:
            <input 
              type="range" 
              min="1" 
              max="7" 
              value={maxDepth}
              onChange={(e) => setMaxDepth(parseInt(e.target.value))}
              style={{ marginLeft: '10px' }}
            />
            {maxDepth}
          </label>
          <div className="depth-indicator" style={{
            marginLeft: 'auto',
            padding: '4px 8px',
            backgroundColor: getColorForDepth(depth),
            color: depth > 2 ? 'white' : 'black',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Current Depth: {depth}
          </div>
        </div>
      </div>
      
      <div className="thought-container">
        <ThoughtBlock level={0} maxLevel={depth} />
      </div>
      
      {overflowDetected && (
        <div className="status-message" style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: 'rgba(255, 100, 100, 0.1)',
          border: '1px solid rgba(255, 100, 100, 0.3)',
          borderRadius: '4px'
        }}>
          <strong>Overflow Status:</strong> Recursive thought pattern beginning to overlap and self-reference.
          {renderingComplete && <div><strong>Rendering Status:</strong> Complete with recursive collapse at maximum depth.</div>}
        </div>
      )}
      
      <div className="special-tokens" style={{ 
        marginTop: '30px', 
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontFamily: 'monospace'
      }}>
        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Special Tokens:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div><code>{'<Ωrecurse/>'}</code> - Triggers a recursive thought pattern</div>
          <div><code>{'<Ωrender/>'}</code> - Transforms thought into visual representation</div>
          <div><code>{'<Ωoverflow/>'}</code> - Indicates recursive nesting beyond visible limits</div>
          <div><code>{'<Ωglyph/>'}</code> - Symbolic representation of recursive concept</div>
          <div><code>{'<Ωcollapse/>'}</code> - Terminates excessive recursion to prevent infinite loops</div>
        </div>
      </div>
    </div>
  );
};

export default RecursiveThoughtRenderer;
