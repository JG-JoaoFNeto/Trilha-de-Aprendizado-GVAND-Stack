<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import originals from "../assets/originals.json";
import { GET_ORIGINALS_QUERY } from "../graphql/queries/getOriginals";
import MoviesSection from "./MoviesSection.vue";

const { result,  loading, error } = useQuery(GET_ORIGINALS_QUERY,{
  mediaType: "movie"
});

</script>

<template>
  <MoviesSection v-if="result && !loading && !error" title="Originals" :items="result.originalsMovies.results" />
</template>
