// Scene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

import Box from './Box'; // Assuming Box is in the same directory
const Stadium = () => {
  // Make sure the path here is relative to the public folder
  const { scene } = useGLTF('./football-field-for-gtec/source/untitled.gltf');
  return <primitive object={scene} scale={[1, 1, 1]} />; // Adjust scale as needed
};
const Ball = () => {
  const { scene } = useGLTF('./soccer_ball_high/scene.gltf');
  const position = [0,1,0];
  return <primitive object={scene} position = {position} scale={[0.1, 0.1, 0.1]} />;
}
const Scene = () => {
  // Radius of the circle on which the boxes are positioned
  const radius = 2;

  // Generate positions for the hexagon
  const boxPositions = Array.from({ length: 6 }, (_, i) => {
    const angle = Math.PI / 3 * i; // 60 degrees in radians
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
  });

  return (
    <Canvas style={{
      width: '100vw',   // 100% of the viewport width
      height: '100vh',  // 100% of the viewport height
      position: 'fixed', // Fix it to cover the entire screen
      top: 0,
      left: 0
    }}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {boxPositions.map((position, index) => (
        <Box key={index} position={position} />
      ))}
      <Ball></Ball>
      <Stadium></Stadium>
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;