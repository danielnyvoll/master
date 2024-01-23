import React, { useEffect, useState } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { animated } from '@react-spring/three';

const Box = ({ position, color = "royalblue", moveStep = 1 }) => {

  // Initialize position state
  const [boxPosition, setBoxPosition] = useState(position);

  // Add event listeners for arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
        switch (event.key) {
          case 'ArrowUp':
            setBoxPosition([boxPosition[0], boxPosition[1] + moveStep, boxPosition[2]]);
            break;
          case 'ArrowDown':
            setBoxPosition([boxPosition[0], boxPosition[1] - moveStep, boxPosition[2]]);
            break;
          case 'ArrowLeft':
            setBoxPosition([boxPosition[0] - moveStep, boxPosition[1], boxPosition[2]]);
            break;
          case 'ArrowRight':
            setBoxPosition([boxPosition[0] + moveStep, boxPosition[1], boxPosition[2]]);
            break;
          default:
            break;
        }
      };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [boxPosition]);

  return (
    <RigidBody type="dynamic" position={boxPosition}>
      <CuboidCollider args={[1, 1, 1]} />
      <animated.mesh 
        position={boxPosition} 
        scale={[1, 1, 1]} // Adjust the scale as needed
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </animated.mesh>
    </RigidBody>
  );
};

export default Box;
