import { useRef, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useWebSocket } from '../socket/WebSocket';

const CanvasSnapshot = () => {
    const { gl } = useThree(); // Access the WebGLRenderer
    const { sendCanvasImage } = useWebSocket();
    const snapshotTimer = useRef(0); // Use a ref to track time since last snapshot

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
        if (elapsedTime - snapshotTimer.current >= 100) { // Check if 100 ms have passed
            sendSnapshot();
            snapshotTimer.current = elapsedTime; // Reset timer to current time
        }
    });
    

    return null; // This component does not render anything itself
};

export default CanvasSnapshot;
