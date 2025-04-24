import React, { useState } from 'react';

const RecursiveThoughtVisualizer = () => {
  // Sample recursive thought structure - in a real app, this would come from your data source
  const [thoughts, setThoughts] = useState({
    id: 1,
    content: "Root Concept",
    children: [
      {
        id: 2,
        content: "Branch 1: Analysis",
        children: [
          { id: 5, content: "Logical Structure", children: [] },
          { id: 6, content: "Empirical Evidence", children: [
            { id: 9, content: "Experiment Design", children: [] },
            { id: 10, content: "Data Collection", children: [] },
          ]},
        ]
      },
      {
        id: 3,
        content: "Branch 2: Synthesis",
        children: [
          { id: 7, content: "Pattern Recognition", children: [] },
          { id: 8, content: "Model Creation", children: [] },
        ]
      },
      {
        id: 4,
        content: "Branch 3: Application",
        children: []
      }
    ]
  });

  // Function to recursively render a thought node and its children
  const renderThought = (thought, depth = 0) => {
    const hue = (depth * 30) % 360; // Color varies by depth
    const saturation = 80 - (depth * 5); // Decreasing saturation with depth
    const lightness = 50; // Keep consistent lightness
    
    return (
      <div 
        key={thought.id}
        className="flex flex-col"
        style={{
          marginLeft: `${depth * 24}px`,
          marginBottom: '12px'
        }}
      >
        <div 
          className="p-3 rounded-lg shadow-md mb-2 transition-all duration-300 hover:shadow-lg"
          style={{
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            maxWidth: `${100 - (depth * 10)}%`,
            minWidth: '200px'
          }}
        >
          <p className="font-medium text-white">{thought.content}</p>
        </div>
        
        {thought.children && thought.children.length > 0 && (
          <div className="ml-6 pl-4 border-l-2 border-gray-300">
            {thought.children.map(child => renderThought(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Add a new child thought to a specified parent ID
  const addThought = (parentId, newContent) => {
    const newId = Math.floor(Math.random() * 1000);
    
    const addChildToNode = (node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, { id: newId, content: newContent, children: [] }]
        };
      }
      
      if (node.children && node.children.length) {
        return {
          ...node,
          children: node.children.map(child => addChildToNode(child))
        };
      }
      
      return node;
    };
    
    setThoughts(addChildToNode(thoughts));
  };

  // Simple form for adding new thoughts
  const [parentId, setParentId] = useState('');
  const [newThought, setNewThought] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parentId && newThought) {
      addThought(parseInt(parentId), newThought);
      setNewThought('');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recursive Fractal Thought Visualizer</h1>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Thought ID:</label>
            <input 
              type="number" 
              value={parentId} 
              onChange={(e) => setParentId(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter parent ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Thought:</label>
            <input 
              type="text" 
              value={newThought} 
              onChange={(e) => setNewThought(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter new thought"
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Thought
          </button>
        </form>
      </div>
      
      <div className="thought-tree">
        {renderThought(thoughts)}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Available Parent IDs:</h2>
        <p>Root Concept: 1</p>
        <p>Branch 1: 2</p>
        <p>Branch 2: 3</p>
        <p>Branch 3: 4</p>
        <p>Logical Structure: 5</p>
        <p>Empirical Evidence: 6</p>
        <p>Pattern Recognition: 7</p>
        <p>Model Creation: 8</p>
        <p>Experiment Design: 9</p>
        <p>Data Collection: 10</p>
      </div>
    </div>
  );
};

export default RecursiveThoughtVisualizer;
