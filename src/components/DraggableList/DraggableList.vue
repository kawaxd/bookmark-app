<template>
  <div class="list">
    <vue-draggable-next
      :list="displayedItems"
      class="list__draggable"
      @change="handleDragChange"
    >
      <transition-group>
        <div
          v-for="bookmark in displayedItems"
          :key="bookmark.id"
          class="list__item"
        >
          <div class="list__item-icon">
            <img
              :src="bookmark.favicon"
              :alt="bookmark.title"
              class="list__item-favicon"
            />
          </div>
          <a :href="bookmark.url" target="_blank" class="list__item-link">
            {{ bookmark.title }}
          </a>
          <!--          @TODO: This possibly needs to be refactored into a component-->
          <div class="list__item-buttons">
            <the-button @click="editUrl(bookmark.id)">Edit url</the-button>
            <the-button @click="editTitle(bookmark.id)">Edit title</the-button>
            <the-button bg-color="red" @click="removeBookmark(bookmark.id)"
              >Delete</the-button
            >
          </div>
        </div>
      </transition-group>
    </vue-draggable-next>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

import { useCollections } from "@/store/collections";
import { IBookmark, ICollection } from "@/types";

import isURL from "@/utils/isURL";

import TheButton from "@/components/TheButton/TheButton.vue";
import fetchFavicon from "@/utils/fetchFavicon";

const props = defineProps({
  collection: {
    type: Object as () => ICollection,
    required: true,
  },
});

const collections = useCollections();

const displayedItems = computed(() => {
  return props.collection ? [...props.collection.bookmarks] : [];
});

const handleDragChange = () => {
  if (props.collection) {
    collections.moveBookmarks(props.collection.id, displayedItems.value);
  }
};

const removeBookmark = (bookmarkId: string) => {
  if (
    props.collection &&
    confirm("Are you sure you want to delete this bookmark?")
  ) {
    collections.removeBookmark(props.collection.id, bookmarkId);
  }
};

const editUrl = async (bookmarkId: string) => {
  const collection = props.collection;
  if (!collection) {
    console.error("Collection is missing.");
    return;
  }

  const oldBookmark = collection.bookmarks.find(
    (bookmark) => bookmark.id === bookmarkId
  );

  if (!oldBookmark) {
    console.error("Bookmark not found.");
    return;
  }

  const newUrl = prompt("Enter new bookmark URL");
  if (newUrl !== null) {
    if (!isURL(newUrl)) {
      alert("Invalid URL");
      return;
    }

    const updatedBookmark = {
      id: bookmarkId,
      favicon: await fetchFavicon(newUrl),
      url: newUrl,
      title: oldBookmark.title,
    } as IBookmark;

    await collections.editBookmark(collection.id, bookmarkId, updatedBookmark);
  }
};

const editTitle = (bookmarkId: string) => {
  editBookmark(bookmarkId, "title");
};

const editBookmark = (bookmarkId: string, field: string) => {
  const collection = props.collection;
  if (!collection) {
    console.error("Collection is missing.");
    return;
  }

  const oldBookmark = collection.bookmarks.find(
    (bookmark) => bookmark.id === bookmarkId
  );

  if (!oldBookmark) {
    console.error("Bookmark not found.");
    return;
  }

  let newFieldValue: string | null = null;
  if (field === "title") {
    newFieldValue = prompt("Enter new bookmark title");
  }

  if (newFieldValue !== null && (field === "title" || !isURL(newFieldValue))) {
    const updatedBookmark = {
      id: bookmarkId,
      favicon: oldBookmark.favicon,
      url: oldBookmark.url,
      title: newFieldValue,
    } as IBookmark;

    collections.editBookmark(collection.id, bookmarkId, updatedBookmark);
  }
};
</script>

<style scoped lang="scss" src="./DraggableList.scss"></style>
