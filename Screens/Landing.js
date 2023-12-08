import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import Images from "../assets/Images";
import { useNavigation } from "@react-navigation/native";

export default function Landing() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      resizeMode="cover"
      source={Images.background}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Flight</Text>
        <Text style={styles.title}>Focus</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("game")}>
        <Text style={styles.title}>Start</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    color: "white",
    fontSize: 50,
    flexDirection: "column",
    textTransform: "uppercase",
  },
});
