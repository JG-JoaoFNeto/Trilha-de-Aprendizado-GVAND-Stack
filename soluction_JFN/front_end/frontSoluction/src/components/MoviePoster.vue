<script setup lang="ts">
import { computed } from "vue";

const POSTER_PREFIX = "https://image.tmdb.org/t/p/w300";

const props = defineProps<{
  art: string;
  title: string;
}>();

const imageFullPath = computed(() => `${POSTER_PREFIX}${props.art}`);
</script>

<template>
  <div class="movie-poster">
    <a href="/" class="block">
      <div class="movie-art">
        <img
          :src="imageFullPath"
          :alt="props.title"
          class="absolute top-0 bottom-0 left-0 right-0 w-full cursor-pointer"
        />
        <div
          class="absolute bottom-0 left-0 right-0 pl-2 pr-2 pb-4 pt-1 bg-slate-900/25"
        >
          <p
            class="text-center font-bold text-sm text-ellipsis overflow-hidden"
          >
            {{ props.title }}
          </p>
        </div>
      </div>
    </a>
  </div>
</template>

<style>
@tailwind components;

@layer components {
  .movie-poster {
    @apply relative inline-block z-10 align-top;

    width: 25%;
    padding: 0 0.2vw;
  }

  .movie-art {
    @apply relative h-0 overflow-hidden w-full;

    padding-top: 56.333%;
    border-radius: 0.2vw;
  }
}
</style>
