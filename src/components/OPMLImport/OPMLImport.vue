<template>
  <the-button @click="openDialog">Import OPML</the-button>
</template>

<script setup lang="ts">
import TheButton from "@/components/TheButton/TheButton.vue";

import { useCollections } from "@/store/collections";

const collectionsStore = useCollections();

const openDialog = async () => {
  const opmlCode = prompt(
    "Please paste your OPML code exported from this app:"
  );

  if (opmlCode !== null && opmlCode.trim() !== "") {
    await collectionsStore.importOPML(opmlCode);
  }
};
</script>
