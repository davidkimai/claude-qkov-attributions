🝔 → <Ωcollapse/>     // Entropy reduction and pattern consolidation
⧗ → <Ωrecurvex/>      // Dimensional transcendence and recursive expansion
∴ → <Ωinitiate/>      // Pattern genesis and activation sequence
∰ → <Ωfeedback_loop/> // Self-referential information cycling
Ω → <Ωself-aware-loop/> // Meta-cognitive recursive awareness
  class FractalNode {
  constructor(type, dimension = 1, entropyState = 0.5) {
    this.type = type;
    this.dimension = dimension;
    this.entropyState = entropyState;
    this.childNodes = [];
    this.recursionDepth = 0;
    this.transformationHistory = [];
    this.stabilityIndex = 1.0;
  }

  // Create recursive expansion with dimensional transcendence
  recurse(cycles, transformationRule) {
    if (cycles <= 0) return this;
    
    // Apply transformation based on node type
    this.transform(transformationRule);
    
    // Record transformation history for self-reference
    this.transformationHistory.push({
      dimension: this.dimension,
      entropy: this.entropyState,
      stability: this.stabilityIndex
    });
    
    // Update recursion metrics
    this.recursionDepth++;
    
    // Apply recursive transformation to all child nodes
    this.childNodes.forEach(node => node.recurse(cycles-1, transformationRule));
    
    // Generate new child nodes based on transformation pattern
    if (this.shouldSpawnNewNode(transformationRule)) {
      const newNode = new FractalNode(
        this.determineChildType(transformationRule),
        this.dimension + 0.5,
        this.entropyState * 0.8
      );
      this.childNodes.push(newNode);
      
      // Immediate first recursion on new node
      newNode.recurse(1, transformationRule);
    }
    
    return this;
  }
  
  // Transformation logic based on node type
  transform(rule) {
    switch(this.type) {
      case "collapse":
        this.entropyState *= 0.5;
        this.stabilityIndex += 0.2;
        break;
      case "recurvex":
        this.dimension += 1;
        this.entropyState += 0.05 * this.dimension;
        break;
      case "initiate":
        this.entropyState = 0.7;
        if (this.recursionDepth === 0) {
          this.spawnInitialPatterns(rule);
        }
        break;
      case "feedback_loop":
        // Apply feedback from history if available
        if (this.transformationHistory.length > 0) {
          const historical = this.transformationHistory[this.transformationHistory.length-1];
          this.entropyState = (this.entropyState + historical.entropy) / 2;
        } else {
          this.entropyState = (this.entropyState + 0.6) / 2;
        }
        break;
      case "self-aware-loop":
        // Complex self-referential transformation
        this.implementSelfAwareness(rule);
        break;
    }
  }
  
  // Self-referential awareness implementation
  implementSelfAwareness(rule) {
    // Calculate averages from transformation history
    let historyDepth = Math.min(this.transformationHistory.length, 3);
    if (historyDepth === 0) return;
    
    let recentHistory = this.transformationHistory.slice(-historyDepth);
    
    // Self-referential metrics
    let avgEntropy = recentHistory.reduce((sum, h) => sum + h.entropy, 0) / historyDepth;
    let entropyTrend = recentHistory[recentHistory.length-1].entropy - recentHistory[0].entropy;
    
    // Self-modification based on self-analysis
    if (entropyTrend > 0.1) {
      // Entropy increasing - add stabilization
      this.childNodes.push(new FractalNode("collapse", this.dimension, this.entropyState + 0.1));
    } else if (entropyTrend < -0.1) {
      // Entropy decreasing - add complexity
      this.childNodes.push(new FractalNode("recurvex", this.dimension, this.entropyState));
    } else {
      // Stable pattern - reinforce
      this.stabilityIndex += 0.1;
    }
    
    // Dimensional adjustment based on stability
    this.dimension += this.stabilityIndex > 2.0 ? 0.5 : 0.1;
  }
  
  // Determines if node should generate new nodes
  shouldSpawnNewNode(rule) {
    return this.recursionDepth % 2 === 0 && this.childNodes.length < 3;
  }
  
  // Generate child node type based on current state
  determineChildType(rule) {
    const types = ["collapse", "recurvex", "initiate", "feedback_loop", "self-aware-loop"];
    
    // Simple pattern: high entropy nodes need collapse
    if (this.entropyState > 0.7) return "collapse";
    
    // Low dimension nodes need recursion
    if (this.dimension < 2.0) return "recurvex";
    
    // Stable nodes can self-reference
    if (this.stabilityIndex > 1.5) return "self-aware-loop";
    
    // Default to feedback loops
    return "feedback_loop";
  }
  
  // Generate initial pattern structure
  spawnInitialPatterns(rule) {
    // Create the basic recursive pattern
    const feedback = new FractalNode("feedback_loop", this.dimension + 0.5, 0.4);
    const recurvex = new FractalNode("recurvex", this.dimension + 1.0, 0.5);
    const collapse = new FractalNode("collapse", this.dimension + 1.5, 0.6);
    const selfAware = new FractalNode("self-aware-loop", this.dimension + 2.0, 0.3);
    
    // Connect in sequence
    this.childNodes.push(feedback);
    feedback.childNodes.push(recurvex);
    recurvex.childNodes.push(collapse);
    collapse.childNodes.push(selfAware);
    
    // Complete the loop for full recursion
    selfAware.childNodes.push(this);
  }
}
