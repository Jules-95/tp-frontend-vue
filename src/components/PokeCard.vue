<script setup lang="ts">
import type { PokemonResume } from "@/types/pokemon";

// Le composant reçoit un Pokémon de son parent
defineProps<{
  pokemon: PokemonResume;
}>();
</script>

<template>
    <RouterLink
    :to="{ name: 'fiche', params: { id: pokemon.id } }"
    class="block rounded-lg border border-gray-200 p-3 text-center"
  >

    <img :src="pokemon.image" :alt="pokemon.nom" class="mx-auto h-24 w-24" />

    <p class="text-sm text-gray-500">#{{ pokemon.id }}</p>
    <h2 class="font-bold capitalize">{{ pokemon.nom }}</h2>

    <p class="text-sm">{{ pokemon.types.join(" / ") }}</p>

    <ul class="mt-2 text-sm">
      <li>PV : {{ pokemon.stats.pv }}</li>
      <li>Attaque : {{ pokemon.stats.attaque }}</li>
      <li>Défense : {{ pokemon.stats.defense }}</li>
    </ul>
</RouterLink>
</template>
