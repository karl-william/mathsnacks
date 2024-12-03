<!-- src/routes/number-place-value/number-line/+page.svelte -->
<script>
  import NumberLine from '$lib/components/NumberLine.svelte';
  let start = 0;
  let end = 10;
  let interval = 1;

  const resetValues = () => {
    start = 0;
    end = 10;
    interval = 1;
  };
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Number Line Manipulative</h1>

  <p class="mb-6">
    Enter the start number, end number, and interval to visualize numbers on a number line.
  </p>

  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <div>
      <label class="label">
        <span class="label-text">Start Number:</span>
      </label>
      <input
        type="number"
        bind:value={start}
        class="input input-bordered w-full max-w-xs"
        aria-label="Start number"
      />
    </div>
    <div>
      <label class="label">
        <span class="label-text">End Number:</span>
      </label>
      <input
        type="number"
        bind:value={end}
        class="input input-bordered w-full max-w-xs"
        aria-label="End number"
      />
    </div>
    <div>
      <label class="label">
        <span class="label-text">Interval:</span>
      </label>
      <input
        type="number"
        min="1"
        bind:value={interval}
        class="input input-bordered w-full max-w-xs"
        aria-label="Interval"
      />
    </div>
    <div class="flex items-end">
      <button
        class="btn btn-secondary mt-4 sm:mt-0"
        on:click={resetValues}
        aria-label="Reset to default values"
      >
        Reset
      </button>
    </div>
  </div>

  <NumberLine {start} {end} {interval} />
</div>
