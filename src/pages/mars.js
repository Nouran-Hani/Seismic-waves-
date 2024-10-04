import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function MarsAndMoon() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Load Mars and Moon models
    const marsLoader = new THREE.GLTFLoader();
    marsLoader.load('./models/mars.glb', (gltf) => {
      const mars = gltf.scene;
      scene.add(mars);
    });

    const moonLoader = new THREE.GLTFLoader();
    moonLoader.load('./models/moon.glb', (gltf) => {
      const moon = gltf.scene;
      moon.position.set(5, 0, 0); // Adjust position as needed
      scene.add(moon);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
}
