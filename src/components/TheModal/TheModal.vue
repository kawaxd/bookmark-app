<template>
  <div v-if="isModalOpen" class="modal">
    <div class="modal__content">
      <slot />
    </div>
    <div>
      <the-button @click="closeModal">{{ props.closeText }}</the-button>
      <the-button @click="confirmModal">{{ props.confirmText }}</the-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import TheButton from "@/components/TheButton/TheButton.vue";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
  confirmModal: {
    type: Function,
    required: true,
  },
  closeText: {
    type: String,
    default: "Cancel",
  },
  confirmText: {
    type: String,
    default: "Confirm",
  },
});
</script>

<style scoped lang="scss" src="./TheModal.scss"></style>
