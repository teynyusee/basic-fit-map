import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import React, { Suspense } from "react";

export function GymCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      shadows
      camera={{ fov: 50, near: 0.1, far: 2000, position: [0, 100, 100] }}
      style={{ width: "100vw", height: "100vh", background: "#000" }}
    >
      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.3} mipmapBlur />
      </EffectComposer>

      <ambientLight intensity={0.3} />
      <directionalLight castShadow intensity={1.4} position={[80, 120, 60]} />

      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
