// Box.js
import React, { useState } from 'react';
import { MeshWobbleMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

const Box = ({ position, color = "royalblue" }) => {
  const [hovered, setHovered] = useState(false);
  const props = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1], // Increase scale when hovered
  });

  return (
    <animated.mesh 
      position={position} 
      scale={props.scale}
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <MeshWobbleMaterial color={color} factor={0.6} speed={1} />
    </animated.mesh>
  );
};

export default Box;
