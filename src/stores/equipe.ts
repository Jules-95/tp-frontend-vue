import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { PokemonResume } from "@/types/pokemon";

export const useEquipeStore = defineStore("equipe", () => {
  // Les Pokémon de mon équipe
  const membres = ref<PokemonResume[]>([]);

  // Vrai quand l'équipe a 6 Pokémon
  const fullTeam = computed(() => membres.value.length >= 6);

  // Ajoute un Pokémon. Renvoie true si c'est fait, false sinon
  function ajouter(pokemon: PokemonResume): boolean {
    if (fullTeam.value) return false;
    if (membres.value.some((p) => p.id === pokemon.id)) return false;
    membres.value.push(pokemon);
    return true;
  }

  // Retirer un poke de l'equipe (selon id)
  function retirer(id: number) {
    membres.value = membres.value.filter((p) => p.id !== id);
  }

  return { membres, fullTeam, ajouter, retirer };
});
