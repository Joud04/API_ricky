import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import { getCharacters } from '../services/rickmorty.service'; // Ton nouveau service
import { Character } from '../types/api.types'; // Tes types
import CharacterCard from '../components/CharacterCard'; // Ton composant de carte

export default function CharacterListScreen() {
  //Mise en place des trois états locaux
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  //Utilisation de useEffect pour l'appel au montage
  useEffect(() => {
    const loadData = async () => {
      try {
        //Appel de la fonction centralisée
        const data = await getCharacters();
        setCharacters(data.results);
      } catch (err: any) {
        //Gestion de l'échec
        setError("Erreur lors de la récupération des personnages.");
      } finally {
        //Passage de isLoading à false (succès ou échec)
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

//Condition de chargement : On affiche le spinner
    if (isLoading) {
        return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text>Chargement des personnages...</Text>
        </View>
        );
    }

    if (error) {
        return (
        <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
        </View>
        );
    }

    // ● Si isLoading est faux et qu'il n'y a pas d'erreur, on retourne la FlatList
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Rick & Morty Universe</Text>

        <FlatList
            // ● On passe le tableau characters récupéré via l'API
            data={characters}
            
            // ● On indique que l'identifiant unique est l'ID (en string)
            keyExtractor={(item) => item.id.toString()}
            
            // ● On utilise le composant CharacterCard pour chaque élément
            renderItem={({ item }) => (
            <CharacterCard character={item} />
            )}

            // Petite option bonus pour ajouter de l'espace en bas de la liste
            contentContainerStyle={styles.listContent}
        />
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5', // Un gris très léger pour faire ressortir les cartes blanches
        paddingHorizontal: 15,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginVertical: 20,
        textAlign: 'center',
    },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  name: { fontSize: 18, fontWeight: 'bold' },
  status: { color: '#666' },
  loadingText: {
marginTop: 10,
    color: '#666',
  },
    errorText: {
        color: '#e74c3c',
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
    listContent: {
    paddingBottom: 30, // Pour ne pas que la dernière carte colle au bord de l'écran
  }
});