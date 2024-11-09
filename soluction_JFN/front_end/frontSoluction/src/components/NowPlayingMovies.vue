<script setup lang="ts">
import nowPlaying from "../assets/now_playing.json";
import MoviesSection from "./MoviesSection.vue";
</script>

<template>
  <MoviesSection title="Now playing" :items="nowPlaying.results" />
</template>
