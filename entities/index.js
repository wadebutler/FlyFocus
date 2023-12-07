import Matter from "matter-js";
import Character from "../Components/Character";
import Floor from "../Components/Floor";
import Obstacle from "../Components/Obstacle";
import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "../utils/utils";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default (restart) => {
  let engine = Matter.Engine.create({ enableSleeping: false });

  let world = engine.world;

  engine.gravity.y = 0.7;

  const pipeSizePos1 = getPipeSizePosPair();
  const pipeSizePos2 = getPipeSizePosPair(windowWidth * 0.9);

  return {
    physics: { engine, world },
    Character: Character(world, { x: 50, y: 300 }, { height: 20, width: 35 }),
    ObstacleTop1: Obstacle(
      world,
      "ObstacleTop1",
      "red",
      pipeSizePos1.pipeTop.pos,
      pipeSizePos1.pipeTop.size
    ),
    ObstacleBottom1: Obstacle(
      world,
      "ObstacleBottom1",
      "blue",
      pipeSizePos1.pipeBottom.pos,
      pipeSizePos1.pipeBottom.size
    ),
    ObstacleTop2: Obstacle(
      world,
      "ObstacleTop2",
      "red",
      pipeSizePos2.pipeTop.pos,
      pipeSizePos2.pipeTop.size
    ),
    ObstacleBottom2: Obstacle(
      world,
      "ObstacleBottom2",
      "blue",
      pipeSizePos2.pipeBottom.pos,
      pipeSizePos2.pipeBottom.size
    ),
    Floor: Floor(
      world,
      "red",
      { x: windowWidth / 2, y: windowHeight },
      { height: 50, width: windowWidth }
    ),
  };
};
