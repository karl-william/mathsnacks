<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { breadcrumbMap } from '../breadcrumbs';
  import { derived } from 'svelte/store';

  const currentPath = derived(page, ($page) => $page.url.pathname);

  let breadcrumbs = [];

  const generateBreadcrumbs = (path) => {
    const paths = path.split('/').filter(p => p);
    let cumulativePath = '';
    const crumbs = paths.map(segment => {
      cumulativePath += `/${segment}`;
      let name = breadcrumbMap[cumulativePath];

      // If name is not found in breadcrumbMap, use a default formatted name
      if (!name) {
        name = segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, char => char.toUpperCase());
      }

      return {
        name,
        path: cumulativePath
      };
    });

    // Always include Home as the first breadcrumb
    return [{ name: breadcrumbMap['/'] || 'Home', path: '/' }, ...crumbs];
  };

  const unsubscribe = currentPath.subscribe((path) => {
    breadcrumbs = generateBreadcrumbs(path);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ul>
    {#each breadcrumbs as crumb}
      <li><a href="{crumb.path}">{crumb.name}</a></li>
    {/each}
  </ul>
</nav>
