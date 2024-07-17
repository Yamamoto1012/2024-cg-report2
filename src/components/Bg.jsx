import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import bgImage from "/bg.jpg";
import { Plane, useAspect } from "@react-three/drei";

export default function Bg() {
  const texture = useLoader(THREE.TextureLoader, bgImage);
  const scale = useAspect(1920, 1080, 2);
  return <Plane scale={scale} material-map={texture} />;
}
