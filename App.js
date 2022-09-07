/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import NoteScreen from './src/screens/Note';
import CreateNoteScreen from './src/screens/CreateNote';
import DATABASE_NAME, { createTable } from './src/db/database';
import { openDatabase } from './src/db/database';
import { TouchableCard } from './src/screens/components/Card';
import EditNoteScreen from './src/screens/EditNote';

let isDatabaseOpen = false;

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'StickyList', headerShown: true, headerStyle: { backgroundColor: '#F7FDFE' }, headerTintColor: '#413D4B' }} />
        <Stack.Screen
          name='Note'
          component={NoteScreen}
          options={({ route }) => ({
            title: `Note: ${route.params.name}`, headerShown: true, headerStyle: { backgroundColor: '#F7FDFE' }, headerTintColor: '#413D4B' })} />
        <Stack.Screen
          name='CreateNote'
          component={CreateNoteScreen}
          options={{ title: 'Create note', headerShown: true, headerStyle: { backgroundColor: '#F7FDFE' }, headerTintColor: '#413D4B' }}
        />
        <Stack.Screen
        name='EditNote'
        component={EditNoteScreen}
        options={{ title: 'Edit note', headerShown: true, headerStyle: { backgroundColor: '#F7FDFE' }, headerTintColor: '#413D4B' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator();

// const ProfileScreen = ({ navigation, route }) => {
//   return <Text>This is {route.params.name}'s profile</Text>;
// };

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

openDatabase();
createTable();

export default App;
