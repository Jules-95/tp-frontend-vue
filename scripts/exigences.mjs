// Repère dans src/ les fonctionnalités Vue demandées par le sujet.
// Détection par motifs : « trouvé » veut dire que la syntaxe est présente, pas que l'usage est bon.
// Le vrai contrôle, c'est EXIGENCES.md (fichier, ligne, cas d'usage) relu par le formateur.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const racine = new URL('../src/', import.meta.url).pathname

const lister = (dossier) =>
  readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom)
    return statSync(chemin).isDirectory() ? lister(chemin) : [chemin]
  })

const fichiers = lister(racine)
  .filter((f) => /\.(vue|ts)$/.test(f))
  .map((f) => ({ nom: relative(racine, f), texte: readFileSync(f, 'utf8') }))

const tests = fichiers.filter((f) => /__tests__|\.spec\.ts$|\.test\.ts$/.test(f.nom))
const code = fichiers.filter((f) => !tests.includes(f))
const vues = code.filter((f) => f.nom.endsWith('.vue'))
const gabarits = vues.map((f) => (f.texte.match(/<template>[\s\S]*<\/template>/) ?? [''])[0]).join('\n')
const tout = code.map((f) => f.texte).join('\n')
const stores = code.filter((f) => /defineStore\s*\(/.test(f.texte))
// Les routes : le dossier router/, ou tout fichier qui crée le routeur ou déclare des RouteRecordRaw.
const routeurs = code.filter((f) => f.nom.startsWith('router/') || /createRouter\s*\(|RouteRecordRaw/.test(f.texte)).map((f) => f.texte).join('\n')

// <script setup lang="ts">, attributs dans n'importe quel ordre.
const scriptSetupTs = /<script(?=[^>]*\ssetup[\s>])(?=[^>]*\slang=["']ts["'])[^>]*>/
// router.push(...) sur la variable tirée de useRouter(), ou useRouter().push(...) direct.
const pousseLeRouteur = (texte) => {
  const nom = (texte.match(/(?:const|let)\s+(\w+)\s*=\s*useRouter\s*\(\s*\)/) ?? [])[1]
  return /useRouter\s*\(\s*\)\.push\s*\(/.test(texte) || (nom !== undefined && new RegExp(`\\b${nom}\\.push\\s*\\(`).test(texte))
}

const compter = (texte, motif) => (texte.match(motif) ?? []).length
const vuesQuiUtilisent = (motif) => vues.filter((f) => motif.test(f.texte)).length

// Chaque exigence : [numéro, intitulé, trouvé ?]. Numéros identiques à ceux de SUJET.md et EXIGENCES.md.
const exigences = [
  ['Les composants'],
  [1, '<script setup lang="ts"> dans chaque .vue, aucune Options API',
    vues.length > 0 && vues.every((f) => scriptSetupTs.test(f.texte) && !/export default\s*\{/.test(f.texte))],
  [2, 'Au moins 6 composants .vue', vues.length >= 6],
  [3, 'v-if, v-else-if et v-else', /\sv-if=/.test(gabarits) && /\sv-else-if=/.test(gabarits) && /\sv-else[\s>]/.test(gabarits)],
  [4, 'v-for avec :key', /\sv-for=[^>]*:key=|:key=[^>]*\sv-for=/.test(gabarits)],
  [5, 'defineProps typé', /defineProps\s*<\s*\{/.test(tout)],
  [6, 'defineEmits typé', /defineEmits\s*<\s*\{/.test(tout)],
  [7, 'Un slot', /<slot[\s/>]/.test(gabarits)],
  [8, 'defineModel', /defineModel\s*[<(]/.test(tout)],
  ['La réactivité'],
  [9, 'ref', /\bref\s*[<(]/.test(tout)],
  [10, 'reactive', /\breactive\s*[<(]/.test(tout)],
  [11, 'computed', /\bcomputed\s*[<(]/.test(tout)],
  [12, 'watch', /\bwatch\s*\(/.test(tout)],
  [13, 'onMounted et onUnmounted', /\bonMounted\s*\(/.test(tout) && /\bonUnmounted\s*\(/.test(tout)],
  [14, 'Un composable use…() dans src/composables/', code.some((f) => f.nom.startsWith('composables/') && /export\s+(function\s+use[A-Z]|const\s+use[A-Z]\w*\s*=)/.test(f.texte))],
  ['Vue Router'],
  [15, 'Au moins 4 routes nommées, dont une avec paramètre', compter(routeurs, /\bname:\s*['"]/g) >= 4 && /path:\s*['"][^'"]*\/:[\w]+/.test(routeurs)],
  [16, 'useRoute pour lire un paramètre', /\buseRoute\s*\(/.test(tout)],
  [17, 'useRouter().push', code.some((f) => pousseLeRouteur(f.texte))],
  ['Pinia'],
  [18, 'Un store en syntaxe setup', stores.length >= 1 && stores.every((f) => /defineStore\s*\([^,]+,\s*\(\s*\)\s*=>/.test(f.texte))],
  [19, 'Un store utilisé par au moins 2 vues', stores.some((s) => {
    const fn = (s.texte.match(/export const (use\w+Store)/) ?? [])[1]
    return fn !== undefined && vuesQuiUtilisent(new RegExp(`\\b${fn}\\s*\\(`)) >= 2
  })],
  [20, 'storeToRefs', /\bstoreToRefs\s*\(/.test(tout)],
  [21, 'Action asynchrone avec état en union (chargement, succès, erreur)',
    stores.some((f) => /async\s+function|async\s*\(/.test(f.texte) && /statut:\s*['"]/.test(f.texte))],
  ['Naive UI et Tailwind'],
  [22, 'NDataTable avec colonnes typées', /<NDataTable|<n-data-table/.test(gabarits) && /DataTableColumns\s*</.test(tout)],
  [23, 'NForm avec règles de validation', /<NForm|<n-form/.test(gabarits) && /FormRules/.test(tout)],
  [24, 'useMessage', /\buseMessage\s*\(/.test(tout)],
  [25, 'Tailwind responsive (sm:, md:, lg:)', /class="[^"]*\b(sm|md|lg):/.test(gabarits)],
  ['La qualité'],
  [26, 'Aucun any, aucun v-html', !/(:|<|,|\bas)\s*any\b/.test(tout) && !/\sv-html=/.test(gabarits)],
]

const lignes = exigences.filter((e) => e.length === 3)
const faites = lignes.filter(([, , ok]) => ok).length

for (const e of exigences) {
  if (e.length === 1) {
    console.log(`\n${e[0]}`)
    continue
  }
  const [n, intitule, ok] = e
  console.log(`  ${ok ? 'OK     ' : 'À FAIRE'}  ${String(n).padStart(2)}. ${intitule}`)
}
console.log(`\n${faites} / ${lignes.length} trouvées dans src/.`)
console.log('Trouvé ne veut pas dire validé : chaque ligne doit avoir un vrai cas d\'usage, noté dans EXIGENCES.md.')
console.log('Reste à lancer : npm run type-check (zéro erreur).')
