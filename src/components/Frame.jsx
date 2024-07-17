import { RigidBody } from "@react-three/rapier";

export default function Frame() {
  const frameThickness = 1;
  const frameHeight = 17;
  const frameWidth = 25;

  return (
    <>
      {/* 左の枠 */}
      <RigidBody
        type="fixed"
        position={[-frameWidth / 2 - frameThickness / 2, frameHeight / 2, 0]}
      >
        <mesh>
          <boxGeometry args={[frameThickness, frameHeight, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      {/* 右の枠 */}
      <RigidBody
        type="fixed"
        position={[frameWidth / 2 + frameThickness / 2, frameHeight / 2, 0]}
      >
        <mesh>
          <boxGeometry args={[frameThickness, frameHeight, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      {/* 上の枠 */}
      <RigidBody
        type="fixed"
        position={[0, frameHeight + frameThickness / 2, 0]}
      >
        <mesh>
          <boxGeometry
            args={[frameWidth + frameThickness * 2, frameThickness, 1]}
          />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
    </>
  );
}
