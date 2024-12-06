<!-- src/routes/number-place-value/part-whole-model/+page.svelte -->
<script>
  import PartWholeModel from '$lib/components/PartWholeModel.svelte';
  import { onMount } from 'svelte';

  // State variables
  let wholeInput = ''; // Accepts strings: numbers, '=', '?', or empty
  let numberOfParts = 1; // Default to 1 part
  let partsInput = ['']; // Initialize with one part
  const maxParts = 5;
  let errorMessage = '';
  let calculated = false; // Flag to indicate if calculation occurred

  // Reference to the checkbox container
  let checkboxContainer;

  // Helper function to count how many '=' are present
  function countEquals() {
    let count = 0;
    if (wholeInput.trim() === '=') count++;
    partsInput.forEach(part => {
      if (part.trim() === '=') count++;
    });
    return count;
  }

  // Reactive statement to validate and calculate missing values
  $: {
    errorMessage = '';
    calculated = false;

    const equalsCount = countEquals();

    // Validate that only one '=' is present
    if (equalsCount > 1) {
      errorMessage = 'Only one field can be set to "=" for calculation.';
    } else {
      // Proceed if no more than one '='
      if (equalsCount === 1) {
        calculateMissing();
      } else {
        // No calculation needed, ensure visualization updates
      }
    }

    // Validate if sum equals whole when no '=' is present
    if (equalsCount === 0 && wholeInput !== '' && !partsInput.includes('?')) {
      const wholeVal = parseFloat(wholeInput);
      const partsVal = partsInput.map(p => parseFloat(p));
      if (!isNaN(wholeVal) && partsVal.every(p => !isNaN(p))) {
        const sum = partsVal.reduce((a, b) => a + b, 0);
        if (sum !== wholeVal) {
          errorMessage = `The sum of parts (${sum}) does not equal the whole (${wholeVal}).`;
        }
      }
    }
  }

  // Function to handle checkbox changes
  function handlePartSelection(event) {
    const { value, checked } = event.target;
    const selectedNumber = parseInt(value);

    if (checked) {
      numberOfParts = selectedNumber;
      // Adjust partsInput array based on selected number of parts
      if (selectedNumber > partsInput.length) {
        partsInput = [...partsInput, ...Array(selectedNumber - partsInput.length).fill('')];
      } else if (selectedNumber < partsInput.length) {
        partsInput = partsInput.slice(0, selectedNumber);
      }
      // Uncheck other checkboxes to ensure only one is selected
      const allCheckboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
      allCheckboxes.forEach(cb => {
        if (parseInt(cb.value) !== selectedNumber) {
          cb.checked = false;
        }
      });
    } else {
      // Prevent unchecking to ensure at least one part is selected
      if (numberOfParts === selectedNumber) {
        event.target.checked = true;
      }
    }
  }

  // Function to reset all fields to default values
  function resetValues() {
    wholeInput = '';
    numberOfParts = 1;
    partsInput = [''];
    errorMessage = '';
    calculated = false;
    // Reset checkboxes
    const allCheckboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(cb => {
      cb.checked = parseInt(cb.value) === 1;
    });
  }

  // Function to calculate missing whole or part
  function calculateMissing() {
    let newWhole = wholeInput.trim();
    let newParts = [...partsInput];

    if (wholeInput.trim() === '=') {
      // Calculate Whole
      const partsSum = partsInput.reduce((sum, part) => {
        const val = parseFloat(part);
        return sum + (isNaN(val) ? 0 : val);
      }, 0);
      newWhole = partsSum.toString();
      calculated = true;
    } else {
      // Check which part is '='
      const partIndex = partsInput.findIndex(part => part.trim() === '=');
      if (partIndex !== -1) {
        // Calculate this part
        const wholeVal = parseFloat(wholeInput);
        const otherPartsSum = partsInput.reduce((sum, part, idx) => {
          if (idx !== partIndex) {
            const val = parseFloat(part);
            return sum + (isNaN(val) ? 0 : val);
          }
          return sum;
        }, 0);
        const calculatedPart = (wholeVal - otherPartsSum).toString();
        newParts[partIndex] = calculatedPart;
        calculated = true;
      }
    }

    wholeInput = newWhole;
    partsInput = newParts;
  }

  // Function to handle input changes
  function handleInputChange(index, value, type) {
    if (type === 'whole') {
      wholeInput = value;
    } else if (type === 'part') {
      partsInput[index] = value;
    }
  }

  // Initialize with a blank model on mount
  onMount(() => {
    resetValues();
  });
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Part-Whole Model Manipulative</h1>

  <p class="mb-6">
    Define the whole number and its parts. You can input numbers, "=" to calculate a missing value, or "?" to leave it unknown.
  </p>

  <!-- Number of Parts Selection -->
  <div class="mb-6">
    <span class="label-text">Select Number of Parts:</span>
    <div class="flex flex-wrap gap-2 mt-2" bind:this={checkboxContainer}>
      {#each Array.from({ length: maxParts }, (_, i) => i + 1) as num}
        <label class="cursor-pointer label flex items-center">
          <input
            type="checkbox"
            value={num}
            on:change={handlePartSelection}
            class="checkbox checkbox-primary"
            checked={num === numberOfParts}
            aria-label={`${num} part`}
          />
          <span class="label-text ml-2">
            {num} Part{num > 1 ? 's' : ''}
          </span>
        </label>
      {/each}
    </div>
  </div>

  <!-- Whole Number Input -->
  <div class="mb-6">
    <label class="label" for="whole-number">
      <span class="label-text">Whole Number:</span>
    </label>
    <input
      id="whole-number"
      type="text"
      bind:value={wholeInput}
      on:input={(e) => handleInputChange(null, e.target.value, 'whole')}
      class="input input-bordered w-full max-w-xs"
      aria-label="Whole number"
      placeholder='Enter the whole number (e.g., "5", "=", "?")'
    />
  </div>

  <!-- Parts Input Fields -->
  <div class="mb-6">
    <span class="label-text">Enter Parts:</span>
    <div class="flex flex-col sm:flex-row sm:flex-wrap gap-4 mt-2">
      {#each Array.from({ length: numberOfParts }, (_, i) => i) as index}
        <div class="flex flex-col">
          <label class="label" for={`part-${index + 1}`}>
            <span class="label-text">Part {index + 1}:</span>
          </label>
          <input
            id={`part-${index + 1}`}
            type="text"
            bind:value={partsInput[index]}
            on:input={(e) => handleInputChange(index, e.target.value, 'part')}
            class="input input-bordered w-full sm:w-32"
            aria-label={`Part ${index + 1}`}
            placeholder={`Enter part ${index + 1} (e.g., "2", "=", "?")`}
          />
        </div>
      {/each}
    </div>
  </div>

  <!-- Error Message -->
  {#if errorMessage}
    <div class="alert alert-error shadow-lg mb-6" role="alert" aria-live="assertive">
      <div>
        <span>{errorMessage}</span>
      </div>
    </div>
  {/if}

  <!-- Action Buttons -->
  <div class="mb-6">
    <button
      class="btn btn-secondary"
      on:click={resetValues}
      aria-label="Reset to default values"
    >
      Reset
    </button>
  </div>

  <!-- Visualization Component -->
  <PartWholeModel whole={wholeInput} parts={partsInput} />
</div>

<style>
  .alert-error {
    background-color: #fee2e2;
    color: #b91c1c;
  }

  .checkbox.checkbox-primary:checked {
    border-color: #3b82f6;
    background-color: #3b82f6;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .flex {
      flex-direction: column !important;
    }

    .sm\:flex-row {
      flex-direction: column !important;
    }

    .sm\:w-32 {
      width: 100% !important;
    }
  }
</style>
