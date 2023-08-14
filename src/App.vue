<template>
  <the-header />
  <div class="router-wrap">
    <router-view />
  </div>
  <the-footer />
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";
</script>
