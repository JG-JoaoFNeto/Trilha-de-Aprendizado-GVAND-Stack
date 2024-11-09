<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import popular from "../assets/popular.json";
import { GET_POPULAR_QUERY } from "../graphql/queries/getPopular";
import MoviesSection from "./MoviesSection.vue";

const { result } = useQuery(GET_POPULAR_QUERY);


</script>  

<template>
  <MoviesSection v-if="result?.popularMovies" :items="result.popularMovies.results" title="Popular "  />
</template>
