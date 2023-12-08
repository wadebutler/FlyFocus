import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  StyleSheet,
  Image,
} from "react-native";
import Landing from "./Screens/Landing";
import Game from "./Screens/Game";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Stack.Navigator>
        <Stack.Screen
          name="landing"
          component={Landing}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="game"
          component={Game}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
