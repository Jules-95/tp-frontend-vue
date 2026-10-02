<script setup lang="ts">
import { storeToRefs } from "pinia";
import PokeCard from "@/components/PokeCard.vue";
import { useEquipeStore } from "@/stores/equipe";

const equipe = useEquipeStore();
const { membres } = storeToRefs(equipe);
</script>

<template>
  <h1 class="text-2xl font-bold">Mon équipe ({{ membres.length }}/6)</h1>

  <p v-if="membres.length === 0">
    Votre équipe est vide. Ajoutez des Pokémon depuis le Pokédex.
  </p>

  <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3">
    <PokeCard v-for="pokemon in membres" :key="pokemon.id" :pokemon="pokemon" />
  </div>
</template>
