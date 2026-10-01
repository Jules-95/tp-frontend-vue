// Déclaration d'interfaces qui décrivent les données 

// Les stats d'un pokemon - Objet avec des champs nommés 
export interface Stats {
    pv: number          //hp
    attaque: number
    defense: number
    attaqueSpe: number
    defenseSpe: number
    vitesse: number
}

// Résumé d'un pokemon - Les infos minimums pour l'affichage de tous les poke
export interface PokemonResume {
    id: number
    nom: string
    image: string // Url de l'image
    types: string[] // 2 types possibles
    stats: Stats

}


// Les attaques de la fiche détaillée. Le nom de l'att + le niv auquel le poke peut l'apprendre pour trier
export interface Attaque {
    nom: string 
    niveau: number
}

// Fiche détaillé = PokemonResume + le reste des info 
export interface PokemonDetails extends PokemonResume {
    taille: number
    poids: number
    attaques: Attaque[] 
}

//Poke de mon équipe 
export interface MembreEquipe {
    pokemon: PokemonDetails
    surnom: string
    niveau: number
}
