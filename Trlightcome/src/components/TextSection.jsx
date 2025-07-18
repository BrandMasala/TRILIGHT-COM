import { Text, useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";
import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import ReactDOM from 'react-dom';

export const TextSection = ({ title, subtitle, image, sceneOpacity, model, modelScale, shouldShow, ...props }) => {
  const texture = image ? useLoader(THREE.TextureLoader, image) : null;
  const materialRef = useRef();
  // Load the model if provided
  const gltf = model ? useGLTF(model) : null;
  const scale = modelScale || [0.5, 0.5, 0.5];

  // Ref to store all mesh materials in the model
  const modelMaterialsRef = useRef([]);

  // When the model loads, collect all mesh materials
  useEffect(() => {
    if (gltf && gltf.scene) {
      const materials = [];
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = sceneOpacity.current;
          materials.push(child.material);
        }
      });
      modelMaterialsRef.current = materials;
    }
  }, [gltf, sceneOpacity]);

  useFrame(() => {
    if (materialRef.current && materialRef.current.opacity !== sceneOpacity.current) {
      materialRef.current.opacity = sceneOpacity.current;
    }
    // Update all model materials' opacity only if changed
    if (modelMaterialsRef.current.length > 0) {
      modelMaterialsRef.current.forEach((mat) => {
        if (mat.opacity !== sceneOpacity.current) {
          mat.opacity = sceneOpacity.current;
        }
      });
    }
  });

  // Attach pointer events to all meshes in the model for maximum compatibility
  useEffect(() => {
    if (gltf && shouldShow) {
      gltf.scene.traverse(child => {
        if (child.isMesh) {
          child.cursor = 'pointer';
          child.onPointerDown = () => window.location.href = "https://youtube.com";
          child.onPointerOver = () => { document.body.style.cursor = 'pointer'; };
          child.onPointerOut = () => { document.body.style.cursor = 'default'; };
        }
      });
    }
  }, [gltf, shouldShow]);

  return (
    <group {...props}>
      {/* Render 3D model if provided */}
      {gltf && (
        <primitive
          object={gltf.scene}
          scale={scale}
          position={[0, 0, 0]}
          rotation={props.rotation}
          onPointerDown={shouldShow ? () => window.location.href = "https://youtube.com" : undefined}
          onPointerOver={shouldShow ? () => { document.body.style.cursor = 'pointer'; } : undefined}
          onPointerOut={shouldShow ? () => { document.body.style.cursor = 'default'; } : undefined}
        />
      )}
      {/* Debug: Add clickable 3D text in the middle of the building */}
      <Text
        position={[0, 10, 0]}
        fontSize={2}
        color="orange"
        anchorX="center"
        anchorY="middle"
        onPointerDown={() => window.location.href = "https://youtube.com"}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        Learn More
      </Text>
      {gltf && shouldShow && (
        <Html position={[0, 2, 5]} center occlude={false}>
          <div style={{background: 'red', color: 'white', padding: 20, fontSize: 24}}>TEST</div>
        </Html>
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
