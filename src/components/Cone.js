import React from 'react';
import { RigidBody } from "@react-three/rapier";
import { Cylinder } from "@react-three/drei";

const Cone = ({ position }) => {
  const coneHeight = 2; 
  const stripeHeight = coneHeight * 0.2; 
  const radiusTop = 0.1; 
  const radiusBottom = 0.5; 

  return (
    <RigidBody type="fixed" position={position} name="cone" friction={1.2}>

      <Cylinder args={[radiusTop, radiusBottom, coneHeight, 32]} position={[0, coneHeight / 2, 0]}>
        <meshStandardMaterial attach="material" color="orange" />
      </Cylinder>

      <Cylinder args={[radiusBottom * 0.95, radiusBottom, stripeHeight, 32]} position={[0, stripeHeight / 2, 0]}>
        <meshStandardMaterial attach="material" color="white" />
      </Cylinder>

      <Cylinder args={[radiusBottom * 0.95, radiusBottom, stripeHeight, 32]} position={[0, stripeHeight * 2.5, 0]}>
        <meshStandardMaterial attach="material" color="white" />
      </Cylinder>
    </RigidBody>
  );
};

export default Cone;
