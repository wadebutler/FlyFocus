import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  StyleSheet,
  Image,
} from "react-native";
import Images from "./assets/Images";

export default function Landing() {
  return (
    <ImageBackground
      resizeMode="cover"
      source={Images.background}
      style={styles.container}
    >
      <Text>Landing</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
