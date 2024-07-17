import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { EffectComposer, RenderPixelatedPass, ShaderPass } from "three/examples/jsm/Addons.js";

extend({ EffectComposer, RenderPixelatedPass, ShaderPass });

export default function App() {
  return (
    <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
      <ambientLight intensity={3} />
      <pointLight position={[10, 10, 5]} />
      <Physics gravity={[0, -30, 0]}>
        <Ball />
        <Paddle />
        <Enemy color="orange" position={[2.75, 1.5, 0]} />
        <Enemy color="hotpink" position={[-2.75, 3.5, 0]} />
        <Enemy color="lightgreen" position={[2.75, 5.5, 0]} />
      </Physics>
      <PostProcessing />
    </Canvas>
  );
}

function PostProcessing() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();

  useEffect(() => {
    const pixelPass = new RenderPixelatedPass(6, scene, camera);
    composer.current = new EffectComposer(gl);
    composer.current.addPass(pixelPass);
  }, [gl, scene, camera]);

  useEffect(() => {
    composer.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    composer.current.render();
  }, 1);

  return null;
}

function Ball() {
  const ref = useRef();
  const { viewport } = useThree();
  const texture = useMemo(
    () => new THREE.TextureLoader().load("pixel.png"),
    []
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const onCollisionEnter = () => (
    ref.current.setTranslation({ x: 0, y: 0, z: 0 }),
    ref.current.setLinvel({ x: 0, y: 10, z: 0 })
  );

  return (
    <>
      <RigidBody ref={ref} colliders="ball" mass={1}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders={false}
        position={[0, -viewport.height, 0]}
        restitution={2.1}
        onCollisionEnter={onCollisionEnter}
      >
        <CuboidCollider args={[30, 2, 30]} />
      </RigidBody>
    </>
  );
}

const Enemy = ({ position, color }) => {
  const texture = useMemo(
    () => new THREE.TextureLoader().load("pixel.png"),
    []
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  return (
    <RigidBody
      colliders="cuboid"
      type="fixed"
      position={position}
      restitution={2.1}
    >
      <mesh>
        <boxGeometry args={[2.5, 1, 1]} />
        <meshStandardMaterial color={color} map={texture} />
      </mesh>
    </RigidBody>
  );
};

function Paddle({
  euler = new THREE.Euler(),
  quaternion = new THREE.Quaternion(),
}) {
  const ref = useRef();
  const texture = useMemo(
    () => new THREE.TextureLoader().load("pixel.png"),
    []
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  useFrame(({ pointer, viewport }) => {
    ref.current.setTranslation({
      x: (pointer.x * viewport.width) / 2,
      y: -viewport.height / 3,
      z: 0,
    });
    ref.current.setRotation(
      quaternion.setFromEuler(euler.set(0, 0, (pointer.x * Math.PI) / 10))
    );
  });
  return (
    <RigidBody ref={ref} colliders="cuboid" type="fixed" restitution={2.1}>
      <mesh>
        <boxGeometry args={[4, 1, 1]} />
        <meshStandardMaterial color="lightblue" map={texture} />
      </mesh>
    </RigidBody>
  );
}
