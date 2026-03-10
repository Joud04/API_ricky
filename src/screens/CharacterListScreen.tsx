import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import { getCharacters } from '../services/rickmorty.service'; 
import { Character } from '../types/api.types'; 
import CharacterCard  from '../components/CharacterCard' ; 

export default function CharacterListScreen() {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [page, setPage] = useState<number>(1);
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false);

  const loadData = async (pageNum: number) => {
    try {
      if (pageNum === 1) {
        setIsLoading(true);
      } else {
        setFetchingMore(true);
      }

      const data = await getCharacters();
      // Fusion des données (Spread operator)
      setCharacters(prev => [...prev, ...data.results]);

    } catch (err: any) {
      setError("Erreur lors de la récupération des personnages.");
    } finally {
      setIsLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const handleLoadMore = () => {
    // On ne charge la suite que si on n'est pas déjà en train de fetcher
    if (!isFetchingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadData(nextPage);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={styles.loadingText}>Chargement des personnages...</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick & Morty Universe</Text>

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard character={item} />
        )}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore} 
        onEndReachedThreshold={0.5}  
        ListFooterComponent={() => (
          isFetchingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#00ff00" />
            </View>
          ) : null
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  }
});
