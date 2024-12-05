<!-- src/routes/number-place-value/base-ten-blocks/+page.svelte -->

<script>
  import BaseTenBlocks from '$lib/components/BaseTenBlocks.svelte';

  let numberInput = 111; // Default number
  let errorMessage = '';

  const resetValues = () => {
    numberInput = 111;
    errorMessage = '';
  };

  // Validate input
  $: {
    if (numberInput < 0 || numberInput > 999) {
      errorMessage = 'Please enter a number between 0 and 999.';
    } else {
      errorMessage = '';
    }
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Base-10 Blocks Manipulative</h1>

  <p class="mb-6">
    Enter a number between <strong>0</strong> and <strong>999</strong> to visualize its representation using base-10 blocks.
  </p>

  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <div>
      <label class="label" for="number-input">
        <span class="label-text">Number:</span>
      </label>
      <input
        id="number-input"
        type="number"
        min="0"
        max="999"
        bind:value|number={numberInput}
        class="input input-bordered w-full max-w-xs"
        aria-label="Number input"
      />
    </div>
    <div class="flex items-end">
      <button
        class="btn btn-secondary mt-4 sm:mt-0"
        on:click={resetValues}
        aria-label="Reset to default number"
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

  <!-- Pass the correct prop name 'number' -->
  <BaseTenBlocks number={numberInput} />
</div>
