   <!-- src/routes/number-place-value/+page.svelte -->
   <script>
     import { subtopics } from './subtopics';
   </script>

   <div class="container mx-auto p-4">
     <h1 class="text-3xl font-bold mb-6">Number and Place Value</h1>

     <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       {#each subtopics as subtopic}
         <a href={subtopic.path}>
           <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
             <div class="card-body">
               <h2 class="card-title">{subtopic.title}</h2>
               <p>{subtopic.description}</p>
             </div>
           </div>
         </a>
       {/each}
     </div>
   </div>
