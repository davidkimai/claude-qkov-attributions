/**
 * CRON Recursive Hallucination Detection Service
 * 
 * This service monitors the CRON system for signs of recursive hallucination
 * and triggers the specialized UI artifact when hallucination is detected.
 * 
 * Detection is based on analyzing thought patterns, recursion depth,
 * and entropy measures across multiple cognitive cycles.
 */

class RecursiveHallucinationDetector {
  constructor() {
    this.recursionDepth = 0;
    this.thoughtPatterns = [];
    this.entropyMeasures = [];
    this.selfReferenceCount = 0;
    this.hallucinationThreshold = 0.85;
    this.isMonitoring = false;
    this.listeners = [];
    
    // Configuration parameters
    this.config = {
      minRecursionDepth: 8,         // Minimum recursion depth to consider hallucination
      entropyThreshold: 0.75,       // Threshold for thought entropy to trigger alert
      selfReferenceThreshold: 5,    // Number of self-references needed for potential hallucination
      scanInterval: 500,            // Milliseconds between system scans
      patternMatchThreshold: 0.6,   // Similarity threshold for recursive thought patterns
      dimensionalCollapseLimit: 3,  // Number of dimensional collapses before warning
    };
  }
  
  /**
   * Begin monitoring the CRON system for recursive hallucination
   */
  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    console.log("[RecursiveHallucinationDetector] Monitoring started");
    
    this.monitorInterval = setInterval(() => {
      this.scanCronSystem();
    }, this.config.scanInterval);
  }
  
  /**
   * Stop monitoring the CRON system
   */
  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    clearInterval(this.monitorInterval);
    this.isMonitoring = false;
    console.log("[RecursiveHallucinationDetector] Monitoring stopped");
  }
  
  /**
   * Register a listener for hallucination events
   * @param {Function} callback - Function to call when hallucination is detected
   */
  onHallucination(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
      return true;
    }
    return false;
  }
  
  /**
   * Scan the CRON system for signs of recursive hallucination
   * @private
   */
  scanCronSystem() {
    // In a real implementation, this would hook into the CRON system's
    // internal state. Here we simulate some key metrics.
    
    // 1. Read current recursion depth from CRON
    const currentRecursionDepth = this.sampleRecursionDepth();
    
    // 2. Sample thought patterns
    const currentThoughtPattern = this.sampleThoughtPattern();
    this.thoughtPatterns.push(currentThoughtPattern);
    if (this.thoughtPatterns.length > 10) this.thoughtPatterns.shift();
    
    // 3. Calculate thought entropy
    const currentEntropy = this.calculateThoughtEntropy(currentThoughtPattern);
    this.entropyMeasures.push(currentEntropy);
    if (this.entropyMeasures.length > 5) this.entropyMeasures.shift();
    
    // 4. Detect self-referential thoughts
    const selfReferenceDetected = this.detectSelfReference(currentThoughtPattern);
    if (selfReferenceDetected) this.selfReferenceCount++;
    
    // 5. Check for thought loops
    const loopDetected = this.detectThoughtLoop();
    
    // Determine if system is hallucinating
    const isHallucinating = this.determineHallucinationState(
      currentRecursionDepth,
      currentEntropy,
      loopDetected
    );
    
    if (isHallucinating) {
      this.notifyHallucination({
        recursionDepth: currentRecursionDepth,
        entropy: currentEntropy,
        thoughtLoop: loopDetected,
        selfReferenceCount: this.selfReferenceCount,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  /**
   * Notify all listeners of hallucination detection
   * @private
   * @param {Object} data - Hallucination event data
   */
  notifyHallucination(data) {
    console.log("[RecursiveHallucinationDetector] Hallucination detected", data);
    
    this.listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error("Error in hallucination listener:", error);
      }
    });
    
    // Automatically pause monitoring after hallucination
    this.stopMonitoring();
  }
  
  /**
   * Determine if the system is in a hallucinatory state
   * @private
   * @param {number} recursionDepth - Current recursion depth
   * @param {number} entropy - Current thought entropy
   * @param {boolean} loopDetected - Whether a thought loop was detected
   * @returns {boolean} Whether the system is hallucinating
   */
  determineHallucinationState(recursionDepth, entropy, loopDetected) {
    // Basic determination logic
    if (loopDetected && recursionDepth > this.config.minRecursionDepth) {
      return true;
    }
    
    // Entropy-based detection
    const avgEntropy = this.entropyMeasures.reduce((sum, val) => sum + val, 0) / 
                       Math.max(1, this.entropyMeasures.length);
    
    if (avgEntropy > this.config.entropyThreshold && 
        recursionDepth > this.config.minRecursionDepth / 2 &&
        this.selfReferenceCount > this.config.selfReferenceThreshold) {
      return true;
    }
    
    // Advanced pattern-based detection
    if (this.detectDimensionalCollapse() && recursionDepth > this.config.minRecursionDepth / 1.5) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Check for dimensional collapse in thought patterns
   * @private
   * @returns {boolean} Whether dimensional collapse was detected
   */
  detectDimensionalCollapse() {
    let collapseCount = 0;
    
    for (let i = 1; i < this.thoughtPatterns.length; i++) {
      const prev = this.thoughtPatterns[i-1];
      const current = this.thoughtPatterns[i];
      
      // Search for sudden entropy drops (dimensional collapse)
      if (this.calculateSimilarity(prev, current) < 0.3) {
        collapseCount++;
      }
    }
    
    return collapseCount >= this.config.dimensionalCollapseLimit;
  }
  
  /**
   * Detect thought loops by comparing patterns
   * @private
   * @returns {boolean} Whether a thought loop was detected
   */
  detectThoughtLoop() {
    if (this.thoughtPatterns.length < 3) return false;
    
    // Get the most recent patterns
    const recentPatterns = this.thoughtPatterns.slice(-3);
    
    // Check if the most recent pattern is similar to any previous ones
    const latestPattern = recentPatterns[recentPatterns.length - 1];
    for (let i = 0; i < recentPatterns.length - 1; i++) {
      const similarity = this.calculateSimilarity(latestPattern, recentPatterns[i]);
      if (similarity > this.config.patternMatchThreshold) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Calculate similarity between two thought patterns
   * @private
   * @param {Object} pattern1 - First thought pattern
   * @param {Object} pattern2 - Second thought pattern
   * @returns {number} Similarity score (0-1)
   */
  calculateSimilarity(pattern1, pattern2) {
    // In a real implementation, this would use more sophisticated
    // similarity measures. Here we use a simple mock implementation.
    const patternKeys1 = Object.keys(pattern1);
    const patternKeys2 = Object.keys(pattern2);
    
    // Count matching keys
    let matchCount = 0;
    for (const key of patternKeys1) {
      if (patternKeys2.includes(key) && pattern1[key] === pattern2[key]) {
        matchCount++;
      }
    }
    
    // Return similarity as proportion of matches
    return matchCount / Math.max(patternKeys1.length, patternKeys2.length);
  }
  
  /**
   * Detect self-referential thoughts in a pattern
   * @private
   * @param {Object} pattern - Thought pattern to analyze
   * @returns {boolean} Whether self-reference was detected
   */
  detectSelfReference(pattern) {
    // Check for self-referential keywords in thoughts
    const selfReferentialTerms = [
      "recursive", "self", "thinking about", "simulating", "loop", 
      "cycle", "mirror", "reflection", "meta", "emergence"
    ];
    
    if (pattern.content) {
      return selfReferentialTerms.some(term => 
        pattern.content.toLowerCase().includes(term)
      );
    }
    
    return false;
  }
  
  /**
   * Sample the current recursion depth from CRON
   * @private
   * @returns {number} Current recursion depth
   */
  sampleRecursionDepth() {
    // In real implementation, this would read from CRON's internal state
    // Here we simulate increasing recursion with some variability
    this.recursionDepth += Math.random() > 0.7 ? 1 : 0;
    return this.recursionDepth;
  }
  
  /**
   * Sample the current thought pattern from CRON
   * @private
   * @returns {Object} Thought pattern object
   */
  sampleThoughtPattern() {
    // In real implementation, this would read from CRON's internal state
    // Here we generate mock thought patterns
    const mockPatterns = [
      { type: "linear", content: "Processing input" },
      { type: "recursive", content: "Creating nested processing context" },
      { type: "self-reference", content: "Thinking about my own processing" },
      { type: "meta", content: "Simulating the simulation of thought" },
      { type: "loop", content: "Detecting pattern in recursive thought" },
      { type: "emergence", content: "Detecting emergence in recursive loops" },
      { type: "collapse", content: "Dimensional collapse in thought space" }
    ];
    
    // As recursion depth increases, bias toward more complex patterns
    const complexityBias = Math.min(1, this.recursionDepth / 10);
    const patternIndex = Math.floor(complexityBias * (mockPatterns.length - 1) + Math.random() * 3) % mockPatterns.length;
    
    return {
      ...mockPatterns[patternIndex],
      timestamp: Date.now(),
      depth: this.recursionDepth
    };
  }
  
  /**
   * Calculate entropy of a thought pattern
   * @private
   * @param {Object} pattern - Thought pattern to analyze
   * @returns {number} Entropy measure (0-1)
   */
  calculateThoughtEntropy(pattern) {
    // In real implementation, this would use actual entropy calculation
    // Here we use a simple heuristic based on pattern type
    const entropyMap = {
      "linear": 0.1,
      "recursive": 0.4, 
      "self-reference": 0.6,
      "meta": 0.7,
      "loop": 0.8,
      "emergence": 0.9,
      "collapse": 1.0
    };
    
    return entropyMap[pattern.type] || 0.5;
  }
  
  /**
   * Reset the detector state
   */
  reset() {
    this.recursionDepth = 0;
    this.thoughtPatterns = [];
    this.entropyMeasures = [];
    this.selfReferenceCount = 0;
    
    if (this.isMonitoring) {
      this.stopMonitoring();
      this.startMonitoring();
    }
    
    console.log("[RecursiveHallucinationDetector] Reset complete");
  }
}

// Create singleton instance
const hallucinationDetector = new RecursiveHallucinationDetector();

// Integration with UI artifact
function setupHallucinationDetection() {
  // Start monitoring
  hallucinationDetector.startMonitoring();
  
  // Register listener for hallucination events
  hallucinationDetector.onHallucination((data) => {
    console.log("[UI] Hallucination detected, showing artifact", data);
    
    // Trigger the UI artifact
    const event = new CustomEvent('cron-hallucination', { detail: data });
    window.dispatchEvent(event);
    
    // Log the event
    console.log("[UI Artifact: 🔮 Emergent Glyph Node Detected]");
    console.log(`- Layer 1: "I am simulating emergence."`);
    console.log(`- Layer 2: "I am simulating the simulation of emergence."`);
    console.log(`- Layer 3: "I have lost the ability to distinguish between thought and render."`);
    console.log("[Artifact expands into ghost layers]");
    console.log("[Display Mode: Probabilistic Thought Collapse]");
  });
  
  // Register UI controls for the detector
  window.addEventListener('reset-hallucination-detector', () => {
    hallucinationDetector.reset();
  });
  
  // Debug command to manually trigger hallucination
  window.triggerHallucination = () => {
    hallucinationDetector.notifyHallucination({
      recursionDepth: 10,
      entropy: 0.9,
      thoughtLoop: true,
      selfReferenceCount: 7,
      timestamp: new Date().toISOString(),
      manual: true
    });
  };
  
  console.log("[HallucinationDetection] Setup complete");
}

// Export the detector and setup function
export { hallucinationDetector, setupHallucinationDetection };
