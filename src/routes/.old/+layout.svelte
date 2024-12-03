<!-- src/routes/+layout.svelte -->
<script>
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<div class="min-h-screen flex flex-col">
  <!-- Header or Navigation Bar (optional) -->
  <header class="bg-base-200 p-4 shadow">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold">Math Manipulatives</h1>
    </div>
  </header>

  <!-- Breadcrumbs -->
  <Breadcrumbs />

  <!-- Main Content -->
  <main class="flex-grow container mx-auto p-4">
    <slot />
  </main>

  <!-- Footer (optional) -->
  <footer class="bg-base-200 p-4 shadow mt-4">
    <div class="container mx-auto text-center">
      &copy; {new Date().getFullYear()} Math Manipulatives. All rights reserved.
    </div>
  </footer>
</div>
