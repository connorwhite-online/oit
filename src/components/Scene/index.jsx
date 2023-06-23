import React, { useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './index.css';

export default function Scene() {

    return (
        <div style={{width: window.innerWidth, height: window.innerHeight, zIndex: 9, position: 'absolute', pointerEvents: 'none'}} >
            <Canvas>
                <Plane />
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

float noise(vec2 p) {
  return rand(p.x + p.y * 10.0);
}

void main() {
  float t = uTime * 0.15;  // Adjust the speed of the transformations
  float x = vUv.x - 0.5;
  float y = vUv.y - 0.5;

  // Calculate the angle based on the pixel's position
  float angle = atan(y, x) * -1.0;

  // Calculate the radius based on the distance from the center of the shader
  float radius = sqrt(x * x + y * y);

  // Apply fluid-like transformations based on the angle
  float distortion = sin(radius * 10.0 - t + angle) * 0.1;
  vec2 offset = vec2(cos(angle), sin(angle)) * distortion;

  // Apply random mutations to the UV coordinates
  float mutationX = noise(vUv * 2.0 + t) * 0.1;
  float mutationY = noise(vUv * 2.0 - t) * 0.1;
  vec2 mutatedUV = vec2(vUv.x + mutationX, vUv.y + mutationY);

  // Apply refraction to the UV coordinates
  vec2 refractedUV = mutatedUV + offset * 0.1;

  // Create the transparency gradient based on the transformed UV coordinates
  float fade = smoothstep(0.0, 1.0, t);  // Fade in from 0 to 1 over time
  float transparency = smoothstep(0.0, 0.12, length(offset)) * fade;  // Apply fade to the transparency

  // Apply the transparency to the color
  vec4 color = vec4(0, 0, 0, transparency);

  gl_FragColor = color;
}
    `
  )
  
  // declaratively
  extend({ ColorShiftMaterial })