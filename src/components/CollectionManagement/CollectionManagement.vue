<template>
  <div class="collection-management">
    <the-button @click="editCollection(idComputed)"> 📓 Edit/View </the-button>
    <the-button @click="exportToOPML(idComputed)">
      📁 Export to OPML
    </the-button>
    <the-button bg-color="red" @click="deleteCollection(idComputed)"
      >🗑️ Remove collection
    </the-button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";

import TheButton from "@/components/TheButton/TheButton.vue";
import { useCollections } from "@/store/collections";

const collectionStore = useCollections();
const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// @TODO: Possible refactor?
const idComputed: string = computed(() => props.id) as unknown as string;

const editCollection = (id: string) => {
  router.push(`/edit/${id}`);
};
const deleteCollection = async (id: string) => {
  if (confirm("Are you sure?")) {
    await collectionStore.deleteCollection(id);
  }
};

const exportToOPML = async (id: string) => {
  await collectionStore.exportToOPML(id);
};
</script>

<style scoped lang="scss" src="./CollectionManagement.scss"></style>
