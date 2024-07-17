import {
  EffectComposer,
  RenderPixelatedPass,
  ShaderPass,
} from "three/examples/jsm/Addons.js";
import PostProcessing from "./components/PostPocessing";
import Bg from "./components/Bg";
import Ball from "./components/Ball";
import Paddle from "./components/Paddle";
import Bricks from "./components/Bricks";
import Frame from "./components/Frame";
import { Canvas, extend } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import CameraHandler from "./components/CameraHandler";
import GeoText3d from "./components/GeoText3d";

extend({ EffectComposer, RenderPixelatedPass, ShaderPass });

export default function App() {
  const [userInteracted, setUserInteracted] = useState(false);
  const [blocksDestroyed, setBlockDestroyed] = useState(0);
  const totalBlocks = 15;

  function handleUserInteraction() {
    setUserInteracted(true);
  }

  return (
    <>
      <Canvas
        camera={{ position: [0, 5, 25], fov: 50 }}
        onPointerDown={handleUserInteraction}
      >
        <ambientLight intensity={5} />
        <pointLight position={[10, 10, 5]} />
        <Physics gravity={[0, -30, 0]} maxSubSteps={10} timeStep={1 / 60}>
          <Ball />
          <Paddle />
          <Bricks
            userInteracted={userInteracted}
            setBlocksDestroyed={setBlockDestroyed}
          />
          <Frame />
        </Physics>
        <Bg />
        <PostProcessing />
        <CameraHandler userInteracted={userInteracted} />
        <OrbitControls passive={true} />
        {blocksDestroyed === totalBlocks && <GeoText3d />}
      </Canvas>
      {!userInteracted && (
        <div
          className="announcement"
        >
          <p>マウスをクリック</p>
        </div>
      )}
    </>
  );
}
