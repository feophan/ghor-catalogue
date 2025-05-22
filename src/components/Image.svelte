<script lang="ts">
  import { onMount } from 'svelte';
  import mediumZoom from 'medium-zoom';

  export let src: string;
  export let alt: string = '';
  export let className: string = 'max-w-full shadow cursor-zoom-in';

  let imageEl: HTMLImageElement;

  onMount(() => {
    mediumZoom(imageEl, {
      background: 'rgba(0, 0, 0, 0.8)',
      margin: 24
    });
  });
</script>

<img bind:this={imageEl} src={src} alt={alt} class={className} width="50" />