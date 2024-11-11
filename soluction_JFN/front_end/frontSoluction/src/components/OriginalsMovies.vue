<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import originals from "../assets/originals.json";
import { GET_ORIGINALS_QUERY } from "../graphql/queries/getOriginals";
import MoviesSection from "./MoviesSection.vue";

import { OriginalsMovies } from "../typings/OriginalsMovies";
import { watchEffect,computed } from 'vue'

const { result,  loading, error } = useQuery<OriginalsMovies>(GET_ORIGINALS_QUERY,{
  mediaType: "movie"
});

// shuffleArray
const movie = computed(
  () =>  {
    return result.value?.originalsMovies.results
  }
);

watchEffect(() => {
  const t = Math.random(movie.value);
  console.log(t);
});

</script>

<template>
  <MoviesSection v-if="result && !loading && !error" title="Originals" :items="result.originalsMovies.results" />
</template>
