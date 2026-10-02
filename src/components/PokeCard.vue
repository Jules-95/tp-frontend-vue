<script setup lang="ts">
import { NCard, NTag } from 'naive-ui'
import type { PokemonResume } from '@/types/pokemon'

defineProps<{
  pokemon: PokemonResume
}>()
</script>

<template>
  <RouterLink :to="{ name: 'fiche', params: { id: pokemon.id } }" class="block">
    <NCard hoverable size="small" class="text-center">
      <img :src="pokemon.image" :alt="pokemon.nom" class="mx-auto h-24 w-24" />

      <p class="text-sm text-gray-500">#{{ pokemon.id }}</p>
      <h2 class="font-bold capitalize">{{ pokemon.nom }}</h2>

      <div class="my-2 flex justify-center gap-1">
        <NTag v-for="type in pokemon.types" :key="type" size="small" round>
          {{ type }}
        </NTag>
      </div>

      <ul class="text-sm">
        <li>PV : {{ pokemon.stats.pv }}</li>
        <li>Attaque : {{ pokemon.stats.attaque }}</li>
        <li>Défense : {{ pokemon.stats.defense }}</li>
      </ul>
    </NCard>
  </RouterLink>
</template>

