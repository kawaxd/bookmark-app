<template>
  <footer class="footer">
    <div class="footer__content">
      <p class="footer__text">&copy; {{ currentYear }} Wojciech Kawa</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" src="./TheFooter.scss"></style>
