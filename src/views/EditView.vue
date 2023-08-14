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
import { useRoute, useRouter } from "vue-router";
import TheButton from "@/components/TheButton/TheButton.vue";

import generateUUID from "@/utils/generateUUID";
import isURL from "@/utils/isURL";
import isValidImage from "@/utils/isValidImage";
import DraggableList from "@/components/DraggableList/DraggableList.vue";

const collectionsStore = useCollections();
const route = useRoute();
const router = useRouter();

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
    favicon: (await isValidImage(`${trimmedUrl}/favicon.ico`))
      ? `${trimmedUrl}/favicon.ico`
      : require("@/assets/fallback.png"),
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

<style scoped lang="scss">
.edit-collection {
  padding: 30px;

  &__content {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    max-width: 600px;
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #007bff;
  }

  &__list {
    list-style: none;
    padding: 0;
  }

  &__item {
    margin-bottom: 15px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
  }

  &__bookmark {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__bookmark-info {
    display: flex;
    align-items: center;
  }

  &__favicon {
    max-width: 16px;
    max-height: 16px;
    margin-left: 10px;
  }

  &__no-bookmarks {
    margin-top: 10px;
  }

  &__form {
    margin-top: 20px;
  }

  &__form-group {
    margin-bottom: 15px;
  }

  &__label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  &__button {
    background-color: #007bff;
    color: #ffffff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
