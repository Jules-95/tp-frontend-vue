<script setup lang="ts">
import Nav from "./components/Nav.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Nav />
    <main class="mx-auto max-w-3xl p-6">
      <RouterView />
    </main>
  </div>
</template>
