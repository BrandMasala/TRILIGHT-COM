import { Text, useGLTF } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export const TextSection = ({ title, subtitle, image, sceneOpacity, model, modelScale, ...props }) => {
  const texture = image ? useLoader(THREE.TextureLoader, image) : null;
  const materialRef = useRef();
  // Load the model if provided
  const gltf = model ? useGLTF(model) : null;
  const scale = modelScale || [0.5, 0.5, 0.5];

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = sceneOpacity.current;
    }
  });

  return (
    <group {...props}>
      {/* Render 3D model if provided */}
      {gltf && (
        <primitive object={gltf.scene} scale={scale} position={[0, 0, 0]} />
      )}
      {!!title && (
        <Text
          color="white"
          anchorX={"left"}
          anchorY="bottom"
          fontSize={0.52}
          maxWidth={2.5}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
        >
          {title}
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      )}
      {image && texture && (
        <mesh
          scale={[3, 2, 2]}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            ref={materialRef}
            map={texture}
            transparent={true}
            opacity={sceneOpacity.current}
            // onBeforeCompile={fadeOnBeforeCompileFlat} // Temporarily removed
          />
        </mesh>
      )}
      {!!subtitle && (
        <Text
          color="white"
          anchorX={"left"}
          anchorY="top"
          fontSize={0.2}
          maxWidth={3.5}
          font={"./fonts/Inter-Regular.ttf"}
        >
          {subtitle}
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      )}
    </group>
  );
};

// Drei's useGLTF caches models, so no need for preloading here.
