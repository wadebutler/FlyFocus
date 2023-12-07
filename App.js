// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import { useEffect, useState } from "react";
import Images from "./assets/Images";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(true);
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      source={Images.background}
      style={{ flex: 1 }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          margin: 20,
          elevation: 1,
          color: "white",
        }}
      >
        {currentPoints}
      </Text>

      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
              break;
            case "new_point":
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />

      {running ? null : (
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            gameEngine.swap(entities());
            setCurrentPoints(0);
            setRunning(true);
          }}
        >
          <Text>Play Again?</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}
