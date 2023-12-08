import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  StyleSheet,
  Image,
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
      <Text>Focus Flight</Text>

      <TouchableOpacity onPress={() => navigation.navigate("game")}>
        <Text>Take Flight!</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
