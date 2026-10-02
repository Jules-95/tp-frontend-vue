<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { NPagination, NButton } from "naive-ui";
import PokeCard from "@/components/PokeCard.vue";
import { chargerPokemons } from "@/api/pokeapi";

import { useEquipeStore } from "@/stores/equipe";

import type { PokemonResume } from "@/types/pokemon";

const equipe = useEquipeStore();
const pokemons = ref<PokemonResume[]>([]);

// Pagination
const page = ref(1);
const pokeParPage = 20;

const pokeAffiche = computed(() =>
  pokemons.value.slice(
    (page.value - 1) * pokeParPage,
    page.value * pokeParPage,
  ),
);

// Nombre de pages
const nombrePages = computed(() =>
  Math.ceil(pokemons.value.length / pokeParPage),
);

onMounted(async () => {
  pokemons.value = await chargerPokemons(151);
});
</script>

<template>
  <h1 class="text-2xl font-bold">Pokédex</h1>

  <p v-if="pokemons.length === 0">Chargement…</p>

  <div v-else>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <div
        v-for="pokemon in pokeAffiche"
        :key="pokemon.id"
        class="flex flex-col gap-2"
      >
        <PokeCard :pokemon="pokemon" />
        <NButton size="small" @click="equipe.ajouter(pokemon)">
          Ajouter dans l'équipe
        </NButton>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <NPagination v-model:page="page" :page-count="nombrePages" />
    </div>
  </div>
</template>
