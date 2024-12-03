<!-- src/lib/components/NumberLine.svelte -->
<script>
  import { onMount, afterUpdate } from 'svelte';
  import * as d3 from 'd3';

  export let start = 0;
  export let end = 10;
  export let interval = 1;

  let svg;

  // Dimensions and margins
  const margin = { top: 20, right: 20, bottom: 50, left: 20 };
  let width = 800 - margin.left - margin.right;
  let height = 100 - margin.top - margin.bottom;

  // Function to render the number line
  const renderNumberLine = () => {
    // Validate inputs
    // if (end <= start) {
    //   alert("End number must be greater than start number.");
    //   return;
    // }
    if (interval < 0) {
      alert("Interval must be a positive number.");
      return;
    }

    // Clear previous SVG content
    d3.select(svg).selectAll("*").remove();

    // Create SVG container
    const svgElement = d3.select(svg)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scale
    const xScale = d3.scaleLinear()
      .domain([start, end])
      .range([0, width]);

    // Define bottom axis
    const xAxis = d3.axisBottom(xScale)
      .ticks((end - start) / interval)
      .tickFormat(d3.format("d"));

    // Draw the number line
    svgElement.append("line")
      .attr("x1", xScale(start))
      .attr("y1", height / 2)
      .attr("x2", xScale(end))
      .attr("y2", height / 2)
      .attr("stroke", "#1E40AF")
      .attr("stroke-width", 2);

    // Add ticks
    svgElement.append("g")
      .attr("transform", `translate(0, ${height / 2})`)
      .call(xAxis);

    // Add labels
    svgElement.selectAll(".tick text")
      .attr("dy", "1.5em")
      .attr("font-size", "12px");

  };

  onMount(() => {
    renderNumberLine();
  });

  afterUpdate(() => {
    renderNumberLine();
  });
</script>

<div class="overflow-auto">
  <svg bind:this={svg} class="border rounded shadow-lg"></svg>
</div>


<style>
  svg {
    background-color: #ffffff;
    transition: width 0.3s ease, height 0.3s ease;
    max-width: 100%;
    height: auto;
  }

  .tick line {
    stroke: #1E40AF;
  }

  .tick text {
    fill: #1E40AF;
    font-weight: bold;
  }
</style>
