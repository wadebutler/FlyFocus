import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "../entities";
import Physics from "../physics";
import { useEffect, useState } from "react";
import Images from "../assets/Images";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Game() {
  const navigation = useNavigation();
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
      style={styles.container}
    >
      <Text style={styles.pointText}>{currentPoints}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("landing")}
        style={styles.returnArrow}
      >
        <Text style={{ marginBottom: -17, fontSize: 20 }}>Back</Text>
        <Ionicons name="return-down-back-outline" size={50} color="black" />
      </TouchableOpacity>

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
        style={styles.engineStyle}
      />

      {running ? null : (
        <View style={styles.playAgainContainer}>
          <TouchableOpacity
            style={styles.playAgainButton}
            onPress={() => {
              gameEngine.swap(entities());
              setCurrentPoints(0);
              setRunning(true);
            }}
          >
            <Image
              style={styles.gameOverImage}
              resizeMode="stretch"
              source={Images.gameOver}
            />
            <Text style={styles.playAgainText}>Play Again?</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pointText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    zIndex: 1,
    color: "white",
  },
  engineStyle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  playAgainContainer: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
    elevation: 2,
  },
  playAgainButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playAgainText: {
    color: "white",
    fontSize: 40,
  },
  gameOverImage: {
    height: 100,
    width: "90%",
  },
  returnArrow: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: 10,
  },
});
