<!-- src/routes/multiplication-division/arrays/+page.svelte -->
<script>
  import ArraysManipulative from '$lib/components/ArraysManipulative.svelte';
  let rows = 3;
  let columns = 4;
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Arrays Manipulative</h1>

  <p class="mb-6">
    Enter the number of rows and columns to visualize multiplication and division using arrays.
  </p>

  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <div>
      <label class="label">
        <span class="label-text">Rows:</span>
      </label>
      <input
        type="number"
        min="1"
        bind:value={rows}
        class="input input-bordered w-full max-w-xs"
        aria-label="Number of rows"
      />
    </div>
    <div>
      <label class="label">
        <span class="label-text">Columns:</span>
      </label>
      <input
        type="number"
        min="1"
        bind:value={columns}
        class="input input-bordered w-full max-w-xs"
        aria-label="Number of columns"
      />
    </div>
  </div>

  <ArraysManipulative {rows} {columns} />
</div>
