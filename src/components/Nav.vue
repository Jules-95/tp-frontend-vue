<script setup lang="ts">
import { NButton } from "naive-ui";
</script>

<template>
  <header class="border-b border-gray-200">
    <nav class="mx-auto flex max-w-3xl gap-2 p-4">
      <RouterLink
        :to="{ name: 'pokedex' }"
        custom
        v-slot="{ navigate, isActive }"
      >
        <NButton :type="isActive ? 'primary' : 'default'" @click="navigate"
          >Pokédex</NButton
        >
      </RouterLink>
      <RouterLink
        :to="{ name: 'equipe' }"
        custom
        v-slot="{ navigate, isActive }"
      >
        <NButton :type="isActive ? 'primary' : 'default'" @click="navigate"
          >Mon équipe</NButton
        >
      </RouterLink>
    </nav>
  </header>
</template>
