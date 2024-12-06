<!-- src/lib/components/PartWholeModel.svelte -->
<script>
  import { onMount, afterUpdate } from 'svelte';
  import * as d3 from 'd3';

  export let whole = '';
  export let parts = []; // Array of strings representing parts (numbers, '=', '?', or '')

  let svg;

  // Dimensions
  const width = 500;
  const height = 500;
  const cx = width / 2;
  const cy = height / 2;
  const r = 150;

  // Mapping number of parts to clock positions
  const clockPositionsMap = {
    1: [6],
    2: [5.5, 6.5],
    3: [5, 6, 7],
    4: [4.5, 5.5, 6.5, 7.5],
    5: [4, 5, 6, 7, 8]
  };

  // Convert clock position to coordinates
  function clockPosToCoord(position) {
    const angleDeg = (position / 12) * 360 - 90;
    const angleRad = angleDeg * Math.PI / 180;
    const x = cx + r * Math.cos(angleRad);
    const y = cy + r * Math.sin(angleRad);
    return { x, y };
  }

  // Draw the Part-Whole Model
  function drawVisualization() {
    // Clear previous SVG content
    d3.select(svg).selectAll('*').remove();

    // Number of parts
    const numParts = parts.length;

    // Get clock positions
    const clockPositions = clockPositionsMap[numParts] || [];

    // Create nodes
    const nodes = [
      {
        id: 'whole',
        label: whole.trim() === '' || whole.trim() === '?' ? '?' : whole,
        x: cx,
        y: cy,
        radius: 40
      }
    ];

    // Add parts
    parts.forEach((part, index) => {
      const angle = clockPositions[index];
      if (!angle) return; // Skip if no angle defined for this part
      const coord = clockPosToCoord(angle);
      nodes.push({
        id: `part${index + 1}`,
        label: (part.trim() === '' || part.trim() === '?') ? '?' : part,
        x: coord.x,
        y: coord.y,
        radius: 35
      });
    });

    // Create links
    const links = nodes.slice(1).map(part => ({
      source: 'whole',
      target: part.id
    }));

    // Create a lookup for nodes by ID
    const nodeById = {};
    nodes.forEach(node => {
      nodeById[node.id] = node;
    });

    // Draw links
    d3.select(svg)
      .selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => nodeById[d.source].x)
      .attr('y1', d => nodeById[d.source].y)
      .attr('x2', d => nodeById[d.target].x)
      .attr('y2', d => nodeById[d.target].y)
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    // Draw circles
    d3.select(svg)
      .selectAll('.circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.radius)
      .attr('fill', '#ffffff')
      .attr('stroke', '#333')
      .attr('stroke-width', 2)
      .attr('tabindex', 0) // Make circles focusable for accessibility
      .append('title') // Tooltip for accessibility
      .text(d => d.id === 'whole' ? `Whole: ${d.label}` : `Part: ${d.label}`);

    // Add labels
    d3.select(svg)
      .selectAll('.label')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('font-size', d => d.label === '?' ? '24px' : '16px') // Larger font for '?'
      .attr('fill', '#333')
      .text(d => d.label);
  }

  onMount(() => {
    drawVisualization();
  });

  afterUpdate(() => {
    drawVisualization();
  });
</script>

<div class="overflow-auto">
  <svg bind:this={svg} width="100%" height="100%" class="border rounded shadow-lg"></svg>
</div>

<style>
  .circle:hover {
    fill: #3B82F6;
    cursor: pointer;
  }

  svg {
    background-color: #ffffff;
  }

  .link {
    stroke: #999;
    stroke-width: 2px;
  }

  .circle {
    fill: #ffffff;
    stroke: #333;
    stroke-width: 2px;
    transition: fill 0.3s;
  }

  .label {
    font-size: 16px;
    fill: #333;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
  }

  /* Responsive SVG Container */
  div.overflow-auto {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    height: 600px; /* Ensure SVG has height to display */
  }
</style>
