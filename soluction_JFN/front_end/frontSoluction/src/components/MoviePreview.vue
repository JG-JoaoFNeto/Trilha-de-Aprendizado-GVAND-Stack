<script setup lang="ts">
import { computed } from "vue";

import ThumbUpIcon from "../assets/thumb-up.svg";
import ThumbDownIcon from "../assets/thumb-down.svg";
import Close from "../assets/close.svg";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { GET_MOVIE_PREVIEW } from "../graphql/queries/getMoviewPreview";
import { ADD_LIKE_MUTATION } from "../graphql/queries/addLikeMutation";

const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";

const props = defineProps<{
  id: string;
}>();

const emits = defineEmits<{
  (event: "close"): void;
}>();

const { result } = useQuery(GET_MOVIE_PREVIEW, { id: props.id });

const imageFullPath = computed(() => `${POSTER_PREFIX}${result.value?.preview.backdrop_path}`);

const year = computed(() => result.value?.preview.release_date.split("-")[0]);

const { mutate } = useMutation(ADD_LIKE_MUTATION, { 
  variables: { id: props.id },
  update: (cache, {}, { variables }) => {
    const id = variables!.id;

    cache.modify({
      id: cache.identify({ __typename: "Movie", id }),
      fields: {
        vote_count: (cachedValue) => {
          return cachedValue + 1;
        },
      },
    });
  },
});

</script>

<template>
  <div class="absolute justify-center flex top-0 left-0 w-full h-full">
    <div
      role="dialog"
      class="absolute w-2/3 drop-shadow-lg z-50 top-10 rounded-lg overflow-hidden bg-black"
      v-if="result?.preview"
    >
      <div class="relative overflow-hidden bg-black">
        <div class="w-full overflow-hidden pt-[calc(9/16*100%)]">
          <img
            :src="imageFullPath"
            :alt="result.title"
            class="absolute top-0 left-0"
          />
        </div>
      </div>
      <div class="px-10 py-5">
        <div class="mb-4 flex items-center">
          {{ year }}
          <span class="w-4"></span>
          <button @click="mutate(result.preview.id)">
            <ThumbUpIcon />
          </button>
          <span class="px-2 font-bold">{{ result.preview.vote_average }}</span>
          <button>
            <ThumbDownIcon />
          </button>
          <span class="pl-2">({{ result.preview.vote_count }})</span>
        </div>
        <h2 class="text-2xl font-bold mb-2">{{ result.preview.title }}</h2>
        <div>
          {{ result.preview.overview }}
        </div>
      </div>
      <button
        class="absolute top-2 right-2 w-12 h-12 rounded-full bg-black/40 flex items-center justify-center"
        @click="emits('close')"
      >
        <Close />
      </button>
    </div>
  </div>
  <div class="fixed top-0 left-0 h-full w-full bg-black opacity-70 z-30"></div>
</template>

<style></style>
