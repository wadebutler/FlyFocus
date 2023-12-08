import Matter from "matter-js";
import { View, Image } from "react-native";
import Images from "../assets/Images";

const Floor = (props) => {
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
      <Image
        style={{ width: width, height: height }}
        resizeMode="stretch"
        source={Images.floor}
      />
    </View>
  );
};

export default (world, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Floor", isStatic: true }
  );
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    pos,
    renderer: <Floor />,
  };
};
