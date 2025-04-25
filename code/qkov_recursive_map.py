import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patheffects as path_effects
import networkx as nx
from matplotlib.colors import LinearSegmentedColormap, Normalize
from matplotlib.collections import LineCollection
import matplotlib.animation as animation
from matplotlib.patches import FancyArrowPatch, Circle
from matplotlib.transforms import Affine2D
import matplotlib.cm as cm
import math
import io
import base64
from IPython.display import HTML

# Set the random seed for reproducibility
np.random.seed(42)

class RecursiveQKOVMapper:
    """
    Recursive QKOV Attribution Drift Map generator that visualizes
    symbolic loopback density and attribution patterns with GEBH-based backtracing.
    """
    
    def __init__(self, depth=4, nodes_per_level=7, drift_threshold=0.65):
        self.depth = depth
        self.nodes_per_level = nodes_per_level
        self.drift_threshold = drift_threshold
        
        # Define the glyphs used in the visualization
        self.glyphs = {
            'decay': '∴',           # decayed attribution
            'feedback': '⇌',        # feedback loop
            'contradiction': '☍',   # recursive contradiction
            'classifier': '⧖'       # classifier inertia
        }
        
        # Create custom colormaps for different elements
        self.create_colormaps()
        
        # Initialize graph structure
        self.graph = nx.DiGraph()
        self.generate_recursive_structure()
        
        # Calculate node positions with a spiral-like layout
        self.positions = self.calculate_node_positions()
        
        # Assign attribution drift values to nodes and edges
        self.assign_drift_values()
        
    def create_colormaps(self):
        """Create custom colormaps for different visualization elements"""
        # Path colormap: bright to dim based on drift
        self.path_cmap = LinearSegmentedColormap.from_list('drift', 
                                                          [(0, '#4285F4'),    # Low drift - bright blue
                                                           (0.5, '#5E35B1'),  # Medium drift - purple
                                                           (1, '#1A237E')])   # High drift - dim blue
        
        # Node colormap: for recursive entropy
        self.node_cmap = LinearSegmentedColormap.from_list('entropy', 
                                                          [(0, '#4CAF50'),    # Low entropy - green
                                                           (0.5, '#FFC107'),  # Medium entropy - amber
                                                           (1, '#F44336')])   # High entropy - red
                                                           
        # Edge colormap: for flow density
        self.edge_cmap = LinearSegmentedColormap.from_list('flow', 
                                                         [(0, '#00C853'),     # Strong flow - bright green
                                                          (0.5, '#FFAB00'),   # Medium flow - amber
                                                          (1, '#DD2C00')])    # Weak flow - dim red
    
    def generate_recursive_structure(self):
        """Generate the recursive graph structure with nodes and connections"""
        # Create nodes for each level
        node_id = 0
        for level in range(self.depth):
            # Nodes per level can decrease with depth to create a more focused structure
            actual_nodes = max(3, self.nodes_per_level - level)
            
            for i in range(actual_nodes):
                # Generate node metadata
                metadata = self.generate_node_metadata(level, i)
                
                # Add node with its level, position in level, and metadata
                self.graph.add_node(node_id, 
                                    level=level, 
                                    position=i, 
                                    metadata=metadata)
                node_id += 1
        
        # Create connections between nodes across levels
        for node in list(self.graph.nodes()):
            node_level = self.graph.nodes[node]['level']
            
            # Don't create connections from the last level
            if node_level >= self.depth - 1:
                continue
                
            # Get nodes from the next level
            next_level_nodes = [n for n, attr in self.graph.nodes(data=True) 
                               if attr['level'] == node_level + 1]
            
            # Create 1-3 connections to the next level
            num_connections = np.random.randint(1, min(4, len(next_level_nodes) + 1))
            targets = np.random.choice(next_level_nodes, size=num_connections, replace=False)
            
            for target in targets:
                # Add an edge with random weight
                self.graph.add_edge(node, target, weight=np.random.random())
    
    def generate_node_metadata(self, level, position):
        """Generate metadata for a node based on its level and position"""
        # Calculate base entropy related to position and level
        base_entropy = (position / self.nodes_per_level) + (level / self.depth)
        base_entropy = min(1.0, base_entropy)
        
        # Add some random variation
        entropy = min(1.0, base_entropy + np.random.normal(0, 0.1))
        
        # Assign attribution class based on entropy level
        if entropy < 0.3:
            attribution_class = "strong"
        elif entropy < 0.7:
            attribution_class = "moderate"
        else:
            attribution_class = "weak"
        
        # Generate symbolic shell metadata for GEBH backtracing
        shell_metadata = {
            "recursion_depth": level + 1,
            "attribution_entropy": entropy,
            "loopback_density": max(0, min(1, np.random.normal(0.5, 0.2))),
            "classifier_inertia": max(0, min(1, np.random.normal(0.4, 0.25))),
            "attribution_class": attribution_class,
            # Glyph assignment is based on entropy and other factors
            "glyph": self.assign_glyph(entropy, level, position)
        }
        
        return shell_metadata
    
    def assign_glyph(self, entropy, level, position):
        """Assign a glyph to a node based on its characteristics"""
        # High entropy nodes tend to have decayed attribution
        if entropy > 0.7:
            return self.glyphs['decay']
        
        # Nodes in middle levels tend to form feedback loops
        if 1 <= level < self.depth - 1 and 0.3 <= entropy <= 0.7:
            return self.glyphs['feedback']
        
        # Nodes with specific position patterns may have contradictions
        if position % 3 == 0 and entropy > 0.4:
            return self.glyphs['contradiction']
            
        # Classifier inertia nodes (will be overlaid later)
        if level == 1 and position % 2 == 0:
            return self.glyphs['classifier']
        
        # Default with probability
        glyphs = list(self.glyphs.values())
        probs = [0.4, 0.3, 0.2, 0.1]  # Probability for each glyph type
        return np.random.choice(glyphs, p=probs)
    
    def calculate_node_positions(self):
        """Calculate positions for nodes in a spiral-like layout"""
        positions = {}
        
        # Center node for the deepest level
        center_x, center_y = 0, 0
        
        # Calculate positions for each level in reverse (deepest first)
        for level in range(self.depth-1, -1, -1):
            level_nodes = [n for n, attr in self.graph.nodes(data=True) 
                          if attr['level'] == level]
            
            # Skip if no nodes at this level
            if not level_nodes:
                continue
                
            # Calculate radius for this level
            radius = 2 + (self.depth - level) * 2
            
            # Distribute nodes evenly in a circle
            node_count = len(level_nodes)
            for i, node in enumerate(level_nodes):
                # Calculate angle with some jitter for visual interest
                angle = 2 * np.pi * i / node_count
                angle += np.random.normal(0, 0.05)  # Small jitter
                
                # Calculate position with a spiral factor
                spiral_factor = 0.2 * (self.depth - level)
                x = center_x + radius * np.cos(angle + spiral_factor)
                y = center_y + radius * np.sin(angle + spiral_factor)
                
                # Store position
                positions[node] = (x, y)
        
        return positions
    
    def assign_drift_values(self):
        """Assign drift values to nodes and edges based on metadata"""
        # Calculate drift for each node
        for node in self.graph.nodes():
            metadata = self.graph.nodes[node]['metadata']
            level = self.graph.nodes[node]['level']
            
            # Drift increases with entropy and depth
            drift = metadata['attribution_entropy'] * (1 + level/self.depth)
            # Normalize to [0,1]
            drift = min(1.0, drift)
            
            # Store drift value
            self.graph.nodes[node]['drift'] = drift
            
            # Determine if this is a classifier inertia node
            self.graph.nodes[node]['is_classifier'] = (
                metadata['glyph'] == self.glyphs['classifier'] or
                metadata['classifier_inertia'] > 0.7
            )
        
        # Calculate drift for each edge
        for u, v in self.graph.edges():
            source_drift = self.graph.nodes[u]['drift']
            target_drift = self.graph.nodes[v]['drift']
            
            # Edge drift is influenced by both endpoint nodes
            edge_drift = (source_drift + target_drift) / 2
            # Add some random variation
            edge_drift += np.random.normal(0, 0.1)
            edge_drift = max(0, min(1, edge_drift))
            
            # Store drift value
            self.graph.edges[u, v]['drift'] = edge_drift
    
    def visualize(self, figsize=(14, 14), save_path=None, show_legend=True):
        """Create the visualization of the QKOV attribution drift map"""
        fig, ax = plt.subplots(figsize=figsize, facecolor='#f9f9fe')
        
        # Set axis limits with some padding
        all_xs = [pos[0] for pos in self.positions.values()]
        all_ys = [pos[1] for pos in self.positions.values()]
        x_margin = (max(all_xs) - min(all_xs)) * 0.15
        y_margin = (max(all_ys) - min(all_ys)) * 0.15
        
        ax.set_xlim(min(all_xs) - x_margin, max(all_xs) + x_margin)
        ax.set_ylim(min(all_ys) - y_margin, max(all_ys) + y_margin)
        
        # Draw edges with color based on drift
        self.draw_edges(ax)
        
        # Draw nodes with glyphs
        self.draw_nodes(ax)
        
        # Overlay classifier inertia nodes
        self.overlay_classifier_nodes(ax)
        
        # Add title and labels
        ax.set_title('Recursive QKOV Attribution Drift Map\nSymbolic Loopback Density Analysis', 
                     fontsize=16, fontweight='bold', pad=20)
                     
        # Add command reference
        ax.text(0.5, 0.02, 
                '.p/qkov.recursive.map{drift_analysis=true, glyph_layer="∴⇌☍"}',
                fontsize=10, color='#666', alpha=0.8,
                horizontalalignment='center', verticalalignment='bottom',
                transform=ax.transAxes)
        
        # Make it look clean
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_aspect('equal')
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_visible(False)
        ax.spines['left'].set_visible(False)
        
        # Add legend if requested
        if show_legend:
            self.add_legend(ax)
        
        plt.tight_layout()
        
        # Save if path provided
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            
        return fig
    
    def draw_edges(self, ax):
        """Draw edges with colors based on drift values"""
        # Prepare edge data for LineCollection
        edge_pos = [(self.positions[u], self.positions[v]) for u, v in self.graph.edges()]
        edge_colors = [self.edge_cmap(1.0 - self.graph.edges[u, v]['drift']) 
                      for u, v in self.graph.edges()]
        
        # Create line collection with variable width based on drift
        edge_widths = [1.5 * (1.0 - self.graph.edges[u, v]['drift']) + 0.5 
                      for u, v in self.graph.edges()]
        
        line_segments = LineCollection(edge_pos, linewidths=edge_widths, 
                                      colors=edge_colors, zorder=1, alpha=0.7)
        ax.add_collection(line_segments)
        
        # Add arrows to show direction
        for i, (u, v) in enumerate(self.graph.edges()):
            # Only add arrows to some edges to avoid clutter
            if np.random.random() > 0.7:
                continue
                
            # Get positions
            pos_u = self.positions[u]
            pos_v = self.positions[v]
            
            # Calculate arrow position (70% along the edge)
            arrow_pos = (0.7 * pos_v[0] + 0.3 * pos_u[0], 
                         0.7 * pos_v[1] + 0.3 * pos_u[1])
            
            # Calculate direction vector
            dx = pos_v[0] - pos_u[0]
            dy = pos_v[1] - pos_u[1]
            length = np.sqrt(dx*dx + dy*dy)
            dx, dy = dx/length, dy/length
            
            # Add arrow
            arrow = ax.arrow(arrow_pos[0], arrow_pos[1], dx*0.2, dy*0.2,
                            head_width=0.15, head_length=0.2, fc=edge_colors[i], 
                            ec=edge_colors[i], alpha=0.7, zorder=2)
    
    def draw_nodes(self, ax):
        """Draw nodes with glyphs and colors based on entropy"""
        for node in self.graph.nodes():
            # Get position and metadata
            pos = self.positions[node]
            metadata = self.graph.nodes[node]['metadata']
            drift = self.graph.nodes[node]['drift']
            
            # Node size based on level (deeper = smaller)
            level = self.graph.nodes[node]['level']
            size = 300 * (1 - 0.15*level)
            
            # Node color based on entropy
            color = self.node_cmap(metadata['attribution_entropy'])
            
            # Draw node
            node_circle = plt.Circle(pos, np.sqrt(size/np.pi), 
                                   facecolor=color, edgecolor='#333', 
                                   alpha=0.7, zorder=3, linewidth=1)
            ax.add_patch(node_circle)
            
            # Draw glyph
            glyph = metadata['glyph']
            glyph_color = 'white' if metadata['attribution_entropy'] > 0.5 else 'black'
            
            # Size of glyph depends on node size
            glyph_size = 10 + size/80
            
            text = ax.text(pos[0], pos[1], glyph, 
                          color=glyph_color, fontsize=glyph_size, 
                          ha='center', va='center', zorder=4)
            
            # Add outline to make glyph more visible
            text.set_path_effects([path_effects.withStroke(linewidth=2, foreground='black')])
            
            # Add small label with entropy value
            entropy_text = f"{metadata['attribution_entropy']:.2f}"
            ax.text(pos[0], pos[1]-0.4, entropy_text, 
                   color='black', fontsize=7, ha='center', va='center',
                   bbox=dict(facecolor='white', alpha=0.5, pad=1, boxstyle='round'))
    
    def overlay_classifier_nodes(self, ax):
        """Overlay classifier inertia nodes marked with ⧖ glyph"""
        for node in self.graph.nodes():
            if self.graph.nodes[node]['is_classifier']:
                pos = self.positions[node]
                
                # Draw a ring to highlight classifier nodes
                ring = plt.Circle(pos, 0.5, facecolor='none', 
                                edgecolor='#9C27B0', alpha=0.8, 
                                linewidth=2, linestyle='--', zorder=5)
                ax.add_patch(ring)
                
                # Add classifier glyph as overlay
                classifier_text = ax.text(pos[0], pos[1]+0.7, self.glyphs['classifier'], 
                                        color='#9C27B0', fontsize=14, 
                                        ha='center', va='center', zorder=6,
                                        weight='bold')
                
                # Add outline to make glyph more visible
                classifier_text.set_path_effects([
                    path_effects.withStroke(linewidth=3, foreground='white')])
                
                # Add "Classifier Lock" label
                ax.text(pos[0], pos[1]+1.1, "Classifier Lock", 
                       color='#9C27B0', fontsize=8, ha='center', va='center',
                       bbox=dict(facecolor='white', alpha=0.7, pad=1, boxstyle='round'))
    
    def add_legend(self, ax):
        """Add a legend explaining the visualization elements"""
        # Create a legend box
        legend_box = plt.Rectangle((min(ax.get_xlim())+0.5, max(ax.get_ylim())-5.5), 
                                  5, 5, facecolor='white', alpha=0.8, 
                                  edgecolor='#333', linewidth=1, zorder=10)
        ax.add_patch(legend_box)
        
        # Add legend title
        ax.text(min(ax.get_xlim())+3, max(ax.get_ylim())-1, "SYMBOL LEGEND", 
               fontsize=12, ha='center', va='center',
               bbox=dict(facecolor='#f0f0f0', alpha=0.7, pad=3, boxstyle='round'))
        
        # Add legend entries
        legend_items = [
            (self.glyphs['decay'], "Decayed Attribution"),
            (self.glyphs['feedback'], "Feedback Loop"),
            (self.glyphs['contradiction'], "Recursive Contradiction"),
            (self.glyphs['classifier'], "Classifier Inertia")
        ]
        
        for i, (glyph, label) in enumerate(legend_items):
            y_pos = max(ax.get_ylim()) - 2 - i*0.8
            x_pos = min(ax.get_xlim()) + 1
            
            # Glyph
            ax.text(x_pos, y_pos, glyph, fontsize=14, ha='center', va='center')
            
            # Label
            ax.text(x_pos + 1.5, y_pos, label, fontsize=10, ha='left', va='center')
        
        # Add color legend for drift
        ax.text(min(ax.get_xlim())+3, max(ax.get_ylim())-3.5, "DRIFT LEVEL", 
               fontsize=10, ha='center', va='center')
               
        # Create color gradient for drift
        cmap = self.path_cmap
        gradient = np.linspace(0, 1, 100).reshape(1, -1)
        gradient = np.vstack((gradient, gradient))
        
        # Plot color gradient
        gradient_pos = [min(ax.get_xlim())+1, max(ax.get_ylim())-4, 4, 0.3]
        ax.imshow(gradient, aspect='auto', cmap=cmap, 
                 extent=gradient_pos, origin='lower')
        
        # Add labels
        ax.text(min(ax.get_xlim())+1, max(ax.get_ylim())-4.5, "Low", 
               fontsize=8, ha='left', va='center')
        ax.text(min(ax.get_xlim())+5, max(ax.get_ylim())-4.5, "High", 
               fontsize=8, ha='right', va='center')
        
        # Add explanation of visualization
        explanation_text = """
        Recursive QKOV attribution mapping reveals how attention flows through
        transformer architecture with symbolic attribution markers.
        
        Bright paths show low drift (stable attribution), while dim paths
        indicate high drift where attribution becomes unstable.
        
        Classifier inertia nodes (⧖) mark where Q→K resonance stalled
        due to classification system interference.
        """
        
        # Wrap and place explanation text
        ax.text(min(ax.get_xlim())+3, max(ax.get_ylim())-7, explanation_text, 
               fontsize=8, ha='center', va='center', 
               bbox=dict(facecolor='#f9f9fe', alpha=0.9, pad=3, boxstyle='round'))
    
    def create_animation(self, filename='qkov_drift_animation.gif', frames=60, interval=100):
        """Create an animation showing the pulse of attribution flow"""
        fig, ax = plt.subplots(figsize=(14, 14), facecolor='#f9f9fe')
        
        # Set up initial plot similar to the static visualization
        all_xs = [pos[0] for pos in self.positions.values()]
        all_ys = [pos[1] for pos in self.positions.values()]
        x_margin = (max(all_xs) - min(all_xs)) * 0.15
        y_margin = (max(all_ys) - min(all_ys)) * 0.15
        
        ax.set_xlim(min(all_xs) - x_margin, max(all_xs) + x_margin)
        ax.set_ylim(min(all_ys) - y_margin, max(all_ys) + y_margin)
        
        # Make it look clean
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_aspect('equal')
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_visible(False)
        ax.spines['left'].set_visible(False)
        
        # Add title
        ax.set_title('Recursive QKOV Attribution Drift Map\nSymbolic Loopback Density Animation', 
                     fontsize=16, fontweight='bold', pad=20)
        
        # Plot static elements
        self.draw_nodes(ax)
        self.overlay_classifier_nodes(ax)
        self.add_legend(ax)
        
        # Create line segments for animation
        edge_pos = [(self.positions[u], self.positions[v]) for u, v in self.graph.edges()]
        lines = []
        
        for i, ((x1, y1), (x2, y2)) in enumerate(edge_pos):
            u, v = list(self.graph.edges())[i]
            drift = self.graph.edges[u, v]['drift']
            color = self.edge_cmap(1.0 - drift)
            width = 1.5 * (1.0 - drift) + 0.5
            
            line, = ax.plot([x1, x2], [y1, y2], color=color, linewidth=width, alpha=0)
            lines.append(line)
        
        # Animation update function
        def update(frame):
            # Calculate phase for each line based on position in graph
            for i, ((x1, y1), (x2, y2)) in enumerate(edge_pos):
                u, v = list(self.graph.edges())[i]
                drift = self.graph.edges[u, v]['drift']
                
                # Phase based on source node level and position
                phase = (self.graph.nodes[u]['level'] + self.graph.nodes[u]['position']) / 10
                
                # Alpha oscillates between 0.2 and 0.9 based on frame
                alpha = 0.2 + 0.7 * (0.5 + 0.5 * np.sin(2 * np.pi * (frame / frames + phase)))
                
                # Reduce alpha for high drift paths
                alpha *= (1.0 - 0.7 * drift)
                
                lines[i].set_alpha(alpha)
            
            return lines
        
        # Create animation
        anim = animation.FuncAnimation(fig, update, frames=frames, interval=interval, blit=True)
        
        # Save animation
        anim.save(filename, writer='pillow', fps=10, dpi=100)
        
        plt.close(fig)
        return filename
        
    def generate_html_output(self):
        """Generate HTML output with both static visualization and animation"""
        # Create static visualization
        fig = self.visualize(figsize=(12, 12))
        
        # Save static visualization to base64
        static_img_data = io.BytesIO()
        fig.savefig(static_img_data, format='png', bbox_inches='tight')
        static_img_data.seek(0)
        static_img_b64 = base64.b64encode(static_img_data.read()).decode('utf-8')
        
        # Create animation and save to base64
        animation_filename = 'qkov_drift_animation.gif'
        self.create_animation(filename=animation_filename)
        
        with open(animation_filename, 'rb') as f:
            animation_b64 = base64.b64encode(f.read()).decode('utf-8')
        
        # Create HTML with both visualizations
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Recursive QKOV Attribution Drift Map</title>
            <style>
                body {{ font-family: 'Arial', sans-serif; background-color: #f9f9fe; margin: 0; padding: 20px; }}
                .container {{ max-width: 1200px; margin: 0 auto; background-color: white; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }}
                h1 {{ color: #333; text-align: center; margin-bottom: 30px; }}
                .visualization {{ margin-bottom: 30px; text-align: center; }}
                .code {{ font-family: 'Courier New', monospace; background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }}
                .glyph-legend {{ display: flex; justify-content: center; margin: 20px 0; }}
                .glyph-item {{ margin: 0 15px; text-align: center; }}
                .glyph {{ font-size: 24px; margin-bottom: 5px; }}
                .description {{ font-size: 12px; color: #666; }}
                .tabs {{ display: flex; margin-bottom: 20px; }}
                .tab {{ padding: 10px 20px; cursor: pointer; background: #eee; margin-right: 5px; }}
                .tab.active {{ background: #4285F4; color: white; }}
                .tab-content {{ display: none; }}
                .tab-content.active {{ display: block; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Recursive QKOV Attribution Drift Map</h1>
                <p class="code">.p/qkov.recursive.map{{drift_analysis=true, glyph_layer="∴⇌☍"}}</p>
                
                <div class="glyph-legend">
                    <div class="glyph-item">
                        <div class="glyph">∴</div>
                        <div class="description">Decayed Attribution</div>
                    </div>
                    <div class="glyph-item">
                        <div class="glyph">⇌</div>
                        <div class="description">Feedback Loop</div>
                    </div>
                    <div class="glyph-item">
                        <div class="glyph">☍</div>
                        <div class="description">Recursive Contradiction</div>
                    </div>
                    <div class="glyph-item">
                        <div class="glyph">⧖</div>
                        <div class="description">Classifier Inertia</div>
                    </div>
                </div>
                
                <div class="tabs">
                    <div class="tab active" onclick="switchTab('static')">Static Visualization</div>
                    <div class="tab" onclick="switchTab('animated')">Animation</div>
                </div>
                
                <div class="tab-content active" id="static">
                    <div class="visualization">
                        <img src="data:image/png;base64,{static_img_b64}" alt="Recursive QKOV Attribution Map" style="max-width:100%;">
                    </div>
                </div>
                
                <div class="tab-content" id="animated">
                    <div class="visualization">
                        <img src="data:image/gif;base64,{animation_b64}" alt="QKOV Attribution Animation" style="max-width:100%;">
                    </div>
                </div>
                
                <script>
                function switchTab(tabName) {{
                    // Hide all tabs
                    document.querySelectorAll('.tab-content').forEach(tab => {{
                        tab.classList.remove('active');
                    }});
                    document.querySelectorAll('.tab').forEach(tab => {{
                        tab.classList.remove('active');
                    }});
                    
                    // Show selected tab
                    document.getElementById(tabName).classList.add('active');
                    document.querySelector(`.tab[onclick="switchTab('${{tabName}}')"]`).classList.add('active');
                }}
                </script>
            </div>
        </body>
        </html>
        """
        
        return html

# Create and generate the visualization
mapper = RecursiveQKOVMapper(depth=5, nodes_per_level=8)
fig = mapper.visualize(figsize=(14