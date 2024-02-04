import { vec3 } from '@react-three/rapier';

export const calculateKickImpulse = (kickerRef, ballRef, kickStrength = 2.0) => {
    if (!kickerRef.current || !ballRef.current) {
        return { x: 0, y: 0, z: 0 };
    }

    let kickerPos = vec3(kickerRef.current.translation());
    let ballPos = vec3(ballRef.current.translation());
    let direction = ballPos.sub(kickerPos).normalize().multiplyScalar(kickStrength);

    return direction;
};

export const calculateMovementImpulse = (directions, acceleration = 2.5, maxSpeed = 17.5, playerRef) => {
    if (!playerRef.current) {
        return { x: 0, y: 0, z: 0 };
    }

    let impulse = vec3({ x: 0, y: 0, z: 0 });

    if (directions.right) {
        impulse = impulse.add({ x: 0, y: 0, z: -acceleration });
    }
    if (directions.left) {
        impulse = impulse.add({ x: 0, y: 0, z: acceleration });
    }
    if (directions.forward) {
        impulse = impulse.add({ x: -acceleration, y: 0, z: 0 });
    }
    if (directions.backward) {
        impulse = impulse.add({ x: acceleration, y: 0, z: 0 });
    }

    let currentVelocity = vec3(playerRef.current.linvel());
    let currentSpeed = currentVelocity.length();
    let maxSpeedFactor = maxSpeed / Math.max(currentSpeed, 0.5);

    if (currentSpeed > maxSpeed) {
        playerRef.current.setLinvel(currentVelocity.multiplyScalar(maxSpeedFactor), true);
    }
    console.log(impulse);
    return impulse;
};

