   <!-- src/routes/number-place-value/base-10-blocks/+page.svelte -->
   <script>
     import Base10Blocks from '$lib/components/Base10Blocks.svelte';
   </script>

   <div class="container mx-auto p-4">
     <h1 class="text-2xl font-bold mb-4">Base-10 Blocks</h1>

     <p class="mb-6">
       Use the blocks below to represent numbers visually.
     </p>

     <Base10Blocks blocks={15} />
   </div>
