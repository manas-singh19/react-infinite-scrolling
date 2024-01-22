/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'; 
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import ListView from './src/listView';
import DetailedScreen from './src/DetailedScreen';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <NavigationContainer>
    //    <Stack.Navigator>
    //     <Stack.Screen name="Home" component={ListView} />
        // <SafeAreaView style={backgroundStyle}>
        //   <StatusBar
        //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        //     backgroundColor={backgroundStyle.backgroundColor}
        //   />
          
        //   <ScrollView
        //     contentInsetAdjustmentBehavior="automatic"
        //     style={backgroundStyle}> 
        //     <View
        //       style={{
        //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
        //       }}>
        //       <Text>Manas Singh</Text>
        //     </View>
        //   </ScrollView>
        //   <Stack.Screen name="Home" component={ListView} />
        // </SafeAreaView> 
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Project-List">
        <Stack.Screen name="Project-List" component={ListView} options={{ title: 'Project list View',headerShown:false }}/>
        <Stack.Screen name="DetailedScreen" component={DetailedScreen} options={{ title: 'Detailed View',headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
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

export default App;
