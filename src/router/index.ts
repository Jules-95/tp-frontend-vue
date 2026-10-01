import { createRouter, createWebHistory } from "vue-router";

import Pokedex from "@/views/Pokedex.vue";
import Fiche from "@/views/Fiche.vue";
import Equipe from "@/views/Equipe.vue";
import EditEquipe from "@/views/EditEquipe.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "pokedex",
      component: Pokedex,
    },
    {
      path: '/pokemon/:id',
      name: 'fiche',
      component: Fiche
    },
    {
      path: '/equipe',
      name: 'equipe',
      component: Equipe,
    },
    {
      path: '/equipe/:id/edit',
      name: 'editmembre',
      component: EditEquipe
    }
    
  ],
});

export default router;
