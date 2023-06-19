import React, { useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './index.css';

export default function Scene() {

    return (
        <div style={{width: window.innerWidth, height: window.innerHeight, zIndex: 1, position: 'absolute'}} >
            <Canvas>
                <Plane />
                {/* <mesh>
                    <planeBufferGeometry attach='geometry' args={[12, 10]} />
                    <meshStandardMaterial attach='material' color='hotpink' />
                </mesh> */}
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    )
}

function Plane() {

    const materialRef = useRef();

    useFrame((state, delta) => {
      materialRef.current.uniforms.uTime.value += delta;
    });

    return (
        <mesh>
            <planeBufferGeometry attach='geometry' args={[16, 9]} />
            {/* <meshBasicMaterial attach='material' color='red'/> */}
            <colorShiftMaterial ref={materialRef} attach='material'/>
        </mesh>
    )
}

const ColorShiftMaterial = shaderMaterial(
    { 
      uTime: 0,
    },
    // vertex shader
    /*glsl*/`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    // fragment shader
    /*glsl*/`
      uniform float uTime;
      varying vec2 vUv;
        
      void main() {
        gl_FragColor = vec4(0, 0, 0, 1.0);
      }
    `
  )
  
  // declaratively
  extend({ ColorShiftMaterial })