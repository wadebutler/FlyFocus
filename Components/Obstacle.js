// import { StatusBar } from "expo-status-bar";
import Matter from "matter-js";
import { StyleSheet, Text, View, Image } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Images from "../assets/Images";

const Obstacle = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
      }}
    >
      {props.body.label.includes("Top") ? null : (
        <Image
          style={{ width: width, position: "relative", zIndex: 1 }}
          resizeMode="stretch"
          source={Images.pipeTop}
        />
      )}

      <Image
        style={{ width: width, height: height }}
        resizeMode="stretch"
        source={Images.pipeBase}
      />

      {props.body.label.includes("Bottom") ? null : (
        <Image
          style={{ width: width, position: "relative", top: -20, zIndex: 1 }}
          resizeMode="stretch"
          source={Images.pipeTop}
        />
      )}
    </View>
  );
};

export default (world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic: true }
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  };
};
