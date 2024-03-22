import React, { useRef, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useWebSocket } from '../socket/WebSocket';

const CanvasSnapshot = () => {
    const { gl } = useThree(); // Access the WebGLRenderer
    const { sendCanvasImage } = useWebSocket();
    const snapshotTimer = useRef(0); // Use a ref to track time since last snapshot
    const snapshotInterval = 1000; // Time in milliseconds between snapshots

    const sendSnapshot = useCallback(() => {
        gl.domElement.toBlob((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                const base64data = reader.result;
                sendCanvasImage(base64data);
            };
        });
    }, [gl, sendCanvasImage]);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime() * 1000; // Convert to milliseconds
        if (elapsedTime - snapshotTimer.current >= snapshotInterval) {
            sendSnapshot();
            snapshotTimer.current = elapsedTime; // Reset timer
        }
    });

    return null; // This component does not render anything itself
};

export default CanvasSnapshot;
