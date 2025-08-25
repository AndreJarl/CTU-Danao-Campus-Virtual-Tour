import Panorama from "./Panorama";
import 'pannellum/build/pannellum.css';
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

    const [currentScene, setCurrentScene] = useState('main_gate');

  return (
     <div className="relative w-full h-screen z-50">
           {/* Navbar overlayed on top, absolute position */}
        <Navbar setCurrentScene={setCurrentScene} />
 

      <Panorama scene={currentScene} onChangeScene={setCurrentScene} />

      <Footer/>

    </div>
  );
}

export default App;


// import React, { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// // Scenes config
// const SCENES = {
//   lobby: {
//     texture: "public/IMG_5703.jpg",
//     hotspots: [
//       { position: [10, 0, -50], target: "classroom", label: "Go to Classroom" },
//       { position: [-20, 5, -30], target: "library", label: "Go to Library" },
//     ],
//   },
//   classroom: {
//     texture: "public/IMG_5704.jpg",
//     hotspots: [
//       { position: [5, 0, -40], target: "lobby", label: "Back to Lobby" },
//     ],
//   },
//   library: {
//     texture: "public/IMG_5706.jpg",
//     hotspots: [
//       { position: [0, 0, -50], target: "lobby", label: "Back to Lobby" },
//     ],
//   },
// };

// export default function VirtualTour() {
//   const mountRef = useRef(null);
//   const [currentScene, setCurrentScene] = useState("lobby");
//   const [textures, setTextures] = useState({});

//   useEffect(() => {
//     const mount = mountRef.current;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       mount.clientWidth / mount.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 0, 0.1);

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(mount.clientWidth, mount.clientHeight);
//     mount.appendChild(renderer.domElement);

//  const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableZoom = false;      
// controls.zoomSpeed = 1.2;      // allow zooming with scroll
// controls.enablePan = false;   // no panning
// controls.rotateSpeed = -0.2;     // reverse drag
// controls.enableDamping = true;  
// controls.dampingFactor = 1;
   

//     let sphereMesh;
//     const hotspotMeshes = [];

//     const loader = new THREE.TextureLoader();

//     const loadScene = (sceneKey) => {
//       const { texture, hotspots } = SCENES[sceneKey];

//       if (sphereMesh) scene.remove(sphereMesh);
//       hotspotMeshes.forEach((m) => scene.remove(m));

//       const tex =
//         textures[texture] ||
//         loader.load(texture, (t) => setTextures((prev) => ({ ...prev, [texture]: t })));

//       const geometry = new THREE.SphereGeometry(500, 60, 40);
//       geometry.scale(-1, 1, 1);
//       const material = new THREE.MeshBasicMaterial({ map: tex });
//       sphereMesh = new THREE.Mesh(geometry, material);
//       scene.add(sphereMesh);

//     hotspots.forEach((hs) => {
//   const arrowTexture = loader.load("public/arrow.png"); // loads from public/
//   const spriteMaterial = new THREE.SpriteMaterial({
//     map: arrowTexture,
//     transparent: true, // keeps background transparent
//   });
//   const sprite = new THREE.Sprite(spriteMaterial);
//   sprite.position.set(...hs.position);
//   sprite.scale.set(20, 20, 1); // make it square for arrow
//   sprite.userData = { target: hs.target };
//   scene.add(sprite);
//   hotspotMeshes.push(sprite);
// });
//     };

//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();

//     const onClick = (event) => {
//       mouse.x = (event.clientX / mount.clientWidth) * 2 - 1;
//       mouse.y = -(event.clientY / mount.clientHeight) * 2 + 1;
//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(hotspotMeshes);
//       if (intersects.length > 0) {
//         const target = intersects[0].object.userData.target;
//         if (target) {
//           setCurrentScene(target);
//         }
//       }
//     };

//  mount.addEventListener("click", onClick);

// mount.addEventListener("wheel", (event) => {
//   event.preventDefault();
//   camera.fov += event.deltaY * 0.05; // scroll changes FOV
//   camera.fov = Math.max(30, Math.min(100, camera.fov)); // clamp zoom
//   camera.updateProjectionMatrix();
// });

//     loadScene(currentScene);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       camera.aspect = mount.clientWidth / mount.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mount.clientWidth, mount.clientHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       mount.removeChild(renderer.domElement);
//       window.removeEventListener("resize", handleResize);
//       mount.removeEventListener("click", onClick);
//     };
//   }, [currentScene]);

//   const makeLabel = (text) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     canvas.width = 256;
//     canvas.height = 64;
//     ctx.fillStyle = "rgba(0,0,0,0.7)";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "white";
//     ctx.font = "24px Arial";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(text, canvas.width / 2, canvas.height / 2);
//     return new THREE.CanvasTexture(canvas);
//   };

//   return <div ref={mountRef} className="w-full h-screen" />;
// }


