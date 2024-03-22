import * as THREE from 'three';

export const vision = (ballpos, playerpos, visionrange = 20) => {
    const ballvec = new THREE.Vector3(ballpos.x, ballpos.y, ballpos.z);
    const playervec = new THREE.Vector3(playerpos.x, playerpos.y, playerpos.z);

    let direction = new THREE.Vector3().subVectors(playervec, ballvec).normalize();
    let distance = ballvec.distanceTo(playervec);

    if (distance >= visionrange) {
        direction = new THREE.Vector3(0, 0, 0);
        distance = -1;
    }

    return { direction, distance };
}

export const ShotVector = (playerpos, ballpos, param) => {

    let { direction, _ } = vision(playerpos,ballpos, 2);

    return direction.multiplyScalar(param);
}