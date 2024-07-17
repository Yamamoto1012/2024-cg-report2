import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";

export default function Paddle({
  euler = new THREE.Euler(),
  quaternion = new THREE.Quaternion(),
}) {
  const ref = useRef();
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    ref.current.setTranslation({
      x: (pointer.x * viewport.width) / 2,
      y: -viewport.height / 3,
      z: 0,
    });
    ref.current.setRotation(
      quaternion.setFromEuler(euler.set(0, 0, (pointer.x * Math.PI) / 4))
    );
  });

  return (
    <RigidBody
      ref={ref}
      colliders="cuboid"
      type="fixed"
      name="paddle"
      restitution={2.1}
    >
      <mesh>
        <boxGeometry args={[15, 2, 2]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </RigidBody>
  );
}
