//Interface pour un personnage unique
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string; // URL de la photo
  url: string;
  created: string;
}

//Interface pour les infos de pagination (le champ "info" de l'API)
export interface ApiInfo {
  count: number;  // Nombre total de personnages
  pages: number;  // Nombre total de pages
  next: string | null; // URL de la page suivante
  prev: string | null; // URL de la page précédente
}

//Interface générique pour la réponse globale
// Le <T> permet de réutiliser cette structure pour n'importe quelle liste (Lieux, Épisodes, etc.)
export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}