import './App.css';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";

function App() {

  return (
    <Canvas
      style={{position: "fixed"}}
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

export default App;
