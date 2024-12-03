<!-- src/lib/components/Base10Blocks.svelte -->
<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  export let blocks = 10;

  let svg;

  onMount(() => {
    const width = 400;
    const height = 100;
    const blockSize = 20;
    const spacing = 5;

    const svgElement = d3.select(svg)
      .attr('width', width)
      .attr('height', height);

    const update = (blocks) => {
      const data = d3.range(blocks);

      // DATA JOIN
      const rects = svgElement.selectAll('rect').data(data, d => d);

      // EXIT
      rects.exit().remove();

      // UPDATE
      rects
        .attr('x', (d, i) => i * (blockSize + spacing))
        .attr('y', 40)
        .attr('width', blockSize)
        .attr('height', blockSize)
        .attr('fill', '#3B82F6');

      // ENTER
      rects.enter()
        .append('rect')
        .attr('x', (d, i) => i * (blockSize + spacing))
        .attr('y', 40)
        .attr('width', blockSize)
        .attr('height', blockSize)
        .attr('fill', '#3B82F6')
        .attr('stroke', '#1E40AF')
        .attr('stroke-width', 2);
    };

    update(blocks);
  });
</script>

<svg bind:this={svg} class="border"></svg>
