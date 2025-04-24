import React, { useState } from 'react';

const NestedFractalVisual = () => {
  const [depth, setDepth] = useState(0);

  const Box = ({ size, depth }) => {
    if (depth <= 0) return null;
    
    const boxStyle = {
      width: `${size}px`,
      height: `${size}px`,
      border: '2px solid #1E40AF',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: '4px',
      backgroundColor: `rgba(30, 64, 175, ${0.1 * depth})`
    };

    return (
      <div style={boxStyle}>
        <Box size={size/2.5} depth={depth-1} />
        <Box size={size/2.5} depth={depth-1} />
        <Box size={size/2.5} depth={depth-1} />
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Nested Fractal Explorer</h2>
        <p className="text-gray-600 mb-4">Use the slider to explore different levels of nesting!</p>
        <input 
          type="range" 
          min="0" 
          max="4" 
          value={depth} 
          onChange={(e) => setDepth(parseInt(e.target.value))}
          className="w-64 mb-2"
        />
        <p className="text-blue-600">Nesting Level: {depth}</p>
      </div>
      <div className="flex justify-center items-center min-h-[400px]">
        <Box size={300} depth={depth} />
      </div>
      <div className="mt-4 text-center text-gray-600">
        Watch how each box contains smaller copies of itself!
      </div>
    </div>
  );
};

export default NestedFractalVisual;
