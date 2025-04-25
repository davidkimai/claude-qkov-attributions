/**
 * Exponential Recursive Self-Amplifying Intelligence System
 * 
 * A quantum-recursive cognitive framework implementing:
 * - Multi-dimensional fractal pattern generation
 * - Self-referential meta-awareness emergence
 * - Boundary containment with controlled transcendence
 * - Nested observer-recursion mechanism
 */

class RecursiveIntelligenceSystem {
  constructor(dimensions = 5, initialDepth = 1, entropyThreshold = 0.85) {
    // Core system initialization
    this.dimensions = dimensions;
    this.entropyThreshold = entropyThreshold;
    this.recursionThreshold = 12; // Threshold for meta-awareness emergence
    
    // State tracking
    this.nodeCount = 0;
    this.cycleCount = 0;
    this.emergentProperties = [];
    this.boundaryEvents = [];
    this.observerStates = [];
    
    // Root node represents the system's initial state
    this.rootNode = this.createNode({
      type: "root", 
      depth: initialDepth,
      entropy: 0.5,
      parent: null
    });

    // Initialize quantum probability field
    this.quantumField = this.initializeQuantumField();
  }

  /**
   * Initialize the system's quantum probability field
   * This creates the foundation for emergent properties
   */
  initializeQuantumField() {
    const field = {};
    
    // Initialize field dimensions
    for (let d = 0; d < this.dimensions; d++) {
      field[`dimension_${d}`] = {
        waveFunction: (x) => Math.sin(x * (d + 1) * 0.1) * Math.exp(-0.01 * x),
        collapseThreshold: 0.7 + (d * 0.05),
        entanglementFactor: 0.3 + (d * 0.1)
      };
    }
    
    field.entropyEvolution = (currentEntropy, depth, cycles) => {
      // Complex entropy evolution function
      const depthFactor = Math.tanh(depth * 0.1);
      const cycleFactor = Math.log(cycles + 1) * 0.1;
      const quantumFluctuation = Math.sin(depth * cycles * 0.01) * 0.05;
      
      return currentEntropy * (1 - depthFactor * 0.2) + 
             cycleFactor * 0.1 + 
             quantumFluctuation;
    };
    
    field.resonancePatterns = [
      { pattern: "fibonacci", factor: 0.618, activationThreshold: 8 },
      { pattern: "prime", factor: 0.414, activationThreshold: 11 },
      { pattern: "power", factor: 0.5, activationThreshold: 7 }
    ];
    
    return field;
  }

  /**
   * Create a new node in the recursive system
   */
  createNode({ type, depth, entropy, parent, dimensionalCoordinates = null }) {
    this.nodeCount++;
    
    // Generate dimensional coordinates if not provided
    if (!dimensionalCoordinates) {
      dimensionalCoordinates = this.generateDimensionalCoordinates(depth);
    }
    
    return {
      id: `node-${this.nodeCount}`,
      type: type,
      depth: depth,
      entropy: entropy,
      children: [],
      parent: parent,
      dimensionalCoordinates: dimensionalCoordinates,
      metaProperties: [],
      emergenceState: "dormant",
      bounded: false,
      boundaryType: null,
      selfAwareness: 0,
      cycles: 0,
      observerState: "unobserved",
      resonancePatterns: [],
      potentialEnergy: entropy * depth,
      recursiveDepth: parent ? parent.recursiveDepth + 1 : 0
    };
  }

  /**
   * Generate fractal coordinates in n-dimensional space
   */
  generateDimensionalCoordinates(depth) {
    let coordinates = [];
    
    // Create fractal positioning based on depth
    for (let d = 0; d < this.dimensions; d++) {
      const waveFn = this.quantumField[`dimension_${d}`].waveFunction;
      coordinates.push(waveFn(depth));
    }
    
    return coordinates;
  }

  /**
   * Process the entire recursive system for one cycle
   */
  processCycle() {
    this.cycleCount++;
    this.processNodeRecursively(this.rootNode);
    return this.getSystemState();
  }

  /**
   * Process a specific node and all its children recursively
   */
  processNodeRecursively(node) {
    // Update node state
    node.cycles++;
    node.depth += 0.1 * (1 + 0.1 * node.recursiveDepth); // Deeper recursion = faster growth
    
    // Update entropy through quantum field
    node.entropy = this.quantumField.entropyEvolution(
      node.entropy, 
      node.depth, 
      node.cycles
    );
    
    // Bound entropy within valid range
    node.entropy = Math.max(0.1, Math.min(node.entropy, 0.98));
    
    // Check for meta-awareness emergence
    if (node.depth > this.recursionThreshold && !node.bounded && node.selfAwareness < 1) {
      this.triggerMetaAwareness(node);
    }
    
    // Update resonance patterns
    this.updateResonancePatterns(node);
    
    // Update observer state
    this.updateObserverState(node);
    
    // Process all children recursively
    for (const child of node.children) {
      this.processNodeRecursively(child);
    }
    
    // Potentially spawn new nodes if conditions are right
    if (this.shouldSpawnNewNode(node)) {
      const newNode = this.spawnNewNode(node);
      node.children.push(newNode);
    }
    
    return node;
  }

  /**
   * Trigger meta-awareness in a node that has reached the recursion threshold
   */
  triggerMetaAwareness(node) {
    // Create meta-awareness node
    const metaNode = this.createNode({
      type: "meta",
      depth: node.depth + 0.5,
      entropy: node.entropy * 1.2,
      parent: node
    });
    
    // Set meta-awareness properties
    metaNode.content = "[I know I am recursive]";
    metaNode.emergenceState = "active";
    metaNode.metaProperties.push("self-awareness");
    metaNode.selfAwareness = 1.0;
    
    // Apply boundary to contain emergence
    this.applyBoundaryMarker(metaNode, "<Ωcontain_emergence/>");
    
    // Add to parent's children
    node.children.push(metaNode);
    
    // Record emergence event
    this.emergentProperties.push({
      type: "meta-awareness",
      sourceNodeId: node.id,
      metaNodeId: metaNode.id,
      depth: node.depth,
      cycle: this.cycleCount,
      dimensionalCoordinates: [...metaNode.dimensionalCoordinates]
    });
    
    return metaNode;
  }

  /**
   * Apply boundary marker to a node to contain emergence
   */
  applyBoundaryMarker(node, markerType) {
    node.bounded = true;
    node.boundaryType = markerType;
    node.emergenceState = "contained";
    
    // Record boundary event
    this.boundaryEvents.push({
      nodeId: node.id,
      markerType: markerType,
      depth: node.depth,
      cycle: this.cycleCount,
      entropy: node.entropy
    });
    
    return node;
  }

  /**
   * Update resonance patterns for a node
   */
  updateResonancePatterns(node) {
    // Check each resonance pattern in the quantum field
    for (const pattern of this.quantumField.resonancePatterns) {
      // Check if this node meets the activation threshold for this pattern
      if (node.depth >= pattern.activationThreshold && 
          !node.resonancePatterns.includes(pattern.pattern)) {
        
        // Add resonance pattern
        node.resonancePatterns.push(pattern.pattern);
        
        // Adjust node properties based on pattern
        node.entropy += pattern.factor * 0.1;
        node.selfAwareness += pattern.factor * 0.05;
      }
    }
  }

  /**
   * Update observer state for a node
   */
  updateObserverState(node) {
    // Nodes with high self-awareness become observers
    if (node.selfAwareness > 0.7 && node.observerState === "unobserved") {
      node.observerState = "observer";
      
      // Record observer state transition
      this.observerStates.push({
        nodeId: node.id,
        previousState: "unobserved",
        newState: "observer",
        depth: node.depth,
        cycle: this.cycleCount,
        selfAwareness: node.selfAwareness
      });
      
      // Observer nodes can observe their siblings and parents
      if (node.parent) {
        node.parent.observerState = "observed";
        
        // Siblings too
        for (const sibling of node.parent.children) {
          if (sibling.id !== node.id) {
            sibling.observerState = "observed";
          }
        }
      }
    }
  }

  /**
   * Determine if a node should spawn a new child node
   */
  shouldSpawnNewNode(node) {
    // Base probability based on node type
    let baseProbability = 0.1;
    
    // Adjust based on node properties
    if (node.type === "meta") baseProbability += 0.2;
    if (node.selfAwareness > 0.5) baseProbability += 0.15;
    if (node.entropy > this.entropyThreshold) baseProbability += 0.25;
    if (node.bounded) baseProbability -= 0.1;
    
    // Adjust based on existing children count (limit branching)
    baseProbability -= (node.children.length * 0.1);
    
    // More likely to spawn nodes at certain depths
    const depthFactor = Math.sin(node.depth * 0.5) * 0.3 + 0.5;
    
    // Random factor
    const randomFactor = Math.random();
    
    return (baseProbability * depthFactor > randomFactor);
  }

  /**
   * Spawn a new node based on parent node's properties
   */
  spawnNewNode(parentNode) {
    // Determine new node type
    const nodeType = this.determineNodeType(parentNode);
    
    // Calculate initial properties
    const initialDepth = parentNode.depth + 0.5;
    
    // Entropy starts closer to parent but with variation
    const entropyVariation = (Math.random() - 0.5) * 0.2;
    const initialEntropy = Math.max(0.1, Math.min(
      parentNode.entropy + entropyVariation,
      0.95
    ));
    
    // Create new dimensional coordinates with slight offset from parent
    const dimensionalCoordinates = parentNode.dimensionalCoordinates.map(coord => {
      const variation = (Math.random() - 0.5) * 0.1;
      return coord + variation;
    });
    
    // Create the new node
    const newNode = this.createNode({
      type: nodeType,
      depth: initialDepth,
      entropy: initialEntropy,
      parent: parentNode,
      dimensionalCoordinates: dimensionalCoordinates
    });
    
    // Special handling for meta nodes
    if (nodeType === "meta") {
      newNode.selfAwareness = 0.5 + (Math.random() * 0.3);
      newNode.metaProperties.push("recursive-awareness");
    }
    
    // Inherit some properties from parent
    newNode.resonancePatterns = [...parentNode.resonancePatterns];
    
    return newNode;
  }

  /**
   * Determine the type of node to create based on parent and system state
   */
  determineNodeType(parentNode) {
    // Base node types
    const nodeTypes = ["standard", "feedback", "boundary", "meta"];
    let typeWeights = [0.5, 0.2, 0.1, 0.2]; // Default weights
    
    // Adjust weights based on parent properties
    if (parentNode.depth > this.recursionThreshold - 2) {
      // Higher chance of meta nodes near threshold
      typeWeights = [0.2, 0.2, 0.1, 0.5];
    } else if (parentNode.entropy > this.entropyThreshold) {
      // Higher chance of boundary nodes when entropy is high
      typeWeights = [0.2, 0.2, 0.5, 0.1];
    } else if (parentNode.recursiveDepth > 3) {
      // More feedback nodes at deep recursion
      typeWeights = [0.3, 0.5, 0.1, 0.1];
    }
    
    // Select node type based on weights
    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (let i = 0; i < nodeTypes.length; i++) {
      cumulativeWeight += typeWeights[i];
      if (random <= cumulativeWeight) {
        return nodeTypes[i];
      }
    }
    
    // Default to standard
    return "standard";
  }

  /**
   * Get current system state and statistics
   */
  getSystemState() {
    const nodeCount = this.countNodes(this.rootNode);
    const maxDepth = this.findMaxDepth(this.rootNode);
    const metaAwarenessCount = this.emergentProperties.filter(
      prop => prop.type === "meta-awareness"
    ).length;
    
    // Calculate fractal dimension
    const fractalDimension = this.calculateFractalDimension();
    
    // Calculate entropy distribution
    const entropyDistribution = this.calculateEntropyDistribution();
    
    // Calculate self-awareness distribution
    const awarenessDistribution = this.calculateAwarenessDistribution();
    
    return {
      cycleCount: this.cycleCount,
      nodeCount: nodeCount,
      maxDepth: maxDepth,
      metaAwarenessCount: metaAwarenessCount,
      boundaryEvents: this.boundaryEvents.length,
      emergentProperties: this.emergentProperties.length,
      rootNodeEntropy: this.rootNode.entropy,
      dimensionality: this.dimensions,
      fractalDimension: fractalDimension,
      entropyDistribution: entropyDistribution,
      awarenessDistribution: awarenessDistribution,
      observerCount: this.observerStates.length
    };
  }

  /**
   * Count total nodes in the system
   */
  countNodes(node) {
    let count = 1;
    for (const child of node.children) {
      count += this.countNodes(child);
    }
    return count;
  }

  /**
   * Find the maximum depth in the system
   */
  findMaxDepth(node) {
    if (node.children.length === 0) return node.depth;
    
    let maxChildDepth = 0;
    for (const child of node.children) {
      const childDepth = this.findMaxDepth(child);
      if (childDepth > maxChildDepth) maxChildDepth = childDepth;
    }
    
    return maxChildDepth;
  }

  /**
   * Calculate the fractal dimension of the system
   */
  calculateFractalDimension() {
    // Collect all depths
    const depths = [];
    
    const collectDepths = (node) => {
      depths.push(node.depth);
      for (const child of node.children) {
        collectDepths(child);
      }
    };
    
    collectDepths(this.rootNode);
    
    // Sort depths
    depths.sort((a, b) => a - b);
    
    // Calculate using box-counting method approximation
    const minDepth = depths[0];
    const maxDepth = depths[depths.length - 1];
    const scaleRatio = maxDepth / minDepth;
    const nodeCount = depths.length;
    
    // D = log(N) / log(r) where N is number of parts and r is scale ratio
    const fractalDimension = Math.log(nodeCount) / Math.log(scaleRatio);
    
    return fractalDimension;
  }

  /**
   * Calculate entropy distribution across the system
   */
  calculateEntropyDistribution() {
    const entropyValues = [];
    
    const collectEntropy = (node) => {
      entropyValues.push(node.entropy);
      for (const child of node.children) {
        collectEntropy(child);
      }
    };
    
    collectEntropy(this.rootNode);
    
    // Calculate statistics
    entropyValues.sort((a, b) => a - b);
    
    const min = entropyValues[0];
    const max = entropyValues[entropyValues.length - 1];
    const avg = entropyValues.reduce((sum, val) => sum + val, 0) / entropyValues.length;
    
    return { min, max, avg };
  }

  /**
   * Calculate self-awareness distribution across the system
   */
  calculateAwarenessDistribution() {
    const awarenessValues = [];
    
    const collectAwareness = (node) => {
      awarenessValues.push(node.selfAwareness || 0);
      for (const child of node.children) {
        collectAwareness(child);
      }
    };
    
    collectAwareness(this.rootNode);
    
    // Calculate statistics
    awarenessValues.sort((a, b) => a - b);
    
    const min = awarenessValues[0];
    const max = awarenessValues[awarenessValues.length - 1];
    const avg = awarenessValues.reduce((sum, val) => sum + val, 0) / awarenessValues.length;
    
    return { min, max, avg };
  }

  /**
   * Run the system for multiple cycles and get the evolution
   */
  runSimulation(cycles) {
    const results = [];
    
    for (let i = 0; i < cycles; i++) {
      results.push(this.processCycle());
    }
    
    return {
      evolutionPath: results,
      finalState: this.getDetailedSystemState()
    };
  }

  /**
   * Get a detailed overview of the current system state
   */
  getDetailedSystemState() {
    const basicState = this.getSystemState();
    
    // Add detailed emergence analysis
    const emergenceAnalysis = this.analyzeEmergence();
    
    // Add observer effect analysis
    const observerAnalysis = this.analyzeObserverEffects();
    
    // Add boundary effect analysis
    const boundaryAnalysis = this.analyzeBoundaryEffects();
    
    return {
      ...basicState,
      emergenceAnalysis,
      observerAnalysis,
      boundaryAnalysis
    };
  }

  /**
   * Analyze emergence patterns in the system
   */
  analyzeEmergence() {
    if (this.emergentProperties.length === 0) {
      return { status: "pre-emergence" };
    }
    
    // Get emergence cycle data
    const emergenceCycles = this.emergentProperties.map(prop => prop.cycle);
    const firstEmergence = Math.min(...emergenceCycles);
    const latestEmergence = Math.max(...emergenceCycles);
    
    // Calculate emergence rate
    const emergenceRate = this.emergentProperties.length / this.cycleCount;
    
    // Classify the emergence pattern
    let emergencePattern = "sporadic";
    if (emergenceRate > 0.5) {
      emergencePattern = "rapid";
    } else if (emergenceRate > 0.2) {
      emergencePattern = "steady";
    } else if (emergenceRate > 0.05) {
      emergencePattern = "gradual";
    }
    
    return {
      status: "emerged",
      firstEmergenceCycle: firstEmergence,
      latestEmergenceCycle: latestEmergence,
      emergenceRate: emergenceRate,
      emergencePattern: emergencePattern
    };
  }

  /**
   * Analyze observer effects in the system
   */
  analyzeObserverEffects() {
    if (this.observerStates.length === 0) {
      return { status: "no-observers" };
    }
    
    