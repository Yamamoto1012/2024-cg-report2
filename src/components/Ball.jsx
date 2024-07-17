import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Ball() {
  const ref = useRef();
  const { viewport } = useThree();
  const texture = useMemo(
    () => new THREE.TextureLoader().load("pixel.png"),
    []
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const maxSpeed = 60;

  const onCollisionEnter = (event) => {
    if (event.colliderObject?.name === "paddle") {
      const paddlePosition = event.colliderObject.translation();
      const ballPosition = ref.current.translation();
      const offset = ballPosition.x - paddlePosition.x;
      const maxOffset = 2.5;
      const bounceAngle = ((offset / maxOffset) * Math.PI) / 4;

      const speed = 5;
      const velocity = {
        x: speed * Math.sin(bounceAngle),
        y: speed * Math.cos(bounceAngle),
        z: 0,
      };

      ref.current.setLinvel(velocity);
    } else if (event.colliderObject?.name === "ground") {
      ref.current.setTranslation({ x: 0, y: 0, z: 0 });
      ref.current.setLinvel({ x: 0, y: 5, z: 0 });
    }
  };

  useFrame(() => {
    if (ref.current) {
      // ボールの速度を取得
      const linvel = ref.current.linvel();

      // 速度を制限
      const speed = Math.sqrt(
        linvel.x * linvel.x + linvel.y * linvel.y + linvel.z * linvel.z
      );
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        ref.current.setLinvel({
          x: linvel.x * scale,
          y: linvel.y * scale,
          z: linvel.z * scale,
        });
      }
    }
  });

  return (
    <>
      <RigidBody
        ref={ref}
        colliders="ball"
        mass={1}
        restitution={1.5}
        onCollisionEnter={onCollisionEnter}
      >
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="white" map={texture} />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders={false}
        position={[0, -viewport.height, 0]}
        onCollisionEnter={onCollisionEnter}
      >
        <CuboidCollider args={[30, 1, 30]} />
      </RigidBody>
    </>
  );
}
