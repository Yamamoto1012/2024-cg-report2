import { useEffect, useRef } from "react";
import breakSound from "/break.mp3";
import { RigidBody } from "@react-three/rapier";

export default function Brick ({ position, color, userInteracted }) {
  const ref = useRef();
  const breakSoundRef = useRef();

  useEffect(() => {
    breakSoundRef.current = new Audio(breakSound);
  }, []);

  const onCollisionEnter = () => {
    if (userInteracted) {
      // ブロックの破壊処理
      ref.current.setTranslation({ x: 1000, y: 1000, z: 1000 });
      breakSoundRef.current.play();
    }
  };

  return (
    <RigidBody
      ref={ref}
      colliders="cuboid"
      type="fixed"
      position={position}
      onCollisionEnter={onCollisionEnter}
    >
      <mesh>
        <boxGeometry args={[2.5, 1, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  );
};