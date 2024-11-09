<script setup lang="ts">
import { ref } from "vue";

import OriginalMovies from "./components/OriginalsMovies.vue";
import TrendingMovies from "./components/TrendingMovies.vue";
import NowPlayingMovies from "./components/NowPlayingMovies.vue";
import PopularMovies from "./components/PopularMovies.vue";
import TopRatedMovies from "./components/TopRatedMovies.vue";
import UpcomingMovies from "./components/UpcomingMovies.vue";
import AppHero from "./components/AppHero.vue";
import AppHeader from "./components/AppHeader.vue";
import MoviePreview from "./components/MoviePreview.vue";
import { Movie } from "./typings/Movie";

const preview = ref<string | null>(null);

const onClosePreview = () => {
  preview.value = null;
};

const onChangePreview = (movie: Movie) => {
  preview.value = movie.id;

  window.scrollTo({ top: 0 });
};
</script>

<template>
  <AppHeader />
  <AppHero />
  <OriginalMovies @select-movie="onChangePreview" />
  <!-- <TrendingMovies @select-movie="onChangePreview" />
  <NowPlayingMovies @select-movie="onChangePreview" /> -->
  <PopularMovies @select-movie="onChangePreview" />
  <!-- <TopRatedMovies @select-movie="onChangePreview" />
  <UpcomingMovies @select-movie="onChangePreview" /> -->
  <MoviePreview
    v-if="preview"
    :id="preview"
    @close="onClosePreview"
  /> <!-- :image-url="preview.backdrop_path"
    :title="preview.title"
    :release-date="preview.release_date"
    :overview="preview.overview"
    :vote-average="preview.vote_average"
    :vote-count="preview.vote_count" -->
</template>

<style></style>
