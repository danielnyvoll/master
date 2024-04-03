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

export const calculateMovementImpulse = (direction, maxSpeed = 12.5, playerRef) => {
    if (!playerRef.current) {
        return { x: 0, y: 0, z: 0 };
    }

    let impulse = direction;

    let currentVelocity = vec3(playerRef.current.linvel());
    let currentSpeed = currentVelocity.length();
    let maxSpeedFactor = maxSpeed / Math.max(currentSpeed, 0.5);

    if (currentSpeed > maxSpeed) {
        playerRef.current.setLinvel(currentVelocity.multiplyScalar(maxSpeedFactor), true);
    }
    return impulse;
};

