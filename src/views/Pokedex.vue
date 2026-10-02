<script setup lang="ts">
import PokeCard from "@/components/PokeCard.vue";
import type { PokemonResume } from "@/types/pokemon";

// Données temporaires en dur pour test
const pokemons: PokemonResume[] = [
  {
    id: 1,
    nom: "bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    types: ["grass", "poison"],
    stats: {
      pv: 45,
      attaque: 49,
      defense: 49,
      attaqueSpe: 65,
      defenseSpe: 65,
      vitesse: 45,
    },
  },
  {
    id: 4,
    nom: "charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    types: ["fire"],
    stats: {
      pv: 39,
      attaque: 52,
      defense: 43,
      attaqueSpe: 60,
      defenseSpe: 50,
      vitesse: 65,
    },
  },
  {
    id: 7,
    nom: "squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    types: ["water"],
    stats: {
      pv: 44,
      attaque: 48,
      defense: 65,
      attaqueSpe: 50,
      defenseSpe: 64,
      vitesse: 43,
    },
  },
  {
    id: 25,
    nom: "pikachu",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    types: ["electric"],
    stats: {
      pv: 35,
      attaque: 55,
      defense: 40,
      attaqueSpe: 50,
      defenseSpe: 50,
      vitesse: 90,
    },
  },
];
</script>

<template>
  <h1 class="text-2xl font-bold">Pokédex</h1>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
    <PokeCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
  </div>
</template>
