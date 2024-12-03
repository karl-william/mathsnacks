<!-- src/lib/components/ArraysManipulative.svelte -->
<script>
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import * as d3 from 'd3';

  export let rows = 3;
  export let columns = 4;

  let svg;
  const svgWidth = 500;
  const svgHeight = 300;
  const circleRadius = 15;
  const padding = 20;

  // Responsive scaling based on the number of rows and columns
  function calculateDimensions() {
    const totalWidth = columns * (2 * circleRadius + padding);
    const totalHeight = rows * (2 * circleRadius + padding);
    return {
      width: Math.max(svgWidth, totalWidth + padding),
      height: Math.max(svgHeight, totalHeight + padding)
    };
  }

  let dimensions = calculateDimensions();

  function renderArray() {
    const { width, height } = calculateDimensions();

    // Update SVG dimensions
    d3.select(svg)
      .attr('width', width)
      .attr('height', height);

    // Create data array
    const data = d3.range(rows * columns).map(d => ({
      id: d,
      row: Math.floor(d / columns),
      col: d % columns
    }));

    // Bind data
    const circles = d3.select(svg).selectAll('circle').data(data, d => d.id);

    // Remove exiting circles
    circles.exit().remove();

    // Update existing circles
    circles
      .attr('cx', d => padding + d.col * (2 * circleRadius + padding))
      .attr('cy', d => padding + d.row * (2 * circleRadius + padding));

    // Add new circles
    circles.enter()
      .append('circle')
      .attr('cx', d => padding + d.col * (2 * circleRadius + padding))
      .attr('cy', d => padding + d.row * (2 * circleRadius + padding))
      .attr('r', circleRadius)
      .attr('fill', '#3B82F6')
      .attr('stroke', '#1E40AF')
      .attr('stroke-width', 2);
  }

  onMount(() => {
    renderArray();
  });

  afterUpdate(() => {
    renderArray();
  });
</script>

<svg bind:this={svg} class="border rounded"></svg>

<style>
  svg {
    transition: width 0.3s ease, height 0.3s ease;
  }
</style>
