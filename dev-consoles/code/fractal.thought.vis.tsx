import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Recursive Thought Component
const RecursiveThought = ({ thought, depth = 0, maxDepth = 3, colorIndex = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  
  // Color palette for different nesting levels
  const colors = [
    'bg-blue-100 border-blue-500',
    'bg-purple-100 border-purple-500',
    'bg-teal-100 border-teal-500',
    'bg-amber-100 border-amber-500',
    'bg-rose-100 border-rose-500',
  ];
  
  // Text colors that complement the backgrounds
  const textColors = [
    'text-blue-800',
    'text-purple-800',
    'text-teal-800',
    'text-amber-800',
    'text-rose-800',
  ];
  
  // Determine current color based on depth
  const currentColor = colors[colorIndex % colors.length];
  const currentTextColor = textColors[colorIndex % textColors.length];
  
  // Calculate scale and padding based on depth
  const scale = 1 - (depth * 0.05);
  const paddingLeft = depth * 4;
  
  // Stop recursion if we've reached max depth or if there are no subthoughts
  if (depth > maxDepth || !thought.subthoughts || thought.subthoughts.length === 0) {
    return (
      <motion.div 
        className={`rounded-lg border-2 p-3 my-2 ${currentColor}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: depth * 0.1 }}
        style={{ marginLeft: `${paddingLeft}px`, transform: `scale(${scale})`, transformOrigin: 'left top' }}
      >
        <h3 className={`font-bold ${currentTextColor}`}>{thought.title}</h3>
        <p className={`mt-1 ${currentTextColor}`}>{thought.content}</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className={`rounded-lg border-2 p-3 my-2 ${currentColor}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: depth * 0.1 }}
      style={{ marginLeft: `${paddingLeft}px`, transform: `scale(${scale})`, transformOrigin: 'left top' }}
    >
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className={`font-bold ${currentTextColor}`}>{thought.title}</h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`${currentTextColor}`}
        >
          ▼
        </motion.div>
      </div>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <p className={`mt-1 ${currentTextColor}`}>{thought.content}</p>
        
        {isExpanded && thought.subthoughts && thought.subthoughts.map((subthought, index) => (
          <RecursiveThought 
            key={index} 
            thought={subthought} 
            depth={depth + 1} 
            maxDepth={maxDepth}
            colorIndex={colorIndex + 1} 
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Main Fractal Thought Viewer Component
const FractalThoughtViewer = () => {
  const [maxDepth, setMaxDepth] = useState(5);
  
  // Sample nested thought structure
  const sampleThought = {
    title: "Understanding Fractal UIs",
    content: "Fractal user interfaces represent information in self-similar recursive patterns.",
    subthoughts: [
      {
        title: "Self-Similarity Principle",
        content: "Each component follows the same pattern as the whole, creating visual harmony.",
        subthoughts: [
          {
            title: "Visual Coherence",
            content: "Self-similarity creates intuitive recognition and easier navigation.",
            subthoughts: [
              {
                title: "Pattern Recognition",
                content: "Users quickly learn the interaction model across all levels of the interface.",
              }
            ]
          },
          {
            title: "Scalable Complexity",
            content: "The same UI pattern works for simple and complex information alike.",
          }
        ]
      },
      {
        title: "Recursive Implementation",
        content: "Components render themselves to create infinite nesting possibilities.",
        subthoughts: [
          {
            title: "React Component Recursion",
            content: "A component that renders instances of itself with modified props.",
            subthoughts: [
              {
                title: "Termination Condition",
                content: "Always include a base case to prevent infinite recursion.",
              },
              {
                title: "Performance Considerations", 
                content: "Deep recursion can impact performance; use techniques like virtualization for large datasets.",
              }
            ]
          },
          {
            title: "State Management",
            content: "Each recursive instance maintains its own state, creating independent interaction zones.",
          }
        ]
      },
      {
        title: "Interaction Design",
        content: "Special consideration for how users navigate through nested levels.",
        subthoughts: [
          {
            title: "Progressive Disclosure",
            content: "Reveal information gradually to prevent cognitive overload.",
          },
          {
            title: "Breadcrumb Navigation",
            content: "Help users track their position in the recursive hierarchy.",
          }
        ]
      }
    ]
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Fractal Thought Visualizer</h1>
      
      <div className="mb-4">
        <label htmlFor="depth-slider" className="block text-gray-700 mb-2">
          Maximum Recursion Depth: {maxDepth}
        </label>
        <input 
          id="depth-slider"
          type="range" 
          min="1" 
          max="10" 
          value={maxDepth} 
          onChange={(e) => setMaxDepth(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-700">
          This component demonstrates recursive rendering of nested thoughts as a fractal UI pattern.
          Each thought can contain subthoughts, creating a hierarchical structure with self-similar presentation.
          Click on a thought to expand or collapse its subthoughts.
        </p>
      </div>
      
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <RecursiveThought thought={sampleThought} maxDepth={maxDepth} />
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-bold">Implementation Notes:</h3>
        <ul className="list-disc pl-5 mt-2">
          <li>Uses React's component recursion pattern</li>
          <li>Animation with Framer Motion enhances the expanding/collapsing effect</li>
          <li>Color coding helps distinguish hierarchy levels</li>
          <li>Scale transformation creates a visual depth effect</li>
          <li>State management maintains expansion state for each thought independently</li>
        </ul>
      </div>
    </div>
  );
};

export default FractalThoughtViewer;
