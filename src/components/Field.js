import { RigidBody } from '@react-three/rapier';
import { Box } from "@react-three/drei";
const Field = () => {
    return (
        <>
            <RigidBody
                type="fixed"
                name="floor"
                friction={1.2}
            >
                <Box position={[0, 0, 0]} args={[30, 1, 20]}>
                    <meshStandardMaterial color="springgreen" />
                </Box>
            </RigidBody>

            {/* Walls */}
            <RigidBody type="fixed">
                <Box position={[15.5, 2, 0]} args={[1, 5, 20]}>
                    <meshStandardMaterial visible={false} />
                </Box>
                <Box position={[-15.5, 2, 0]} args={[1, 5, 20]}>
                    <meshStandardMaterial visible={false} />
                </Box>
                <Box position={[0, 2, 10.5]} args={[32, 5, 1]}>
                    <meshStandardMaterial visible={false} />
                </Box>
                <Box position={[0, 2, -10.5]} args={[32, 5, 1]}>
                    <meshStandardMaterial visible={false} />
                </Box>
            </RigidBody>
        </>
    );
};

export default Field;
