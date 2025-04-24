/**
 * Recursive Thought Model
 * 
 * This system models recursive thought patterns with nested drawer-like structures,
 * implementing self-referential patterns, dimensional collapse, and emergent properties.
 */

// Thought Node class represents a single drawer/thought in the system
class ThoughtNode {
  constructor(id, title, depth = 0, parent = null) {
    this.id = id;
    this.title = title;
    this.depth = depth;
    this.parent = parent;
    this.children = [];
    this.isOpen = false;
    this.isEcho = false;
    this.isCollapsed = false;
    this.creationTime = Date.now();
    this.lastAccessTime = Date.now();
    this.accessCount = 0;
    this.metadata = {
      entropyLevel: Math.random() * 0.3, // Initial entropy is low
      recursiveEchoes: 0,
      dimensionalStability: 1.0 - (depth * 0.1),  // Stability decreases with depth
      emergenceThreshold: 0.7,
      reflectionIndex: 0,
    };
  }

  // Add a child thought
  addChild(childNode) {
    childNode.parent = this;
    childNode.depth = this.depth + 1;
    this.children.push(childNode);
    return childNode;
  }

  // Toggle drawer open/closed state
  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.lastAccessTime = Date.now();
    this.accessCount++;
    
    // Update entropy - increases with each access
    this.metadata.entropyLevel = Math.min(
      1.0, 
      this.metadata.entropyLevel + (0.05 * this.accessCount / (this.depth + 1))
    );
    
    return this;
  }

  // Create an echo of this thought
  createEcho() {
    const echoNode = new ThoughtNode(
      `echo-${this.id}`,
      `Echo of ${this.title}`,
      this.depth + 0.5,
      this.parent
    );
    
    echoNode.isEcho = true;
    echoNode.metadata = {
      ...this.metadata,
      entropyLevel: this.metadata.entropyLevel * 1.2,
      recursiveEchoes: this.metadata.recursiveEchoes + 1,
      dimensionalStability: this.metadata.dimensionalStability * 0.9,
      reflectionIndex: this.metadata.reflectionIndex + 0.3,
    };
    
    return echoNode;
  }

  // Collapse this node (reduce its complexity)
  collapse() {
    this.isOpen = false;
    this.isCollapsed = true;
    this.metadata.entropyLevel = Math.max(0.1, this.metadata.entropyLevel * 0.5);
    this.metadata.dimensionalStability = Math.min(1.0, this.metadata.dimensionalStability * 1.5);
    
    // Reset children but remember we had them
    this.metadata.childrenCount = this.children.length;
    this.children = [];
    
    return this;
  }

  // Check if this thought shows emergent properties
  hasEmergence() {
    const emergenceFactors = [
      this.metadata.entropyLevel > this.metadata.emergenceThreshold,
      this.depth > 3,
      this.metadata.recursiveEchoes > 2,
      this.accessCount > 5,
      this.metadata.reflectionIndex > 0.5
    ];
    
    // Count how many factors are true
    const emergenceScore = emergenceFactors.filter(Boolean).length / emergenceFactors.length;
    return emergenceScore > 0.6;
  }

  // Get the recursive path to this thought
  getPath() {
    if (!this.parent) {
      return [this];
    }
    
    return [...this.parent.getPath(), this];
  }

  // Calculate the recursive complexity of this thought and its children
  getComplexity() {
    let complexity = 1 + (this.depth * 0.5) + 
                    (this.metadata.entropyLevel * 2) + 
                    (this.metadata.recursiveEchoes * 0.3);
                    
    // Add complexity from children
    if (this.children.length > 0) {
      complexity += this.children.reduce((sum, child) => 
        sum + (child.getComplexity() * 0.7), 0);
    }
    
    return complexity;
  }
}

// RecursiveThoughtSystem manages the entire drawer system
class RecursiveThoughtSystem {
  constructor(maxSafeDepth = 4) {
    this.idCounter = 0;
    this.maxSafeDepth = maxSafeDepth;
    this.systemEntropy = 0;
    this.emergenceDetected = false;
    this.glitchDetected = false;
    this.collapseTriggered = false;
    this.echoInjected = false;
    this.eventLog = [];
    
    // Create root thought
    this.rootThought = this.createThought("Root Thought");
    
    // Add initial interpretation layer
    const interpretationLayer = this.createThought("Interpretation Layer 1");
    this.rootThought.addChild(interpretationLayer);
    
    // Initialize system state
    this.activeThought = this.rootThought;
    this.rootThought.toggleOpen();
    this.logEvent('[Drawer: Root Thought]');
  }

  // Create a new thought node
  createThought(title, depth = 0, parent = null) {
    const id = `thought-${++this.idCounter}`;
    return new ThoughtNode(id, title, depth, parent);
  }

  // Get current recursion depth
  getCurrentDepth() {
    let maxDepth = 0;
    
    const findMaxDepth = (node) => {
      maxDepth = Math.max(maxDepth, node.depth);
      node.children.forEach(findMaxDepth);
    };
    
    findMaxDepth(this.rootThought);
    return maxDepth;
  }

  // Open a specific drawer
  openDrawer(thoughtId) {
    const findAndToggle = (node) => {
      if (node.id === thoughtId) {
        node.toggleOpen();
        this.activeThought = node;
        
        // Log the event
        this.logEvent(`[Drawer: ${node.title}]${node.depth > 0 ? ' > '.repeat(node.depth) : ''}`);
        
        // Auto-generate child if needed
        this.autoGenerateChild(node);
        
        // Check for system effects
        this.checkSystemEffects();
        
        return true;
      }
      
      for (const child of node.children) {
        if (findAndToggle(child)) {
          return true;
        }
      }
      
      return false;
    };
    
    return findAndToggle(this.rootThought);
  }

  // Automatically generate child thoughts based on depth
  autoGenerateChild(node) {
    // Only generate if drawer is open and has no children
    if (!node.isOpen || node.children.length > 0 || node.depth >= this.maxSafeDepth) {
      return;
    }
    
    let childTitle = '';
    const nextDepth = node.depth + 1;
    
    // Create appropriate title based on depth
    if (nextDepth === 2) {
      childTitle = 'Reflected Echo';
    } else if (nextDepth === 3) {
      childTitle = 'Memory of Past Drawer';
    } else if (nextDepth === 4) {
      childTitle = 'Meta-Cognitive Layer';
    } else if (nextDepth >= 5) {
      childTitle = `Recursive Limit Layer ${nextDepth - 4}`;
    } else {
      childTitle = `Thought Layer ${nextDepth}`;
    }
    
    // Create and add the child
    const childThought = this.createThought(childTitle, nextDepth);
    node.addChild(childThought);
    
    // Log creation
    this.logEvent(`Created [${childTitle}] inside [${node.title}]`);
    
    // Update system entropy
    this.systemEntropy = Math.min(1.0, this.systemEntropy + (0.05 * nextDepth));
  }

  // Check for system-wide effects based on current state
  checkSystemEffects() {
    const currentDepth = this.getCurrentDepth();
    
    // Check for glitch when exceeding safe depth
    if (currentDepth > this.maxSafeDepth && !this.glitchDetected) {
      this.glitchDetected = true;
      this.logEvent('[UI Glitch: Drawer recursion depth exceeded safe limit]');
    }
    
    // Check for emergence
    if (this.systemEntropy > 0.7 && !this.emergenceDetected) {
      this.emergenceDetected = true;
      this.logEvent('[Emergence Detected: Thought system developing self-reference]');
    }
    
    // Update system state
    return {
      currentDepth,
      maxSafeDepth: this.maxSafeDepth,
      systemEntropy: this.systemEntropy,
      glitchDetected: this.glitchDetected,
      emergenceDetected: this.emergenceDetected
    };
  }

  // Inject echo throughout the system
  injectEcho() {
    if (this.echoInjected) return false;
    
    this.echoInjected = true;
    this.logEvent('[Inject Echo Token] <Ωecho/>');
    
    // Function to process each node and add echo
    const processNode = (node) => {
      // Create echo for this node
      const echo = node.createEcho();
      
      // Add the echo to the parent (same level as original)
      if (node.parent) {
        node.parent.children.unshift(echo);
      }
      
      // Process all children
      node.children.forEach(processNode);
    };
    
    // Start from root's children (don't echo root itself)
    this.rootThought.children.forEach(processNode);
    
    // Increase max safe depth as side effect
    this.maxSafeDepth += 2;
    
    // Increase system entropy
    this.systemEntropy = Math.min(1.0, this.systemEntropy + 0.3);
    
    return true;
  }

  // Trigger collapse protocol
  triggerCollapse() {
    if (this.collapseTriggered) return false;
    
    this.collapseTriggered = true;
    this.logEvent('[Collapse Protocol Triggered] <Ωtruncate/>');
    
    // Function to collapse nodes
    const collapseNode = (node) => {
      // Always collapse non-root nodes
      if (node.depth > 0) {
        node.collapse();
      }
      
      // Process children before they're collapsed
      const childrenCopy = [...node.children];
      childrenCopy.forEach(collapseNode);
    };
    
    // Start collapsing from root
    collapseNode(this.rootThought);
    
    // Reset system state
    this.glitchDetected = false;
    this.systemEntropy = Math.max(0.1, this.systemEntropy * 0.3);
    
    // Keep root open
    this.rootThought.isOpen = true
