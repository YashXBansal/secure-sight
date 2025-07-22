// components/ProcessorModel.tsx
"use client";

import React, { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

export const ProcessorModel = forwardRef<THREE.Group, GroupProps>(
  (props, ref) => {
    const { scene } = useGLTF("/processor_model.glb");

    useEffect(() => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
        }
      });
    }, [scene]);

    return <primitive object={scene.clone()} ref={ref} {...props} />;
  }
);

ProcessorModel.displayName = "ProcessorModel";

useGLTF.preload("/processor_model.glb");
