<script setup lang="ts">
import { computed } from "vue";

import PlayIcon from "../assets/play.svg";
import InfoIcon from "../assets/info.svg";
import originals from "../assets/originals.json";

const IMAGE_PATH_PREFIX = "https://image.tmdb.org/t/p/original";

const movie = computed(
  () => originals.results[Math.floor(Math.random() * originals.results.length)]
);
const imageFullPath = computed(
  () => `${IMAGE_PATH_PREFIX}${movie.value.backdrop_path}`
);
</script>

<template>
  <div class="hero">
    <div class="billboard">
      <div class="info absolute left-8 z-20 w-1/3">
        <div class="font-bold mb-4 text-4xl">{{ movie.title }}</div>
        <div class="description mb-4 text-sm text-ellipsis">
          {{ movie.overview }}
        </div>
        <div class="links flex flex-row">
          <a href="/">
            <button
              class="items-center flex bg-white rounded justify-center px-4 py-2 text-black mr-2"
            >
              <span class="icon h-6 w-6">
                <PlayIcon class="w-full h-full" />
              </span>
              <span class="w-2"></span>
              <span class="font-bold">Play</span>
            </button>
          </a>
          <a href="/">
            <button
              class="items-center flex rounded justify-center px-4 py-2 btn-secondary"
            >
              <span class="h-6 w-6">
                <InfoIcon class="w-full h-full" />
              </span>
              <span class="w-2"></span>
              <span>More info</span>
            </button>
          </a>
        </div>
      </div>
      <img
        loading="lazy"
        class="w-full"
        :src="imageFullPath"
        :alt="movie.title"
      />
    </div>
  </div>
</template>

<style>
.hero {
  @apply relative top-0 left-0 right-0;

  padding-bottom: 40%;
}

.billboard {
  @apply absolute w-full bg-black;

  height: 56.25vw;
}

.info {
  bottom: 40%;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-secondary {
  background-color: rgba(109, 109, 110, 0.7);
}
</style>
