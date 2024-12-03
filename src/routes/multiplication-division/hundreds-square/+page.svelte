<!-- src/routes/multiplication-division/hundreds-square/+page.svelte -->

<script>
  import HundredsSquare from '$lib/components/HundredsSquare.svelte';

  // Initialize an empty array for selected multiples
  let selectedMultiples = [];
  let errorMessage = "";

  // Reset function to clear selections
  const resetValues = () => {
    selectedMultiples = [];
    errorMessage = "";
  };

</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Hundreds Square Manipulative</h1>

  <p class="mb-6">
    Select one or more multiples (1-12) to see their multiples highlighted in the hundreds square grid.
  </p>

  <!-- Input Controls -->
  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <div>
      <label class="label"><span class="label-text">Select Multiples (1-12):</span></label>
      <!-- Using checkboxes for multiple selections -->
      <div class="grid grid-cols-3 gap-2">
        {#each Array.from({ length: 12 }, (_, i) => i + 1) as num}
          <label class="flex items-center">
            <input
              type="checkbox"
              value={num}
              bind:group={selectedMultiples}
              class="checkbox checkbox-primary"
              aria-label={`Select multiple of ${num}`}
            />
            <span class="ml-2">{num}</span>
          </label>
        {/each}
      </div>
    </div>
    <div class="flex items-start sm:items-end">
      <button
        class="btn btn-secondary mt-4 sm:mt-0"
        on:click={resetValues}
        aria-label="Reset to default values"
      >
        Reset
      </button>
    </div>
  </div>

  {#if errorMessage}
    <div class="alert alert-error shadow-lg mb-4" role="alert" aria-live="assertive">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m12 2a9.003 9.003 0 11-18 0 9.003 9.003 0 0118 0z" />
        </svg>
        <span>{errorMessage}</span>
      </div>
    </div>
  {/if}

  <!-- Hundreds Square Grid -->
  <HundredsSquare {selectedMultiples} />
</div>
