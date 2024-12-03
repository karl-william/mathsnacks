<!-- src/routes/+page.svelte -->

<script>
  // Import both 'data' and 'flatData' from your centralized data store
  import { data, flatData } from '$lib/data';
  import { onMount } from 'svelte';

  let searchQuery = '';

  // Reactive statement to filter results based on search query
  $: filteredResults = searchQuery
    ? flatData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

</script>

<div class="container mx-auto p-4">
  <!-- Search Bar -->
  <div class="mb-8">
    <input
      type="text"
      placeholder="Search for a maths visual e.g. array..."
      bind:value={searchQuery}
      class="input input-bordered w-full max-w-lg"
      aria-label="Search"
      autofocus
    />
  </div>

  <h1 class="text-2xl">Click on a topic or use the search bar above</h1>
  <!-- Display All Main Topics Initially (When No Search Query) -->
  {#if !searchQuery}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {#each data as topic}
        <a href={topic.path} aria-label={`Navigate to ${topic.title}`}>
          <div class="card bg-primary shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div class="card-body">
              <h2 class="card-title">{topic.title}</h2>
              <p>{topic.description}</p>
                  <p class="text-sm text-gray-500">Category: Topic</p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <!-- Display Search Results -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {#if filteredResults.length > 0}
        {#each filteredResults as item}
          <a href={item.path} aria-label={`Navigate to ${item.title}`}>
            <div class="card shadow-xl hover:shadow-2xl transition-shadow duration-300
             {item.type === 'subtopic' ? 'bg-base-100' : 'bg-primary'}">
              <div class="card-body">
                <h2 class="card-title">{item.title} {item.type === 'subtopic' ? "(Free)" : ""}</h2>
                <p>{item.description}</p>
                {#if item.type === 'subtopic'}
                  <p class="text-sm text-gray-500">Category: {item.parent}</p>
                {/if}
              </div>
            </div>
          </a>
        {/each}
      {:else}
        <p class="text-center text-gray-500 col-span-full">No results found for "{searchQuery}".</p>
      {/if}
    </div>
  {/if}
</div>
