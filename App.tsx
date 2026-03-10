import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // 

// Import de tes écrans
import CharacterListScreen from './src/screens/CharacterListScreen';
import DetailScreen from './src/screens/DetailScreen';

// Création du Stack Navigator
const Stack = createNativeStackNavigator(); // 

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Home">
        {/* Écran 1 : La liste (Home) */}
        <Stack.Screen 
          name="Home" 
          component={CharacterListScreen} 
          options={{ title: 'Rick & Morty - Liste' }} // [cite: 34]
        />
        
        {/* Écran 2 : Le détail (Detail) */}
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'Détails du Personnage' }} // 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}