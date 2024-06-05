import React, { Suspense } from 'react';
import {
  Box,
  Text,
} from "@react-three/drei";
import {
  CuboidCollider,
  RigidBody,
} from "@react-three/rapier";
import { MeshPhysicalMaterial } from "three";
import { useDispatch, useSelector } from 'react-redux';
import { setGoal } from '../store';

const Goal = ({ position, rotation, isBlue }) => {
  const dispatch = useDispatch();
  const intersecting = useSelector(state => state.goal.intersecting);

  const materialColor = isBlue ? 'blue' : 'red';
  const material = new MeshPhysicalMaterial({ color: materialColor });

  return (
    <RigidBody position={position} rotation={rotation} type='fixed'>
      <Box
        scale={[11, 1, 1]}
        position={[0, 3, 0]}
        material={material}
        castShadow
      />
      <Box
        scale={[1, 6, 1]}
        position={[-5, 0, 0]}
        material={material}
        castShadow
      />
      <Box
        scale={[1, 6, 1]}
        position={[5, 0, 0]}
        material={material}
        castShadow
      />

      <Suspense fallback={null}>
        {intersecting && isBlue && (
          <Text color="red" position={[0, 5, 0]} fontSize={2}>
            Goal
          </Text>
        )}
        {intersecting && !isBlue && (
          <Text color="blue" position={[0, 5, 0]} fontSize={2}>
            Goal
          </Text>
        )}
      </Suspense>

      <CuboidCollider
        position={[0, 0, -1]}
        args={[5, 3, 1]}
        sensor
        onIntersectionEnter={({other}) => {
          if(other.rigidBodyObject.name === "ball"){
            if(isBlue){
              dispatch(setGoal({intersecting: true, scoringSide: -1}));
            }
            else{
              dispatch(setGoal({intersecting: true, scoringSide: 1}));
            }
          }  
        }}
        onIntersectionExit={() => {
          setTimeout(() => {
            dispatch(setGoal({intersecting: false, scoringSide: 0}));
          }, 1000);
        }}
      />
    </RigidBody>
  );
};

export default Goal;
