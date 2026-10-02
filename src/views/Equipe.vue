<script setup lang="ts">
import { storeToRefs } from "pinia";
import PokeCard from "@/components/PokeCard.vue";
import { useEquipeStore } from "@/stores/equipe";

import { NButton } from "naive-ui";

const equipe = useEquipeStore();
const { membres } = storeToRefs(equipe);
</script>

<template>
  <h1 class="text-2xl font-bold">Mon équipe ({{ membres.length }}/6)</h1>

  <p v-if="membres.length === 0">
    Votre équipe est vide. Ajoutez des Pokémon depuis le Pokédex.
  </p>

  <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3">
    <div
      v-for="pokemon in membres"
      :key="pokemon.id"
      class="flex flex-col gap-2"
    >
      <PokeCard :pokemon="pokemon" />
      <NButton size="small" type="error" @click="equipe.retirer(pokemon.id)">
        Retirer
      </NButton>
    </div>
  </div>
</template>
