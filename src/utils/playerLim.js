import * as THREE from 'three';

const visionrange = 10;

export const vision = (ballpos, playerpos) => {
    const ballvec = new THREE.Vector3(ballpos.x, ballpos.y, ballpos.z);
    const playervec = new THREE.Vector3(playerpos.x, playerpos.y, playerpos.z);

    let direction = new THREE.Vector3().subVectors(ballvec, playervec).normalize().round();
    let distance = ballvec.distanceTo(playervec);

    console.log(direction);

    if (distance >= visionrange) {
        direction = new THREE.Vector3(0, 0, 0);
        distance = -1;
    }

    return { direction, distance };
}