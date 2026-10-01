# TP Vue 3 — Votre application

Deux jours pour construire une application Vue complète, sur un sujet choisi. Le sujet est libre, la liste des
fonctionnalités ne l'est pas : chaque fonctionnalité de la liste doit servir à quelque chose de réel dans
l'application.

Objectif : l'application la plus poussée possible, qui utilise tout ce que Vue, Vue Router, Pinia et Naive UI
savent faire.

Aperçu du sujet dans VS Code : clic droit sur `SUJET.md` → Ouvrir l'aperçu.

---

## La stack, imposée

| Brique | Rôle |
|---|---|
| **Vue 3** en `<script setup lang="ts">` | Tous les composants. Aucune Options API (`export default { data() … }`) |
| **TypeScript** strict | Tout le code. `any` interdit |
| **Vue Router** | Un écran par adresse |
| **Pinia**, syntaxe setup | L'état partagé entre écrans |
| **Naive UI** | Les composants d'interface : boutons, champs, tableaux, messages, fenêtres |
| **Tailwind CSS** | La mise en page : grilles, marges, responsive |
| **Vitest** | Les tests, dans « Aller plus loin » |

Tout est déjà installé dans le gabarit.

## Commandes

| Commande | Rôle |
|---|---|
| `npm install` | Installer le projet (une fois). Node 22.22 ou plus (ou 24.15 et plus) |
| `npm run dev` | Lancer l'application |
| `npm run exigences` | Lister les fonctionnalités repérées dans `src/` |
| `npm run type-check` | Vérifier les types. Doit finir sans erreur |
| `npm run test:unit` | Lancer les tests en continu |

`npm run exigences` repère la syntaxe, pas l'usage. Un `OK` ne vaut rien sans vrai cas d'usage dans
`EXIGENCES.md`.

---

## 1. Choisir le sujet

1. Choisir une application utile à quelqu'un : un outil, un catalogue, un suivi, un tableau de bord.
2. Vérifier qu'elle a de quoi remplir la liste : plusieurs écrans, une liste avec détail, un formulaire, des
   données partagées entre écrans, un chargement asynchrone.
3. Choisir la source des données :
   1. une API publique sans clé (voir le tableau) ;
   2. ou des données en dur dans `src/data/`, servies par une fonction `async` qui attend un court délai
      (`setTimeout` dans une `Promise`) pour simuler le réseau.
4. Faire valider le sujet par le formateur avant d'écrire du code.

API publiques sans clé, testées le 01/10/2026 :

| API | Idée d'application | Exemple d'appel |
|---|---|---|
| PokéAPI | Pokédex, constructeur d'équipe | `https://pokeapi.co/api/v2/pokemon/pikachu` |
| Open Library | Bibliothèque perso, liste de lecture | `https://openlibrary.org/search.json?q=dune` |
| TheMealDB | Carnet de recettes, liste de courses | `https://www.themealdb.com/api/json/v1/1/search.php?s=tart` |
| Open-Meteo | Météo de villes favorites | `https://api.open-meteo.com/v1/forecast?latitude=47.39&longitude=0.69&current=temperature_2m` |
| API Géo (geo.api.gouv.fr) | Explorateur de communes | `https://geo.api.gouv.fr/communes?nom=Tours&fields=nom,population` |
| TVmaze | Suivi de séries | `https://api.tvmaze.com/search/shows?q=lost` |

Sans API : gestionnaire de tâches en kanban, suivi de séances de sport, gestion de budget, réservation de salles,
inventaire d'une collection.

---

## 2. Les règles

1. `<script setup lang="ts">` dans chaque fichier `.vue`.
2. `any` interdit. Donnée de forme inconnue (réponse d'API) : `unknown`, puis vérification.
3. `v-html` interdit.
4. Les types métier dans `src/types/`, importés partout.
5. Naive UI pour les composants d'interface, Tailwind pour la mise en page. Pas de CSS écrit à la main sauf besoin
   précis.
6. Un vrai cas d'usage pour chaque fonctionnalité. Un `watch` qui fait un `console.log`, un composant qui ne sert
   qu'à cocher la case : refusé.
7. Commit à chaque fonctionnalité qui marche.

---

## 3. Les fonctionnalités à utiliser

Les numéros sont ceux de `npm run exigences` et de `EXIGENCES.md`.

### Les composants

| N° | Fonctionnalité | Ce qui compte comme un vrai usage |
|---|---|---|
| 1 | `<script setup lang="ts">` partout | Aucune exception |
| 2 | Au moins 6 composants `.vue` | Un découpage de maquette, pas des fichiers vides |
| 3 | `v-if`, `v-else-if`, `v-else` | Plusieurs états d'un même écran (vide, chargement, résultat) |
| 4 | `v-for` avec `:key` | Une liste, clé tirée des données, jamais l'index |
| 5 | `defineProps` typé | Un composant qui reçoit ses données du parent |
| 6 | `defineEmits` typé | Un enfant qui prévient le parent |
| 7 | Un slot | Un composant conteneur (carte, panneau) au contenu variable |
| 8 | `defineModel` | Un composant de saisie maison utilisé avec `v-model` |

### La réactivité

| N° | Fonctionnalité | Ce qui compte comme un vrai usage |
|---|---|---|
| 9 | `ref` | Une valeur qui change à l'écran |
| 10 | `reactive` | Un objet à plusieurs champs, un formulaire par exemple |
| 11 | `computed` | Filtre, tri, total, compteur : tout état dérivé |
| 12 | `watch` | Un effet de bord : relancer une recherche, sauvegarder, changer le titre de la page |
| 13 | `onMounted` **et** `onUnmounted` | Un écouteur ou une minuterie posé, puis retiré |
| 14 | Un composable `useXxx()` dans `src/composables/` | Une logique réutilisée par au moins deux composants, ou sortie d'un composant trop long |

### Vue Router

| N° | Fonctionnalité | Ce qui compte comme un vrai usage |
|---|---|---|
| 15 | Au moins 4 routes nommées, dont une avec paramètre | `/element/:id` pour une fiche détail |
| 16 | `useRoute()` | Lire le paramètre de la fiche détail |
| 17 | `useRouter().push` | Naviguer après une action (enregistrement, choix) |

### Pinia

| N° | Fonctionnalité | Ce qui compte comme un vrai usage |
|---|---|---|
| 18 | Un store, syntaxe setup | L'état métier de l'application |
| 19 | Un store utilisé par au moins 2 vues | Une donnée vraiment partagée |
| 20 | `storeToRefs` | Déstructurer un store sans perdre la réactivité |
| 21 | Action asynchrone, état en union | `{ statut: "chargement" } \| { statut: "succes", … } \| { statut: "erreur", message }`, affiché dans le template |

### Naive UI et Tailwind

| N° | Fonctionnalité | Ce qui compte comme un vrai usage |
|---|---|---|
| 22 | `NDataTable`, colonnes typées | `DataTableColumns<MonType>` ; `:scroll-x` pour que le tableau défile à 320 px au lieu d'écraser ses colonnes |
| 23 | `NForm` avec règles | Validation avant enregistrement, erreurs affichées |
| 24 | `useMessage` | Confirmer une action réussie ou échouée |
| 25 | Tailwind responsive | `sm:`, `md:`, `lg:` ; utilisable à 320 px de large |

### La qualité

| N° | Fonctionnalité | Ce qui compte comme un vrai usage |
|---|---|---|
| 26 | Aucun `any`, aucun `v-html` | — |

`npm run type-check` doit finir sans erreur.

---

## 4. Aller plus loin

Une fois la liste couverte, pousser l'application. Pistes :

1. Les tests : un test Vitest du store, un test d'un composant (`npm run test:unit`).
2. Persister les données de l'utilisateur dans `localStorage`.
3. Une page 404 (`/:pathMatch(.*)*`) et le chargement des pages à la demande (`component: () => import(...)`).
4. `NConfigProvider` en français (`frFR`, `dateFrFR`), puis le thème sombre avec `darkTheme`, choix mémorisé.
5. `NModal` ou `useDialog` pour confirmer une action destructrice.
6. Un slot nommé, `v-show`, un `:class` dynamique, un modificateur d'événement (`@submit.prevent`, `@keyup.enter`).
7. Un deuxième store pour un autre domaine de l'application.
8. `watchEffect`, et la différence avec `watch`.
9. `provide` / `inject` pour passer une donnée à un composant lointain sans store.
10. `useTemplateRef` pour donner le focus à un champ.
11. `<Transition>` et `<TransitionGroup>` sur une liste ; `<Teleport>` pour une fenêtre maison.
12. Un garde de navigation `router.beforeEach` (écran réservé, formulaire non enregistré).
13. Un faux serveur avec `json-server`, et les écritures (`POST`, `DELETE`) qui vont avec.

Noter dans `EXIGENCES.md`, section « Plus loin », ce qui a été ajouté.

---

## 5. Les jalons

| Jalon | À montrer au formateur |
|---|---|
| 1 | Le sujet, la liste des écrans, l'arbre des composants dessiné sur papier |
| 2 | Les écrans et le routeur, les composants avec props et événements (1 à 8, 15 à 17) |
| 3 | La réactivité, le store, l'asynchrone (9 à 14, 18 à 21) |
| 4 | Naive UI et Tailwind (22 à 26), puis « Aller plus loin » |

---

## 6. Le rendu

1. Le dépôt Git, commits compris.
2. `EXIGENCES.md` rempli : pour chaque numéro, le fichier, la ligne et le cas d'usage en une phrase.
3. Une démonstration de l'application : le parcours principal, puis trois fonctionnalités au choix du formateur,
   code ouvert.

Avant d'appeler le formateur :

1. `npm run exigences` : tout est `OK`.
2. `npm run type-check` : zéro erreur.
3. L'application tient à 320 px de large.
