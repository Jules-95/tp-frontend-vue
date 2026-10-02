<script setup lang="ts">
import { ref, onMounted } from "vue";
import PokeCard from "@/components/PokeCard.vue";
import { chargerPokemons } from "@/api/pokeapi";
import type { PokemonResume } from "@/types/pokemon";

const pokemons = ref<PokemonResume[]>([]);

onMounted(async () => {
  pokemons.value = await chargerPokemons(20);
});
</script>

<template>
  <h1 class="text-2xl font-bold">Pokédex</h1>

  <p v-if="pokemons.length === 0">Chargement…</p>

  <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
    <PokeCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
  </div>
</template>
