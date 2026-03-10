import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Character } from '../types/api.types';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  // Hook pour accéder à la navigation sans passer par les props du parent
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity 
      style={styles.card} 
      // Au clic, on navigue vers 'Detail' en passant l'ID [cite: 62]
      onPress={() => navigation.navigate('Detail', { id: character.id })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: character.image }} style={styles.avatar} />
      <View style={styles.infoBox}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.species}>{character.species} - {character.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12, // Bords arrondis
    marginBottom: 12,
    alignItems: 'center',
    // Ombre légère pour le look "pro"
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  infoBox: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  species: { color: '#666', fontSize: 14 },
});