import Brick from "./Brick";

export default function Bricks({ userInteracted }) {
  let positions = [];
  for (let x = -10; x <= 10; x += 5) {
    for (let y = 5; y <= 15; y += 5) {
      positions.push([x, y, 0]);
    }
  }

  return (
    <>
      {positions.map((pos, index) => (
        <Brick
          key={index}
          position={pos}
          userInteracted={userInteracted}
          color={index % 2 === 0 ? "red" : "blue"}
        />
      ))}
    </>
  );
}
