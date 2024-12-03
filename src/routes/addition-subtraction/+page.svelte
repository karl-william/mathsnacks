   <!-- src/routes/addition-subtraction/+page.svelte -->
   <script>
     const representations = [
       { name: 'Number Line', path: '/addition-subtraction/number-line' },
       { name: 'Counters', path: '/addition-subtraction/counters' },
       // Add more as needed
     ];
   </script>

   <div class="container mx-auto p-4">
     <h2 class="text-3xl font-semibold mb-6">Addition and Subtraction</h2>
     <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {#each representations as rep}
         <a href="{rep.path}">
           <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
             <div class="card-body">
               <h3 class="card-title">{rep.name}</h3>
             </div>
           </div>
         </a>
       {/each}
     </div>
     <a href="/" class="mt-6 text-blue-500 hover:underline">← Back to Home</a>
   </div>
