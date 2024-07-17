import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  EffectComposer,
  RenderPixelatedPass,
} from "three/examples/jsm/Addons.js";

export default function PostProcessing() {
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
