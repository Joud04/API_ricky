import axios from 'axios';

// Création de l'instance personnalisée
const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000, // 10 secondes avant d'abandonner
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  // On affiche un log dans la console pour le debug
  console.log(`[API Request] ${config.method?.toUpperCase()} -> ${config.baseURL}${config.url}`);
  
  // Très important : toujours retourner config sinon la requête est bloquée !
  return config;
}, (error) => {
  // Gestion des erreurs qui arrivent avant même l'envoi
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => {
    // En cas de succès (status entre 200 et 299)
    console.log(`[API Response] Succès: ${response.status}`);
    return response; 
  },
  (error) => {
    // En cas d'erreur (status hors 2xx ou problème réseau)
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur (ex: 404, 500)
      console.error(`[API Error] Status: ${error.response.status} - ${error.response.data?.error || 'Erreur Serveur'}`);
    } else if (error.request) {
      // La requête est partie mais pas de réponse (ex: problème Wifi)
      console.error(`[API Error] Réseau: Pas de réponse du serveur`);
    } else {
      // Erreur lors de la configuration de la requête
      console.error(`[API Error] Message: ${error.message}`);
    }

    // On rejette la promesse pour que le bloc catch dans ton composant soit aussi alerté
    return Promise.reject(error);
  }
);

export default apiClient;