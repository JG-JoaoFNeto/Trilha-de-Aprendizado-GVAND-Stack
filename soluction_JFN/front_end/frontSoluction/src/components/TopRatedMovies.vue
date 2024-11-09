<script setup lang="ts">
import topRated from "../assets/top_rated.json";
import MoviesSection from "./MoviesSection.vue";
</script>

<template>
  <MoviesSection title="Top rated" :items="topRated.results" />
</template>
