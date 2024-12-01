import { placeRobot, moveRobot, rotateRobot, reportRobot } from "../utils/robotLogic";

describe("Robot Commands", () => {

  describe("PLACE command", () => {
    it("should place the robot correctly", () => {
      const robot = placeRobot(0, 0, "NORTH");
      expect(robot).toEqual({ position: { x: 0, y: 0 }, direction: "NORTH" });
    });
  });

  describe("MOVE command", () => {
    it("should move the robot correctly", () => {
      const robot = { position: { x: 0, y: 0 }, direction: "NORTH" };
      const movedRobot = moveRobot(robot);
      expect(movedRobot.position).toEqual({ x: 0, y: 1 });
    });
  });

  describe("ROTATE command", () => {
    it("should change direction correctly", () => {
      const newDirection = rotateRobot("NORTH", "RIGHT");
      expect(newDirection).toBe("EAST");
    });
  });

  describe("REPORT command", () => {
    it("should output the robot's state", () => {
      const robot = { position: { x: 1, y: 2 }, direction: "EAST" };
      const output = reportRobot(robot);
      expect(output).toBe("1,2,EAST");
    });
  });

  describe("Integration Tests", () => {

    it("should handle Example A: PLACE 0,0,NORTH -> MOVE -> REPORT", () => {
      let robot = placeRobot(0, 0, "NORTH");
      robot = moveRobot(robot);
      const output = reportRobot(robot);
      expect(output).toBe("0,1,NORTH");
    });

    it("should handle Example B: PLACE 0,0,NORTH -> LEFT -> REPORT", () => {
      let robot = placeRobot(0, 0, "NORTH");
      robot = { ...robot, direction: rotateRobot(robot.direction, "LEFT") };
      const output = reportRobot(robot);
      expect(output).toBe("0,0,WEST");
    });

    it("should handle Example C: PLACE 1,2,EAST -> MOVE -> MOVE -> LEFT -> MOVE -> REPORT", () => {
      let robot = placeRobot(1, 2, "EAST");
      robot = moveRobot(robot); // Move to (2, 2)
      robot = moveRobot(robot); // Move to (3, 2)
      robot = { ...robot, direction: rotateRobot(robot.direction, "LEFT") };
      robot = moveRobot(robot); // Move to (3, 3)
      const output = reportRobot(robot);
      expect(output).toBe("3,3,NORTH");
    });

  });

});
