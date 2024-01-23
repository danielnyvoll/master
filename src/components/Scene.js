// Scene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier';
import { Physics } from '@react-three/rapier';
import  Box  from './Box.js';

const Stadium = () => {
  const scale = [76, 1, 36];
  const { scene } = useGLTF('./football-field-for-gtec/source/untitled.gltf');

  return <primitive object={scene} scale={[1, 1, 1]} />; // Adjust scale as needed
};

const Ball = () => {
  const { scene } = useGLTF('./soccer_ball_high/scene.gltf');

  return (
    <RigidBody type="dynamic" position={[10, 5, 10]} linearDamping={0.01} angularDamping={0.01}>
      <BallCollider args={[0.5]} />
      <primitive object={scene} scale={[0.1, 0.1, 0.1]} />
    </RigidBody>
  );
};

const Scene = () => {
  return (
    <Canvas style={{
      width: '100vw',   // 100% of the viewport width
      height: '100vh',  // 100% of the viewport height
      position: 'fixed', // Fix it to cover the entire screen
      top: 0,
      left: 0
    }}>
      <Physics timeStep={1 / 60}>
      <PerspectiveCamera makeDefault position={[35, 25, 25]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Ball></Ball>
      <RigidBody type='fixed'>
        <CuboidCollider args={[76, 0, 36]}>
          <Stadium></Stadium>
        </CuboidCollider>
      </RigidBody>
      <Box position={[10, 5, 10]} />
      <OrbitControls />
      </Physics>
    </Canvas>
  );
};

export default Scene;