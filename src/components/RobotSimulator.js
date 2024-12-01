import React, { useState } from "react";
import { placeRobot, moveRobot, rotateRobot, reportRobot } from "../utils/robotLogic";
import Controls from "./Controls";
import Table from "./Table";

const RobotSimulator = () => {
  const [robot, setRobot] = useState(null);
  const [output, setOutput] = useState("");
  const [commands, setCommands] = useState("");

  const executeCommands = (commandsArray) => {
    let currentRobot = robot;
    let finalOutput = "";

    commandsArray.forEach((cmd) => {
      const parts = cmd.split(" ");
      const command = parts[0];

      switch (command) {
        case "PLACE":
          if (parts.length > 1) {
            const [x, y, f] = parts[1].split(",");
            currentRobot = placeRobot(parseInt(x, 10), parseInt(y, 10), f);
          }
          break;

        case "MOVE":
          if (currentRobot) {
            currentRobot = moveRobot(currentRobot);
          }
          break;

        case "LEFT":
        case "RIGHT":
          if (currentRobot) {
            currentRobot = {
              ...currentRobot,
              direction: rotateRobot(currentRobot.direction, command),
            };
          }
          break;

        case "REPORT":
          if (currentRobot) {
            finalOutput = reportRobot(currentRobot);
          }
          break;

        default:
          console.warn(`Invalid command: ${cmd}`);
      }
    });

    setRobot(currentRobot);
    setOutput(finalOutput);
  };

  const handleRun = () => {
    const commandsArray = commands.split("\n").map((cmd) => cmd.trim());
    executeCommands(commandsArray);
  };

  return (
    <div className="robot-simulator">
      <h1>Toy Robot Simulator</h1>
      <div className="simulator-container">
        <Table robot={robot} />

        <Controls
          commands={commands}
          setCommands={setCommands}
          handleRun={handleRun}
        />
      </div>
      {output && <p className="output">Output: {output}</p>}
    </div>
  );
};

export default RobotSimulator;
