<script setup lang="ts">
import upcoming from "../assets/upcoming.json";
import MoviesSection from "./MoviesSection.vue";
</script>

<template>
  <MoviesSection title="Upcoming" :items="upcoming.results" />
</template>
