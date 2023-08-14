<template>
  <div class="creator-view">
    <div class="creator-view__stage">
      <h2 class="creator-view__title">Create a New Collection</h2>
      <form class="creator-view__form">
        <div class="creator-view__form-group">
          <label for="title" class="creator-view__label">Title:</label>
          <input
            id="title"
            v-model="collectionTitle"
            type="text"
            class="creator-view__input"
            required
          />
        </div>
        <div class="creator-view__form-group-buttons">
          <the-button
            type="submit"
            class="creator-view__button"
            @click="createCollection"
          >
            Create Collection
          </the-button>
          <span>or</span>
          <OPMLImport />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import { useCollections } from "@/store/collections";

import TheButton from "@/components/TheButton/TheButton.vue";
import OPMLImport from "@/components/OPMLImport/OPMLImport.vue";

import generateUUID from "@/utils/generateUUID";

const collectionsStore = useCollections();
const collectionTitle = ref<string>("");

const createCollection = (): void => {
  if (!collectionTitle.value) return;
  if (
    collectionsStore.collections.some(
      (collection: { title: string }) =>
        collection.title === collectionTitle.value
    )
  ) {
    confirm(
      "Collection with the same title already exists. Are you sure you want to create it?"
    );
  }

  const collectionId: string = generateUUID();
  collectionsStore.createCollection(collectionTitle.value, collectionId);
  router.push(`/edit/${collectionId}`);
};
</script>

<style scoped lang="scss" src="./CollectionsCreator.scss"></style>
