<template>
  <the-button @click="openDialog">Import OPML</the-button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import TheButton from "@/components/TheButton/TheButton.vue";

import { useCollections } from "@/store/collections";
import router from "@/router";

const collectionsStore = useCollections();

const props = defineProps({
  collectionId: {
    type: String,
    required: true,
  },
});

const openDialog = async () => {
  const opmlCode = prompt(
    "Please paste your OPML code exported from this app:"
  );

  if (!!opmlCode && opmlCode.trim() !== "") {
    try {
      await collectionsStore.importOPML(opmlCode);
      await router.push("/");
    } catch (error) {
      alert("Invalid OPML code");
      console.error("Error importing OPML:", error);
    }
  }
};
</script>
