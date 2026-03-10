import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { getCharacterById } from '../services/rickmorty.service';
import { Character } from '../types/api.types';

export default function DetailScreen({ route }: any) {
  // ● Récupération de l'ID passé en paramètre [cite: 66]
  const { id } = route.params; 
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ● Au montage, on récupère les données via l'ID [cite: 69]
    const fetchDetail = async () => {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du détail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.center}>
        <Text>Personnage introuvable.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Affichage de la grande image [cite: 70] */}
        <Image source={{ uri: character.image }} style={styles.bigImage} />
        <Text style={styles.name}>{character.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: character.status === 'Alive' ? '#2ecc71' : '#e74c3c' }]}>
          <Text style={styles.statusText}>{character.status}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Informations</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Espèce :</Text>
          <Text style={styles.value}>{character.species}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Genre :</Text>
          <Text style={styles.value}>{character.gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Type :</Text>
          <Text style={styles.value}>{character.type || "Non spécifié"}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  bigImage: { width: 200, height: 200, borderRadius: 100, marginBottom: 15, borderWidth: 3, borderColor: '#00ff00' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50' },
  statusBadge: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginTop: 10 },
  statusText: { color: '#fff', fontWeight: 'bold' },
  detailsContainer: { padding: 20, marginTop: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#34495e' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  label: { color: '#7f8c8d', fontSize: 16 },
  value: { fontWeight: '600', fontSize: 16, color: '#2c3e50' },
});