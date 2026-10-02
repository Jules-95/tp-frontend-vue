<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const nom = ref("");
const route = useRoute();

onMounted(async () => {
  const reponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${route.params.id}`,
  );

  const donnees = await reponse.json();
  nom.value = donnees.name;
});
</script>

<template>
  <h1 class="text-2xl font-bold">{{ nom }}</h1>
</template>
