<script setup lang="ts">
import trending from "../assets/trending.json";
import MoviesSection from "./MoviesSection.vue";
</script>

<template>
  <MoviesSection title="Trending" :items="trending.results" />
</template>
