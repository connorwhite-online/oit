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

    float rand(float n) {
      return fract(sin(n) * 43758.5453123);
    }

    void main() {
      float t = uTime * 0.2;
      float x = vUv.x - 0.5;
      float y = vUv.y - 0.5;
      float angle = atan(y, x) + t;
      float radius = sqrt(x * x + y * y);
      float distortion = sin(radius * 10.0 - t) * 0.52;
      float offset = sin(angle * 20.0 + t) * distortion;

      vec4 color = vec4(0.0);
      color.r = rand(radius + offset + t);
      color.g = rand(radius + offset + t + 1.0);
      color.b = rand(radius + offset + t + 2.0);
      color.a = 0.8;

      gl_FragColor = color;
    }
    `
  )
  
  // declaratively
  extend({ ColorShiftMaterial })