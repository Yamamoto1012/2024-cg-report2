import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function CameraHandler({ userInteracted }) {
  const { camera } = useThree();

  useEffect(() => {
    if (userInteracted) {
      const timeout = setTimeout(() => {
        const start = { z: camera.position.z };
        const end = { z: 50 };
        const duration = 2000;
        const startTime = performance.now();

        function animateCamera() {
          const elapsedTime = performance.now() - startTime;
          const t = Math.min(elapsedTime / duration, 1);
          camera.position.z = start.z + (end.z - start.z) * t;
          if (t < 1) {
            requestAnimationFrame(animateCamera);
          }
        }
        animateCamera();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [userInteracted, camera]);

  return null;
}