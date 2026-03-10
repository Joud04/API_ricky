import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Character } from '../types/api.types'; // On importe notre interface

//Ce composant accepte une "prop" nommée character de type Character
interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <View style={styles.card}>
      {/*Affichage de l'avatar */}
      <Image 
        source={{ uri: character.image }} 
        style={styles.image} 
      />
      
      <View style={styles.infoContainer}>
        {/*Affichage du nom */}
        <Text style={styles.name}>{character.name}</Text>
        
        {/*Affichage du statut */}
        <Text style={styles.status}>
          État : {character.status} - {character.species}
        </Text>
      </View>
    </View>
  );
}

//Style pour une carte avec bords arrondis et ombre légère
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12, // Bords arrondis
    marginBottom: 15,
    padding: 10,
    // Ombre pour iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Ombre pour Android
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35, // Image ronde
  },
  infoContainer: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});