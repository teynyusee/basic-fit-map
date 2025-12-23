import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function GymCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
  shadows
  camera={{ fov: 50, near: 0.1, far: 2000, position: [0, 100, 100] }}
  style={{ width: "100vw", height: "100vh", background: "#000" }}
  onPointerMissed={() => {
    document.body.style.cursor = "default";
  }}
    >
      <EffectComposer>
  <Bloom
    intensity={1.2}          // glow sterkte
    luminanceThreshold={0.3} // wanneer glow start
    luminanceSmoothing={0.9}
    mipmapBlur
  />
</EffectComposer>
      
      <ambientLight intensity={0.3} />

      <directionalLight
        castShadow
        intensity={1.4}
        position={[80, 120, 60]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight intensity={0.4} position={[-60, 80, -40]} />
      <directionalLight intensity={0.3} position={[0, 120, -120]} color="#ffb074" />

      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
