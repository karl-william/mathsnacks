   <!-- src/routes/number-place-value/number-line/+page.svelte -->
   <script>
     import { onMount } from 'svelte';
     import * as d3 from 'd3';

     onMount(() => {
       // Set dimensions
       const width = 600;
       const height = 100;

       // Create SVG
       const svg = d3.select('#number-line-svg')
         .attr('width', width)
         .attr('height', height);

       // Draw number line
       svg.append('line')
         .attr('x1', 50)
         .attr('y1', height / 2)
         .attr('x2', width - 50)
         .attr('y2', height / 2)
         .attr('stroke', 'black');

       // Add ticks and labels
       const tickValues = d3.range(0, 11, 1); // 0 to 10

       svg.selectAll('.tick')
         .data(tickValues)
         .enter()
         .append('line')
         .attr('class', 'tick')
         .attr('x1', d => 50 + (d / 10) * (width - 100))
         .attr('y1', height / 2 - 10)
         .attr('x2', d => 50 + (d / 10) * (width - 100))
         .attr('y2', height / 2 + 10)
         .attr('stroke', 'black');

       svg.selectAll('.label')
         .data(tickValues)
         .enter()
         .append('text')
         .attr('class', 'label')
         .attr('x', d => 50 + (d / 10) * (width - 100))
         .attr('y', height / 2 + 25)
         .attr('text-anchor', 'middle')
         .text(d => d);
     });
   </script>

   <div class="container mx-auto p-4">
     <h3 class="text-2xl font-semibold mb-4">Number Line</h3>
     <svg id="number-line-svg"></svg>
     <a href="/number-place-value" class="mt-4 text-blue-500 hover:underline">← Back to Number and Place Value</a>
   </div>
