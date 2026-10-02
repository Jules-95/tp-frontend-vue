import type { PokemonResume } from '@/types/pokemon'

// 1. La forme de la réponse de PokéAPI (seulement ce qu'on utilise)
interface PokemonApi {
  id: number
  name: string
  types: { type: { name: string } }[]
  stats: { base_stat: number }[]
}

// 2. Vérifier que la réponse a bien cette forme
function estPokemonApi(donnees: unknown): donnees is PokemonApi {
  return typeof donnees === 'object' && donnees !== null && 'id' in donnees && 'name' in donnees
}

// 3. Charger UN Pokémon et le traduire vers mon type
export async function chargerPokemon(id: number): Promise<PokemonResume> {
  const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const donnees: unknown = await reponse.json()

  if (!estPokemonApi(donnees)) throw new Error('Réponse inattendue de PokéAPI')

  return {
    id: donnees.id,
    nom: donnees.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${donnees.id}.png`,
    types: donnees.types.map((t) => t.type.name),
    stats: {
      pv: donnees.stats[0]?.base_stat ?? 0,
      attaque: donnees.stats[1]?.base_stat ?? 0,
      defense: donnees.stats[2]?.base_stat ?? 0,
      attaqueSpe: donnees.stats[3]?.base_stat ?? 0,
      defenseSpe: donnees.stats[4]?.base_stat ?? 0,
      vitesse: donnees.stats[5]?.base_stat ?? 0,
    },
  }
}

// 4. Charger PLUSIEURS Pokémon (du n°1 au n°nombre), tous en même temps
export async function chargerPokemons(nombre: number): Promise<PokemonResume[]> {
  const promesses: Promise<PokemonResume>[] = []
  for (let id = 1; id <= nombre; id++) {
    promesses.push(chargerPokemon(id))
  }
  return Promise.all(promesses)
}

