<!-- src/lib/components/HundredsSquare.svelte -->

<script>
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import * as d3 from 'd3';

  // Receive an array of selected multiples
  export let selectedMultiples = [];

  let svg;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const gridSize = 10; // 10x10 grid
  let width = 500 - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;
  let cellSize = Math.min(width, height) / gridSize;

  // Define a color palette for different multiples (using softer pastel colors)
const colors = {
    1: '#6A8CAF',   // Soft Slate Blue
    2: '#F28B82',   // Muted Coral Pink
    3: '#A8D5BA',   // Pale Sage Green
    4: '#E8C1A0',   // Warm Sand Beige
    5: '#C8A2C8',   // Dusty Lavender
    6: '#F9A875',   // Peachy Orange
    7: '#F6D860',   // Mellow Goldenrod
    8: '#85C7F2',   // Soft Sky Blue
    9: '#9099A2',  // Smoky Gray
    10: '#8BE3D0',   // Minty Aqua
    11: '#3A6A72',  // Deep Teal
    12: '#AF508A'   // Berry Purple
};

  // Function to render the grid
  const renderGrid = () => {
    // Clear previous SVG content
    d3.select(svg).selectAll('*').remove();

    // Create SVG container
    const svgElement = d3.select(svg)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('role', 'img')
      .attr('aria-label', selectedMultiples.length > 0
        ? `Hundreds square highlighting multiples of ${selectedMultiples.join(', ')}`
        : 'Hundreds square with no highlights')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create 10x10 grid
    for (let i = 0; i < gridSize; i++) { // rows
      for (let j = 0; j < gridSize; j++) { // columns
        const number = i * gridSize + j + 1;

        // Determine if the number is a multiple of any selected multiple
        const multiplesThatApply = selectedMultiples.filter(multiple => multiple !== 0 && number % multiple === 0);
        const isMultiple = multiplesThatApply.length > 0;

        // Determine colors based on multiples (with higher multiples on top)
        let fillColor = '#ffffff'; // default white
        let textColor = '#000000'; // default black

        if (isMultiple) {
          // Sort the multiples that apply in descending order to get the highest multiple first
          multiplesThatApply.sort((a, b) => b - a);

          // Assign a color based on the highest multiple it is a multiple of
          const highestMultiple = multiplesThatApply[0];

          fillColor = colors[highestMultiple] || '#3B82F6'; // default to blue if multiple not in colors
          textColor = '#000000'; // Black text for better contrast on pastel colors
        }

        // Draw rectangle
        svgElement.append('rect')
          .attr('x', j * cellSize)
          .attr('y', i * cellSize)
          .attr('width', cellSize - 2) // slight gap
          .attr('height', cellSize - 2)
          .attr('fill', fillColor)
          .attr('stroke', '#000000')
          .attr('stroke-width', 2)
          .on('mouseover', function() {
            d3.select(this).attr('stroke-width', 4);
          })
          .on('mouseout', function() {
            d3.select(this).attr('stroke-width', 2);
          });

        // Add text
        svgElement.append('text')
          .attr('x', j * cellSize + cellSize / 2)
          .attr('y', i * cellSize + cellSize / 2 + 5) // +5 to center vertically
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('fill', textColor)
          .attr('tabindex', 0) // Make text focusable
          .text(number)
          .append('title') // Tooltip for accessibility
          .text(isMultiple
            ? `${number} is a multiple of ${multiplesThatApply.join(', ')}` // Show all multiples in the tooltip
            : `${number}`);
      }
    }
  };

  onMount(() => {
    renderGrid();
    window.addEventListener('resize', renderGrid);
  });

  afterUpdate(() => {
    renderGrid();
  });

  onDestroy(() => {
    window.removeEventListener('resize', renderGrid);
  });
</script>

<div class="overflow-auto">
  <svg bind:this={svg} class="border rounded shadow-lg"></svg>
</div>

<style>
  svg {
    background-color: #ffffff;
    transition: width 0.3s ease, height 0.3s ease;
    width: 100%;
    height: auto;
    max-width: 600px;
    margin: 0 auto;
    display: block;
  }

  rect {
    cursor: pointer;
  }

  rect:hover {
    opacity: 0.8;
  }
</style>
