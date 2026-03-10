import apiClient from './api.service';
import { ApiResponse, Character } from '../types/api.types';

/**
 * Service dédié à la récupération des données de Rick & Morty
 * On centralise l'appel ici pour que les composants ne connaissent pas l'URL
 */
export const getCharacters = async (): Promise<ApiResponse<Character>> => {
  // On appelle la route /character
  // Axios et notre instance se chargent de la baseURL et du timeout
  const response = await apiClient.get<ApiResponse<Character>>('/character');
  
  // On retourne l'objet complet (qui contient .info et .results)
  return response.data;
};