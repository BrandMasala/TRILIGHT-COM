import { Text, useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";
import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import ReactDOM from 'react-dom';
import { useThree } from "@react-three/fiber";

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




useEffect(() => {
  if (!gltf || !shouldShow) return;

  console.log("Raycast effect running, shouldShow:", shouldShow);

  const { gl } = useThree();
  const canvas = gl.domElement;

  // Pre-flag meshes under BuildingA, Plane005*, Plane006*, and NEOPOLIS
  gltf.scene.traverse((child) => {
    if (
      child.name === "BuildingA" ||
      child.parent?.name === "BuildingA" ||
      child.name.startsWith("Plane005") ||
      child.name.startsWith("Plane006")
    ) {
      child.userData.trilight = true;
    }
    if (child.name.startsWith("NEOPOLIS")) {
      child.userData.neopolis = true;
    }
  });

  const handlePointerDown = (event) => {
    console.log("Pointer down triggered");

    const mouse = new THREE.Vector2(
      (event.clientX / canvas.clientWidth) * 2 - 1,
      -(event.clientY / canvas.clientHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, gltf.__r3f?.camera || gl.camera);
    const intersects = raycaster.intersectObject(gltf.scene, true);

    console.log("Intersects:", intersects.map(i => i.object.name));

    if (intersects.length > 0) {
      const clicked = intersects[0].object;
      const tag = clicked.userData;

      if (tag.trilight) {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
        gl.setAnimationLoop(null);
        setTimeout(() => {
          window.open("https://thetrilight.com", "_blank");
        }, 500);
      } else if (tag.neopolis) {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
        gl.setAnimationLoop(null);
        setTimeout(() => {
          window.open("https://neopolis-risewith9.com", "_blank");
        }, 500);
      } else {
        console.log("Clicked:", clicked.name);
      }
    }
  };

  canvas.addEventListener("pointerdown", handlePointerDown);
  return () => {
    canvas.removeEventListener("pointerdown", handlePointerDown);
  };
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
          onPointerDown={(e) => {
            const name = e.object.name;
            console.log("Primitive clicked:", name);
            if (
              name === "BuildingA" ||
              name.startsWith("Plane005") ||
              name.startsWith("Plane006")
            ) {
              window.open("https://thetrilight.com", "_blank");
            } else if (name.startsWith("NEOPOLIS")) {
              window.open("https://youtube.com", "_blank");
            } else {
              console.log("Clicked something else:", name);
            }
          }}
        />
      )}
      
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
