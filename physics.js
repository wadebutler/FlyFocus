import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/utils";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
let tick = 0;
let pose = 1;
let obstacleMovement = -3;

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach(() => {
      Matter.Body.setVelocity(entities.Character.body, {
        x: 0,
        y: -7,
      });
    });

  Matter.Engine.update(engine, time.delta);

  for (let i = 1; i <= 2; i++) {
    if (
      entities[`ObstacleTop${i}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${i}`].point
    ) {
      entities[`ObstacleTop${i}`].point = true;
      dispatch({ type: "new_point" });
    }

    if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

      Matter.Body.setPosition(
        entities[`ObstacleTop${i}`].body,
        pipeSizePos.pipeTop.pos
      );

      Matter.Body.setPosition(
        entities[`ObstacleBottom${i}`].body,
        pipeSizePos.pipeBottom.pos
      );

      entities[`ObstacleTop${i}`].point = false;
    }

    Matter.Body.translate(entities[`ObstacleTop${i}`].body, {
      x: obstacleMovement,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, {
      x: obstacleMovement,
      y: 0,
    });
  }

  Matter.Events.on(engine, "collisionStart", () => {
    dispatch({ type: "game_over" });
  });

  tick += 1;
  if (tick % 5 === 0) {
    pose = pose + 1;
    if (pose > 3) {
      pose = 1;
    }

    entities.Character.pose = pose;
  }

  return entities;
};

export default Physics;
