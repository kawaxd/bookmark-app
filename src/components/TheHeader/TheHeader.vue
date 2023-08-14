<template>
  <header class="header">
    <nav class="header__nav">
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="header__nav__link"
        >{{ route.name }}</router-link
      >
    </nav>
    <h1 class="header__title">My Bookmarks App</h1>
  </header>
</template>

<script setup lang="ts">
const routes = [
  { path: "/", name: "Home" },
  { path: "/new-collection", name: "New Collection" },
];
</script>

<style scoped lang="scss" src="./TheHeader.scss"></style>
