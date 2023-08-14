<template>
  <div class="collections">
    <div v-if="!collections.length">
      <div class="collections-banner">
        <div class="collections-banner-content">
          <div class="collections-banner-image">
            <!-- @TODO: Change image -->
            <img
              src="https://placekitten.com/g/200/300"
              alt="Placeholder Image"
            />
          </div>
          <div class="collections-banner-text">
            <h2 class="collections-banner-title">Organize Your Bookmarks</h2>
            <p class="collections-banner-description">
              Create collections to easily manage and access your favorite
              links.
            </p>
            <the-button
              class="collections-banner-button"
              @click="createFirstCollection"
            >
              Create your first collection
            </the-button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(collection, index) in collections"
      :key="index"
      class="collections-collection"
    >
      <h2 class="collections-collection-title">{{ collection.title }}</h2>
      <collection-management :id="collection.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCollections } from "@/store/collections";
import { useRouter } from "vue-router";
import TheButton from "@/components/TheButton/TheButton.vue";
import CollectionManagement from "@/components/CollectionManagement/CollectionManagement.vue";

const collectionStore = useCollections();
const router = useRouter();

const collections = collectionStore.collections;

const createFirstCollection = () => {
  router.push("/new-collection");
};
</script>

<style scoped lang="scss" src="./DisplayCollections.scss"></style>
