import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";
import { KeyboardControls } from "@react-three/drei";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump"
}

function App() {

  const map = useMemo(() => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      {name: Controls.jump, keys: ["Space"] }
    ],
    []
  );

  return (
    <KeyboardControls map={map}>
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
    </KeyboardControls>
  );
}

export default App;