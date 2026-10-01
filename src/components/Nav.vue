<script setup lang="ts"></script>

<template>
  <header class="border-b border-gray-200">
    <nav class="mx-auto flex max-w-3xl gap-2 p-4">
      <RouterLink
        :to="{ name: 'pokedex' }"
        class="rounded bg-red-500 px-4 py-2 text-white"
      >
        Pokédex
      </RouterLink>
      <RouterLink
        :to="{ name: 'equipe' }"
        class="rounded bg-red-500 px-4 py-2 text-white"
      >
        Mon équipe
      </RouterLink>
    </nav>
  </header>
</template>
