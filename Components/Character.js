import Matter from "matter-js";
import { Animated } from "react-native";
import Images from "../assets/Images";

const Character = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  let image = Images["bird" + props.pose];

  let animatedValue = new Animated.Value(props.body.velocity.y);
  animatedValue.setValue(props.body.velocity.y);
  let rotation = animatedValue.interpolate({
    inputRange: [-10, 0, 10, 20],
    outputRange: ["-20deg", "0deg", "15deg", "45deg"],
    extrapolate: "clamp",
  });

  return (
    <Animated.Image
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        transform: [{ rotate: rotation }],
      }}
      resizeMode="stretch"
      source={image}
    />
  );
};

export default (world, pos, size) => {
  const initialChar = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    1,
    { label: "Character" }
  );
  Matter.World.add(world, initialChar);

  return {
    body: initialChar,
    pos,
    pose: 1,
    renderer: <Character />,
  };
};
