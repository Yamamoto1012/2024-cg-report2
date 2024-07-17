import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';

const GeoText3d = () => {
  const textRef = useRef();

  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Text3D
      ref={textRef}
      position={[-5, 6, 7]}
      font="/Edu.json"
      size={4}
      height={2}
      lineHeight={0.6}
      bevelEnabled
      bevelSize={0.05}
      bevelThickness={0.1}
    >
      {`You Win!`}
      <meshStandardMaterial color="hotpink" />
    </Text3D>
  )
}

export default GeoText3d;
