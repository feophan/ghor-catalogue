// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: 'https://ghor-catalogue.vercel.app/',
  vite: {
  plugins: [tailwindcss()],
},
  integrations: [svelte()],
  output: 'static',
  adapter: vercel(),
});