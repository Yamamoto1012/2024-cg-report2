import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import breakSound from "/break.mp3";
import { RigidBody } from "@react-three/rapier";

export default function Brick({ position, color, userInteracted, onBlockDestroyed }) {
  const ref = useRef();
  const breakSoundRef = useRef();
  const direction = useRef(Math.random() > 0.5 ? 1 : -1); // ランダムな方向を決定
  const texture = useLoader(THREE.TextureLoader, "/pixel.png");

  useEffect(() => {
    breakSoundRef.current = new Audio(breakSound);
  }, []);

  const onCollisionEnter = () => {
    if (userInteracted) {
      ref.current.setTranslation({ x: 1000, y: 1000, z: 1000 });
      breakSoundRef.current.play();
      onBlockDestroyed();
    }
  };

  useFrame(() => {
    if (ref.current) {
      // ブロックを動かすロジック
      const speed = 0.05;
      const { x, y, z } = ref.current.translation();
      ref.current.setTranslation({ x: x + direction.current * speed, y, z });

      // 壁に当たったら方向を変える
      if (x >= 10 || x <= -10) {
        direction.current *= -1;
        // 壁に当たったら少し離れた位置に移動して次のフレームで動きを続ける
        ref.current.setTranslation({ x: x + direction.current * speed, y, z });
      }
    }
  });

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
        <meshStandardMaterial map={texture} color={color} />
      </mesh>
    </RigidBody>
  );
}
