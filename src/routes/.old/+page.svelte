<!-- src/routes/+page.svelte -->
<script>
  import { topics } from './topics';
</script>

<div class="container mx-auto p-4">

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each topics as topic}
      <a href={topic.path}>
        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div class="card-body">
            <h2 class="card-title">{topic.title}</h2>
            <p>{topic.description}</p>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
