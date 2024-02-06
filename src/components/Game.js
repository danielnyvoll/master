import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Physics } from "@react-three/rapier";
import { Suspense} from "react";

function Game() {

  return (
    <Canvas
    shadows
    camera={{ position: [30, 30, 30], fov: 30 } }
    >
        <color attach="background" args={["#ececec"]} />
        <Suspense>
        <Physics debug>
            <Experience />
        </Physics>
        </Suspense>
    </Canvas>
  );
}

export default Game;
