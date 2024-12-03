<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css"; // Adjust the path if necessary
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import logo from '$lib/images/mathsnacks.png'
  // import background from '$lib/images/background.jpg'
</script>

<div class="min-h-screen flex flex-col">
  <!-- Header or Navigation Bar (optional) -->
<header class="bg-base-200 p-4 shadow z-10">
  <div class="container flex items-center justify-between">
    <div class="flex items-center">
      <img src={logo} alt="Logo" class="h-12 w-auto mr-4" />
      <h1 class="text-2xl"><b>Mathsnacks</b> <i>Alpha v0.01</i></h1>
    </div>
    <h1 class="text-2xl text-right"><i>~Bite-size maths visuals for worksheets, presentations and quizzes~</i></h1>
  </div>
  <Breadcrumbs />
</header>

<!-- Main Content -->
<!-- <div class="flex-grow bg-cover bg-center" style="background-image: url({background})"> -->
<main class="container flex-grow mx-auto p-4 relative">
  <slot />
</main>

  <!-- Footer (optional) -->
  <footer class="bg-base-200 p-4 shadow mt-4">
    <div class="container mx-auto text-center">
      &copy; {new Date().getFullYear()} Mathsnacks. All rights reserved.
    </div>
  </footer>
</div>
