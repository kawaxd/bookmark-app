<template>
  <div class="edit-collection">
    <div class="edit-collection__content">
      <h2 class="edit-collection__title">
        Edit Collection: {{ collection?.title }}
      </h2>
      <div v-if="collection && collection?.bookmarks?.length > 0">
        <ul class="edit-collection__list">
          <draggable-list :collection="collection" />
        </ul>
      </div>
      <div v-else>
        <p class="edit-collection__no-bookmarks">
          No bookmarks in this collection.
        </p>
      </div>

      <form class="edit-collection__form">
        <div class="edit-collection__form-group">
          <h1>Add a new bookmark:</h1>
          <label for="bookmarkTitle" class="edit-collection__label"
            >Title:</label
          >
          <input
            id="bookmarkTitle"
            v-model.lazy="newTitle"
            type="text"
            required
            class="edit-collection__input"
          />
        </div>
        <div class="edit-collection__form-group">
          <label for="bookmarkUrl" class="edit-collection__label">URL:</label>
          <input
            id="bookmarkUrl"
            v-model.lazy="newUrl"
            type="url"
            required
            class="edit-collection__input"
          />
        </div>
        <the-button
          type="submit"
          class="edit-collection__button"
          @click.prevent="validateAndCreateBookmark()"
        >
          Add Bookmark
        </the-button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useCollections } from "@/store/collections";
import { useRoute } from "vue-router";
import TheButton from "@/components/TheButton/TheButton.vue";

import generateUUID from "@/utils/generateUUID";
import isURL from "@/utils/isURL";
import fetchFavicon from "@/utils/fetchFavicon";

import DraggableList from "@/components/DraggableList/DraggableList.vue";
import sanitizeAlphaNumericOnly from "@/utils/sanitizeAlphaNumericOnly";

const collectionsStore = useCollections();
const route = useRoute();

const collectionId = ref<string>("");
const newTitle = ref<string>("");
const newUrl = ref<string>("");

const collection = computed(() => {
  return collectionsStore.getCollectionById(collectionId.value);
});

watch(
  () => route.params.id,
  (id) => {
    collectionId.value = id as string;
  },
  { immediate: true }
);

const validateAndCreateBookmark = async () => {
  if (!newTitle.value) {
    alert("Title is required");
    return;
  }
  if (!sanitizeAlphaNumericOnly(newTitle.value)) {
    alert("Title can only contain letters and numbers");
    return;
  }
  if (!isURL(newUrl.value)) {
    alert("Invalid URL");
    return;
  }

  await createBookmark();
};

const createBookmark = async () => {
  const trimmedUrl = newUrl.value.replace(/\/$/, "");

  const bookmark = {
    id: generateUUID(),
    title: newTitle.value,
    url: trimmedUrl,
    favicon: await fetchFavicon(trimmedUrl),
  };

  try {
    await collectionsStore.addBookmark(collectionId.value, bookmark);
    newTitle.value = "";
    newUrl.value = "";
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};
</script>

<style scoped lang="scss" src="./CollectionsEditor.scss"></style>
