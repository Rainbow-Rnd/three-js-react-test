import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const ThreeScene = () => {
  const sceneRef = useRef(null);
  let scene, camera, renderer, mesh, controls;

  useEffect(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 250;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xccccff);
    sceneRef.current.appendChild(renderer.domElement);

    // const light = new THREE.AmbientLight(0xffffff);
    // scene.add(light);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    hemisphereLight.position.set(0, 1, 0);
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 1, 0).normalize();
    scene.add(directionalLight);

    const mtlLoader = new MTLLoader();
    mtlLoader.load("Model.mtl", function (materials) {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load("Model1.obj", function (object) {
        mesh = object;
        scene.add(mesh);
      });
    });

    const loader = new GLTFLoader();

    loader.load(
      "Model.glb",
      function (gltf) {
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup code
    return () => {
      scene.remove(mesh);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={sceneRef}></div>;
};

export default ThreeScene;
