<!-- src/lib/components/BaseTenBlocks.svelte -->

<script>
  import { onMount, afterUpdate } from 'svelte';
  import * as d3 from 'd3';

  export let number = 111; // Default number

  let svgElement;

  // Constants for block dimensions and spacing
  const squareSize = 20;       // Size of each square
  const padding = 5;           // Padding between squares
  const sectionSpacing = 30;   // Spacing between hundreds, tens, and ones sections

  // Parse the number into hundreds, tens, and ones
  function parseNumber(n) {
    const hundreds = Math.floor(n / 100);
    const tens = Math.floor((n % 100) / 10);
    const ones = n % 10;
    return { hundreds, tens, ones };
  }

  // Function to draw a group of squares arranged in a grid
  function drawGroup(xOffset, yOffset, rows, cols, count) {
    const group = d3.select(svgElement)
      .append('g')
      .attr('transform', `translate(${xOffset}, ${yOffset})`);

    for(let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      group.append('rect')
        .attr('x', col * (squareSize + padding))
        .attr('y', row * (squareSize + padding))
        .attr('width', squareSize)
        .attr('height', squareSize)
        .attr('fill', '#3B82F6') // Blue color
        .attr('stroke', '#1E40AF') // Darker blue stroke
        .attr('stroke-width', 1);
    }
  }

  // Function to draw a stack of squares vertically
  function drawStack(xOffset, yOffset, count) {
    const group = d3.select(svgElement)
      .append('g')
      .attr('transform', `translate(${xOffset}, ${yOffset})`);

    for(let i = 0; i < count; i++) {
      group.append('rect')
        .attr('x', 0)
        .attr('y', i * (squareSize + padding))
        .attr('width', squareSize)
        .attr('height', squareSize)
        .attr('fill', '#10B981') // Green color for tens
        .attr('stroke', '#065F46') // Darker green stroke
        .attr('stroke-width', 1);
    }
  }

  // Function to draw individual ones
  function drawOnes(xOffset, yOffset, count) {
    const group = d3.select(svgElement)
      .append('g')
      .attr('transform', `translate(${xOffset}, ${yOffset})`);

    for(let i = 0; i < count; i++) {
      group.append('rect')
        .attr('x', i * (squareSize + padding))
        .attr('y', 0)
        .attr('width', squareSize)
        .attr('height', squareSize)
        .attr('fill', '#F59E0B') // Yellow color for ones
        .attr('stroke', '#B45309') // Darker yellow stroke
        .attr('stroke-width', 1);
    }
  }

  // Function to draw the base-10 blocks
  const drawBlocks = () => {
    const { hundreds, tens, ones } = parseNumber(number);

    // Clear previous SVG content
    d3.select(svgElement).selectAll('*').remove();

    // Calculate offsets
    let currentX = padding;
    const currentY = padding;

    // Draw Hundreds
    if (hundreds > 0) {
      const hundredsWidth = 10 * (squareSize + padding) - padding;
      const hundredsHeight = 10 * (squareSize + padding) - padding;
      drawGroup(currentX, currentY, 10, 10, hundreds * 100);
      currentX += hundredsWidth + sectionSpacing;
    }

    // Draw Tens
    if (tens > 0) {
      const tensHeight = 10 * (squareSize + padding) - padding;
      drawStack(currentX, currentY, tens * 10);
      currentX += squareSize + padding + sectionSpacing;
    }

    // Draw Ones
    if (ones > 0) {
      drawOnes(currentX, currentY, ones);
    }

    // Calculate SVG dimensions
    const svgWidth = currentX + (hundreds > 0 ? 10 * (squareSize + padding) : 0) + (tens > 0 ? (squareSize + padding) : 0) + (ones > 0 ? ones * (squareSize + padding) : 0) + padding;
    const svgHeight = Math.max(
      hundreds > 0 ? 10 * (squareSize + padding) : 0,
      tens > 0 ? tens * (squareSize + padding) : 0,
      ones > 0 ? squareSize : 0
    ) + padding;

    // Set SVG dimensions
    d3.select(svgElement)
      .attr('width', svgWidth)
      .attr('height', svgHeight);
  };

  onMount(() => {
    drawBlocks();
  });

  afterUpdate(() => {
    drawBlocks();
  });
</script>

<div class="overflow-auto"> <!-- Changed to overflow-auto to handle both x and y -->
  <svg bind:this={svgElement} class="border rounded shadow-lg"></svg>
</div>

<style>
  svg {
    background-color: #f3f4f6; /* Light gray background */
    padding: 10px;
    border-radius: 8px;
  }
</style>
