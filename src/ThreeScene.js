import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = ({ onModelClick }) => {
  const sceneRef = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(null);
  const mesh = useRef(null);
  const controls = useRef(null);

  useEffect(() => {
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.current.position.z = 250;

    renderer.current = new THREE.WebGLRenderer();
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setClearColor(0xccccff);
    sceneRef.current.appendChild(renderer.current.domElement);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    hemisphereLight.position.set(0, 1, 0);
    scene.current.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 1, 0).normalize();
    scene.current.add(directionalLight);

    const mtlLoader = new MTLLoader();
    mtlLoader.load("Model.mtl", function (materials) {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load("robo.obj", function (object) {
        mesh.current = object;
        scene.current.add(mesh.current);
      });
    });

    controls.current = new OrbitControls(
      camera.current,
      renderer.current.domElement
    );

    const animate = () => {
      renderer.current.render(scene.current, camera.current);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup code
    return () => {
      scene.current.remove(mesh.current);
      controls.current.dispose();
      renderer.current.dispose();
    };
  }, []);

  const handleModelClick = () => {
    onModelClick(); // Trigger the prop function
  };

  return <div ref={sceneRef} onClick={handleModelClick}></div>;
};

export default ThreeScene;
