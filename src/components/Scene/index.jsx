import React, { useRef } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './index.css';

export default function Scene() {
    return (
        <div style={{width: window.innerWidth, height: window.innerHeight, zIndex: 1, position: 'absolute'}}>
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
    return (
        <mesh>
            <planeBufferGeometry attach='geometry' args={[6, 3]} />
            {/* <meshBasicMaterial attach='material' color='red'/> */}
            <colorShiftMaterial color="hotpink" time={1} attach='material'/>
        </mesh>
    )
}

const ColorShiftMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.4, 0.0, 0.1) },
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
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + uTime) + uColor, 1.0);
      }
    `
  )
  
  // declaratively
  extend({ ColorShiftMaterial })