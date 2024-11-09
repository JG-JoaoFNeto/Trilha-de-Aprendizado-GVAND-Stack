<script setup lang="ts">
import { Movie } from "../typings/Movie";
import MoviePoster from "./MoviePoster.vue";

const props = withDefaults(
  defineProps<{
    title: string;
    items?: Movie[];
  }>(),
  { items: () => [] }
);

const emits = defineEmits<{
  (event: "selectMovie", movie: Movie): void;
}>();
</script>

<template>
  <div class="my-8 z-10 relative">
    <h2 class="text-xs font-bold text-gray-100 mx-4">{{ props.title }}</h2>
    <div class="overflow-x-auto mt-2 mx-4 movies-row whitespace-nowrap">
      <MoviePoster
        v-for="movie in props.items"
        :art="movie.backdrop_path"
        :title="movie.title"
        @click.prevent="emits('selectMovie', movie)"
      />
    </div>
  </div>
</template>

<style lang="css">
.movies-row::-webkit-scrollbar {
  @apply hidden;
}
</style>
