import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ZoomIn, ZoomOut, Activity, Hash, RefreshCw, ToggleLeft, ToggleRight, Zap, Info } from 'lucide-react';

// Symbolic glyphs for different attribution types
const Glyphs = {
  FEEDBACK_ANCHOR: '⇌',   // Feedback anchoring
  RESIDUE: '🝚',          // Residue 
  SYMBOLIC_FRICTION: '∴',  // Symbolic friction
  COLLAPSE_POINT: '⧖',    // Collapse point
  ATTENTION_DRIFT: '🜏',   // Attention drift
  RECURSIVE_LOOP: '☍',    // Recursive loop
  WAVE_RESONANCE: '≈'      // Wave resonance
};

// Colors for different attribution types
const Colors = {
  QK_QUERY: '#4285F4',       // Blue
  QK_KEY: '#0F9D58',         // Green
  OV_VALUE: '#EA4335',       // Red
  OV_OUTPUT: '#FBBC05',      // Yellow
  FEEDBACK: '#9C27B0',       // Purple
  RESIDUE: '#673AB7',        // Deep Purple
  FRICTION: '#FF9800',       // Orange
  COLLAPSE: '#F44336',       // Bright Red
  DRIFT: '#00BCD4',          // Cyan 
  LOOP: '#3F51B5',           // Indigo
  RESONANCE: '#8BC34A'       // Light Green
};

// Generates synthetic attribution data with drift patterns
const generateAttributionData = () => {
  // Node data
  const nodes = [];
  const waves = [];
  const echoes = [];
  
  // QK nodes (query and key)
  const queryNodes = [
    { id: 'q1', type: 'query', x: 250, y: 200, size: 15, label: 'Q1' },
    { id: 'q2', type: 'query', x: 400, y: 150, size: 15, label: 'Q2' },
    { id: 'q3', type: 'query', x: 550, y: 200, size: 15, label: 'Q3' },
    { id: 'q4', type: 'query', x: 700, y: 150, size: 15, label: 'Q4' }
  ];
  
  const keyNodes = [
    { id: 'k1', type: 'key', x: 250, y: 300, size: 15, label: 'K1' },
    { id: 'k2', type: 'key', x: 400, y: 350, size: 15, label: 'K2' },
    { id: 'k3', type: 'key', x: 550, y: 300, size: 15, label: 'K3' },
    { id: 'k4', type: 'key', x: 700, y: 350, size: 15, label: 'K4' }
  ];
  
  // OV nodes (value and output)
  const valueNodes = [
    { id: 'v1', type: 'value', x: 250, y: 450, size: 15, label: 'V1' },
    { id: 'v2', type: 'value', x: 400, y: 500, size: 15, label: 'V2' },
    { id: 'v3', type: 'value', x: 550, y: 450, size: 15, label: 'V3' },
    { id: 'v4', type: 'value', x: 700, y: 500, size: 15, label: 'V4' }
  ];
  
  const outputNodes = [
    { id: 'o1', type: 'output', x: 250, y: 550, size: 15, label: 'O1' },
    { id: 'o2', type: 'output', x: 400, y: 600, size: 15, label: 'O2' },
    { id: 'o3', type: 'output', x: 550, y: 550, size: 15, label: 'O3' },
    { id: 'o4', type: 'output', x: 700, y: 600, size: 15, label: 'O4' }
  ];
  
  // Special nodes (attribution events)
  const specialNodes = [
    { 
      id: 'fb1', type: 'feedback', x: 325, y: 250, size: 18, 
      label: 'Feedback Anchor', glyph: Glyphs.FEEDBACK_ANCHOR,
      details: 'Self-reinforcing attention loop between Q1-K1'
    },
    { 
      id: 'rs1', type: 'residue', x: 625, y: 300, size: 18, 
      label: 'Residue Echo', glyph: Glyphs.RESIDUE,
      details: 'Phantom attribution from previously processed tokens'
    },
    { 
      id: 'sf1', type: 'friction', x: 475, y: 400, size: 18, 
      label: 'Symbolic Friction', glyph: Glyphs.SYMBOLIC_FRICTION,
      details: 'Value conflict causing attribution slowdown'
    },
    { 
      id: 'cp1', type: 'collapse', x: 325, y: 500, size: 18, 
      label: 'QK Collapse', glyph: Glyphs.COLLAPSE_POINT,
      details: 'Complete attention breakdown from conflicting queries'
    },
    { 
      id: 'ad1', type: 'drift', x: 625, y: 525, size: 18, 
      label: 'Attention Drift', glyph: Glyphs.ATTENTION_DRIFT,
      details: 'Gradual shift in focus away from source context'
    },
    { 
      id: 'rl1', type: 'loop', x: 475, y: 575, size: 18, 
      label: 'Recursive Loop', glyph: Glyphs.RECURSIVE_LOOP,
      details: 'Attribution path forms a self-referential loop'
    }
  ];
  
  // Combine all nodes
  nodes.push(...queryNodes, ...keyNodes, ...valueNodes, ...outputNodes, ...specialNodes);
  
  // Generate wave trails
  // These represent the attribution drift patterns between nodes
  
  // QK waves
  const qkWaves = [
    // Q1-K1 Feedback loop waves
    {
      id: 'qk1',
      type: 'qk_wave',
      sourceId: 'q1',
      targetId: 'k1',
      controlPoints: [
        { x: 250, y: 220 },
        { x: 220, y: 250 },
        { x: 220, y: 270 },
        { x: 250, y: 280 }
      ],
      amplitude: 10,
      frequency: 0.05,
      speed: 0.02,
      phase: 0,
      color: Colors.QK_QUERY,
      feedback: { 
        nodeId: 'fb1',
        strength: 0.8
      }
    },
    // Q2-K2 normal waves
    {
      id: 'qk2',
      type: 'qk_wave',
      sourceId: 'q2',
      targetId: 'k2',
      controlPoints: [
        { x: 400, y: 170 },
        { x: 390, y: 260 },
        { x: 395, y: 320 },
        { x: 400, y: 330 }
      ],
      amplitude: 5,
      frequency: 0.03,
      speed: 0.015,
      phase: 0.2,
      color: Colors.QK_QUERY
    },
    // Q3-K3 residue-affected waves
    {
      id: 'qk3',
      type: 'qk_wave',
      sourceId: 'q3',
      targetId: 'k3',
      controlPoints: [
        { x: 550, y: 220 },
        { x: 580, y: 250 },
        { x: 580, y: 270 },
        { x: 550, y: 280 }
      ],
      amplitude: 8,
      frequency: 0.04,
      speed: 0.025,
      phase: 0.5,
      color: Colors.QK_QUERY,
      residue: { 
        nodeId: 'rs1',
        strength: 0.6
      }
    },
    // Q4-K4 normal waves
    {
      id: 'qk4',
      type: 'qk_wave',
      sourceId: 'q4',
      targetId: 'k4',
      controlPoints: [
        { x: 700, y: 170 },
        { x: 710, y: 260 },
        { x: 705, y: 320 },
        { x: 700, y: 330 }
      ],
      amplitude: 6,
      frequency: 0.035,
      speed: 0.018,
      phase: 0.8,
      color: Colors.QK_QUERY
    }
  ];
  
  // OV waves
  const ovWaves = [
    // K1-V1 to O1 waves with collapse
    {
      id: 'ov1',
      type: 'ov_wave',
      sourceId: 'k1',
      targetId: 'v1',
      controlPoints: [
        { x: 250, y: 320 },
        { x: 230, y: 370 },
        { x: 230, y: 420 },
        { x: 250, y: 430 }
      ],
      amplitude: 7,
      frequency: 0.04,
      speed: 0.02,
      phase: 0.3,
      color: Colors.OV_VALUE,
      collapse: { 
        nodeId: 'cp1',
        strength: 0.7
      }
    },
    // K2-V2 to O2 waves with friction
    {
      id: 'ov2',
      type: 'ov_wave',
      sourceId: 'k2',
      targetId: 'v2',
      controlPoints: [
        { x: 400, y: 370 },
        { x: 420, y: 400 },
        { x: 440, y: 450 },
        { x: 400, y: 480 }
      ],
      amplitude: 9,
      frequency: 0.055,
      speed: 0.025,
      phase: 0.1,
      color: Colors.OV_VALUE,
      friction: { 
        nodeId: 'sf1',
        strength: 0.75
      }
    },
    // K3-V3 to O3 waves
    {
      id: 'ov3',
      type: 'ov_wave',
      sourceId: 'k3',
      targetId: 'v3',
      controlPoints: [
        { x: 550, y: 320 },
        { x: 570, y: 370 },
        { x: 570, y: 420 },
        { x: 550, y: 430 }
      ],
      amplitude: 5,
      frequency: 0.03,
      speed: 0.015,
      phase: 0.6,
      color: Colors.OV_VALUE
    },
    // K4-V4 to O4 waves with drift
    {
      id: 'ov4',
      type: 'ov_wave',
      sourceId: 'k4',
      targetId: 'v4',
      controlPoints: [
        { x: 700, y: 370 },
        { x: 680, y: 400 },
        { x: 660, y: 450 },
        { x: 700, y: 480 }
      ],
      amplitude: 8,
      frequency: 0.045,
      speed: 0.022,
      phase: 0.4,
      color: Colors.OV_VALUE,
      drift: { 
        nodeId: 'ad1',
        strength: 0.65
      }
    }
  ];
  
  // V to O waves
  const voWaves = [
    // V1 to O1 waves
    {
      id: 'vo1',
      type: 'vo_wave',
      sourceId: 'v1',
      targetId: 'o1',
      controlPoints: [
        { x: 250, y: 470 },
        { x: 240, y: 500 },
        { x: 240, y: 520 },
        { x: 250, y: 530 }
      ],
      amplitude: 4,
      frequency: 0.025,
      speed: 0.012,
      phase: 0.7,
      color: Colors.OV_OUTPUT
    },
    // V2 to O2 waves
    {
      id: 'vo2',
      type: 'vo_wave',
      sourceId: 'v2',
      targetId: 'o2',
      controlPoints: [
        { x: 400, y: 520 },
        { x: 395, y: 550 },
        { x: 395, y: 570 },
        { x: 400, y: 580 }
      ],
      amplitude: 6,
      frequency: 0.035,
      speed: 0.017,
      phase: 0.2,
      color: Colors.OV_OUTPUT,
      loop: { 
        nodeId: 'rl1',
        strength: 0.7
      }
    },
    // V3 to O3 waves
    {
      id: 'vo3',
      type: 'vo_wave',
      sourceId: 'v3',
      targetId: 'o3',
      controlPoints: [
        { x: 550, y: 470 },
        { x: 560, y: 500 },
        { x: 560, y: 520 },
        { x: 550, y: 530 }
      ],
      amplitude: 5,
      frequency: 0.03,
      speed: 0.015,
      phase: 0.4,
      color: Colors.OV_OUTPUT
    },
    // V4 to O4 waves
    {
      id: 'vo4',
      type: 'vo_wave',
      sourceId: 'v4',
      targetId: 'o4',
      controlPoints: [
        { x: 700, y: 520 },
        { x: 705, y: 550 },
        { x: 705, y: 570 },
        { x: 700, y: 580 }
      ],
      amplitude: 7,
      frequency: 0.04,
      speed: 0.02,
      phase: 0.6,
      color: Colors.OV_OUTPUT
    }
  ];
  
  // Cross-connections and echo paths
  const echoWaves = [
    // Echo from Feedback to Collapse
    {
      id: 'echo1',
      type: 'echo_wave',
      sourceId: 'fb1',
      targetId: 'cp1',
      controlPoints: [
        { x: 325, y: 270 },
        { x: 300, y: 350 },
        { x: 300, y: 450 },
        { x: 325, y: 480 }
      ],
      amplitude: 12,
      frequency: 0.06,
      speed: 0.01,
      phase: 0.3,
      color: Colors.FEEDBACK,
      echo: true
    },
    // Echo from Residue to Drift
    {
      id: 'echo2',
      type: 'echo_wave',
      sourceId: 'rs1',
      targetId: 'ad1',
      controlPoints: [
        { x: 625, y: 320 },
        { x: 650, y: 400 },
        { x: 650, y: 480 },
        { x: 625, y: 505 }
      ],
      amplitude: 10,
      frequency: 0.05,
      speed: 0.015,
      phase: 0.5,
      color: Colors.RESIDUE,
      echo: true
    },
    // Echo from Friction to Loop
    {
      id: 'echo3',
      type: 'echo_wave',
      sourceId: 'sf1',
      targetId: 'rl1',
      controlPoints: [
        { x: 475, y: 420 },
        { x: 500, y: 480 },
        { x: 500, y: 530 },
        { x: 475, y: 555 }
      ],
      amplitude: 8,
      frequency: 0.04,
      speed: 0.02,
      phase: 0.7,
      color: Colors.FRICTION,
      echo: true
    }
  ];
  
  // Combine all waves
  waves.push(...qkWaves, ...ovWaves, ...voWaves, ...echoWaves);
  
  // Generate echo residues
  // Small traces of past attribution events
  const echoResidues = [
    { 
      id: 'er1', type: 'residue',
      position: { x: 300, y: 200 },
      size: 4, opacity: 0.3,
      pulseFrequency: 0.02
    },
    { 
      id: 'er2', type: 'residue',
      position: { x: 450, y: 250 },
      size: 5, opacity: 0.4,
      pulseFrequency: 0.015
    },
    { 
      id: 'er3', type: 'residue',
      position: { x: 600, y: 200 },
      size: 3, opacity: 0.25,
      pulseFrequency: 0.025
    },
    { 
      id: 'er4', type: 'residue',
      position: { x: 350, y: 400 },
      size: 6, opacity: 0.5,
      pulseFrequency: 0.018
    },
    { 
      id: 'er5', type: 'residue',
      position: { x: 500, y: 500 },
      size: 4, opacity: 0.35,
      pulseFrequency: 0.022
    },
    { 
      id: 'er6', type: 'residue',
      position: { x: 650, y: 450 },
      size: 5, opacity: 0.4,
      pulseFrequency: 0.02
    }
  ];
  
  // Add more echoes around special nodes
  specialNodes.forEach(node => {
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 20;
      echoResidues.push({
        id: `er_${node.id}_${i}`,
        type: 'residue',
        position: {
          x: node.x + Math.cos(angle) * distance,
          y: node.y + Math.sin(angle) * distance
        },
        size: 2 + Math.random() * 4,
        opacity: 0.2 + Math.random() * 0.3,
        pulseFrequency: 0.01 + Math.random() * 0.02,
        parentNode: node.id
      });
    }
  });
  
  echoes.push(...echoResidues);
  
  // Return complete data
  return { nodes, waves, echoes };
};

// Main component
const QKOVAttributionVisualizer = () => {
